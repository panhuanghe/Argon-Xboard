# Ticket Time To Seconds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display ticket creation and last-reply timestamps as browser-local `YYYY/MM/DD HH:mm:ss` values without changing dates elsewhere.

**Architecture:** Add one ticket-specific pure formatter beside the existing global `date()` helper. Wire it only into the ticket list's initial row rendering and last-reply refresh path, preserving all other date consumers.

**Tech Stack:** Vanilla JavaScript, Node.js built-in test runner, existing Xboard theme bundle.

---

### Task 1: Define second-precision browser-local ticket times

**Files:**
- Modify: `tests/ticket-list-actions.test.cjs`
- Modify: `assets/theme.js:769-773`
- Modify: `assets/theme.js:1685-1692`
- Modify: `assets/theme.js:1722-1723`

- [ ] **Step 1: Write the failing formatter and wiring tests**

Extend the VM setup in `tests/ticket-list-actions.test.cjs` with `ticketDateTime`:

```js
vm.runInContext([
  extractFunction('ticketDateTime'),
  // existing extracted functions
  'this.ticketDateTime = ticketDateTime;'
].join('\n'), context);

const { ticketDateTime } = context;

test('ticket times include browser-local hours, minutes and seconds', () => {
  const localMilliseconds = new Date(2026, 6, 26, 13, 4, 5).getTime();
  assert.equal(ticketDateTime(localMilliseconds), '2026/07/26 13:04:05');
  assert.equal(ticketDateTime(Math.floor(localMilliseconds / 1000)), '2026/07/26 13:04:05');
});

test('ticket table uses second-precision times before and after refresh', () => {
  assert.match(themeSource, /ticketDateTime\(item\.created_at\)/);
  assert.equal(
    (themeSource.match(/ticketDateTime\(ticketLastReplyTime\(item\)\)/g) || []).length,
    2
  );
});
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
& 'C:\Users\潘黄鹤\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/ticket-list-actions.test.cjs
```

Expected: FAIL because `ticketDateTime` does not exist.

- [ ] **Step 3: Add the minimal ticket-specific formatter**

Add after `date()` in `assets/theme.js`:

```js
function ticketDateTime(value) {
  if (!value) return t('long_term');
  const number = Number(value);
  const stamp = Number.isFinite(number) ? (number < 1e12 ? number * 1000 : number) : NaN;
  const parsed = new Date(stamp);
  if (Number.isNaN(parsed.getTime())) return t('long_term');
  const pad = part => String(part).padStart(2, '0');
  return `${parsed.getFullYear()}/${pad(parsed.getMonth() + 1)}/${pad(parsed.getDate())} ${pad(parsed.getHours())}:${pad(parsed.getMinutes())}:${pad(parsed.getSeconds())}`;
}
```

This uses browser-local `Date` getters and leaves the global `date()` helper unchanged.

- [ ] **Step 4: Wire both ticket columns and the refresh path**

In `renderTickets()`, replace:

```js
<td>${date(item.created_at)}</td><td class="ticket-last-reply-cell">${date(ticketLastReplyTime(item))}</td>
```

with:

```js
<td>${ticketDateTime(item.created_at)}</td><td class="ticket-last-reply-cell">${ticketDateTime(ticketLastReplyTime(item))}</td>
```

In `refreshTicketsPageUnreadUi()`, replace:

```js
if (lastReplyCell && item) lastReplyCell.textContent = date(ticketLastReplyTime(item));
```

with:

```js
if (lastReplyCell && item) lastReplyCell.textContent = ticketDateTime(ticketLastReplyTime(item));
```

- [ ] **Step 5: Run targeted and full verification and verify GREEN**

Run:

```powershell
& 'C:\Users\潘黄鹤\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/ticket-list-actions.test.cjs
& 'C:\Users\潘黄鹤\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/*.test.cjs
& 'C:\Users\潘黄鹤\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check assets/theme.js
& 'C:\Users\潘黄鹤\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' diff --check
```

Expected: all tests pass; syntax and whitespace checks exit 0.

- [ ] **Step 6: Commit the implementation**

```powershell
git add assets/theme.js tests/ticket-list-actions.test.cjs
git commit -m "fix(ticket): show timestamps to the second"
```
