# Ticket List Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ticket-page unread statistic with a closed-ticket count and add last-reply time plus view/close actions with an explicit confirmation step.

**Architecture:** Keep the feature inside the existing theme bundle. Add small pure helpers for ticket status, last-reply time, action markup, and confirmation markup so behavior can be unit-tested without a browser; wire those helpers into the existing ticket renderer and delegated click handler. Reuse the existing Xboard list and close endpoints and the existing global dialog.

**Tech Stack:** Vanilla JavaScript, CSS, Node.js built-in test runner, Xboard V1 user ticket API.

---

### Task 1: Define ticket list behavior with failing tests

**Files:**
- Create: `tests/ticket-list-actions.test.cjs`
- Read: `assets/theme.js`

- [ ] **Step 1: Write the failing helper tests**

Create `tests/ticket-list-actions.test.cjs` using the existing `extractFunction()` pattern. Evaluate `ticketId`, `isTicketClosed`, `closedTicketCount`, `ticketLastReplyTime`, `renderTicketActions`, and `renderTicketCloseConfirm` with small `t`, `tx`, and `e` stubs, then assert:

```js
test('counts only closed tickets', () => {
  assert.equal(closedTicketCount([
    { status: 0 },
    { status: 1 },
    { status: '1' }
  ]), 2);
});

test('last reply time prefers updated_at and falls back to created_at', () => {
  assert.equal(ticketLastReplyTime({ updated_at: 200, created_at: 100 }), 200);
  assert.equal(ticketLastReplyTime({ created_at: 100 }), 100);
});

test('open tickets expose view and close actions', () => {
  const html = renderTicketActions({ id: 8, status: 0 });
  assert.match(html, /data-action="open-ticket"/);
  assert.match(html, /data-action="request-close-ticket"/);
  assert.doesNotMatch(html, /disabled/);
});

test('closed tickets disable the close action', () => {
  const html = renderTicketActions({ id: 9, status: 1 });
  assert.match(html, /data-action="open-ticket"/);
  assert.match(html, /disabled/);
  assert.doesNotMatch(html, /data-action="request-close-ticket"/);
});

test('close confirmation is a separate explicit action', () => {
  const html = renderTicketCloseConfirm('8');
  assert.match(html, /data-action="confirm-close-ticket"/);
  assert.match(html, /data-id="8"/);
});
```

- [ ] **Step 2: Add integration assertions for the table wiring**

Assert the theme source contains the new closed statistic target, last-reply header, action header, request branch, and confirm branch:

```js
assert.match(themeSource, /data-ticket-stat="closed"/);
assert.match(themeSource, /tx\('ticket_last_reply_time'\)/);
assert.match(themeSource, /t\('action'\)/);
assert.match(themeSource, /action === 'request-close-ticket'/);
assert.match(themeSource, /action === 'confirm-close-ticket'/);
```

- [ ] **Step 3: Run the test and verify RED**

Run:

```powershell
node --test tests/ticket-list-actions.test.cjs
```

Expected: FAIL because the six helper functions and new renderer wiring do not exist yet.

- [ ] **Step 4: Commit the failing tests**

```powershell
git add tests/ticket-list-actions.test.cjs
git commit -m "test(ticket): define list actions and close confirmation"
```

### Task 2: Implement closed statistics, last-reply time, and confirmed close flow

**Files:**
- Modify: `assets/theme.js:22-184`
- Modify: `assets/theme.js:807-1024`
- Modify: `assets/theme.js:1644-1691`
- Modify: `assets/theme.js:1788-1840`
- Modify: `assets/theme.js:1998-2015`
- Test: `tests/ticket-list-actions.test.cjs`

- [ ] **Step 1: Add localized labels**

Add these keys to `extraI18n['zh-CN']`:

```js
ticket_closed_count: '已关闭工单',
ticket_last_reply_time: '最后回复时间',
view_ticket: '查看',
ticket_close_confirm_title: '确认关闭工单',
ticket_close_confirm_hint: '关闭后将无法继续回复，确定要关闭这个工单吗？',
```

Add the English equivalents to `extraI18n.en`:

```js
ticket_closed_count: 'Closed tickets',
ticket_last_reply_time: 'Last reply',
view_ticket: 'View',
ticket_close_confirm_title: 'Close ticket?',
ticket_close_confirm_hint: 'You cannot continue replying after closing this ticket.',
```

- [ ] **Step 2: Add the pure ticket helpers**

Insert after `ticketId()`:

```js
function isTicketClosed(ticket) {
  return Number(ticket?.status) !== 0;
}

function closedTicketCount(tickets) {
  return (Array.isArray(tickets) ? tickets : []).filter(isTicketClosed).length;
}

function ticketLastReplyTime(ticket) {
  return ticket?.updated_at ?? ticket?.update_at ?? ticket?.created_at;
}

function renderTicketActions(ticket) {
  const id = ticketId(ticket);
  const closed = isTicketClosed(ticket);
  return `<div class="ticket-actions"><button class="ticket-action" type="button" data-action="open-ticket" data-id="${e(id)}">${tx('view_ticket')}</button><span aria-hidden="true"></span><button class="ticket-action danger" type="button" ${closed ? 'disabled aria-disabled="true"' : `data-action="request-close-ticket" data-id="${e(id)}"`}>${t('close_ticket')}</button></div>`;
}

function renderTicketCloseConfirm(ticketRefId) {
  return `<div class="dialog-head"><h3>${tx('ticket_close_confirm_title')}</h3><button class="icon-btn" data-action="close-dialog">${icon('close')}</button></div><div class="dialog-body"><p class="ticket-close-confirm-copy">${tx('ticket_close_confirm_hint')}</p><div class="dialog-actions"><button class="btn btn-secondary" type="button" data-action="close-dialog">${t('cancel')}</button><button class="btn btn-danger" type="button" data-action="confirm-close-ticket" data-id="${e(ticketRefId)}">${t('close_ticket')}</button></div></div>`;
}
```

- [ ] **Step 3: Wire helpers into the ticket renderer**

In `renderTickets()`:

- Replace `repliedCount` with `const closedCount = closedTicketCount(state.tickets)`.
- Render creation time from `created_at` only.
- Add a last-reply cell using `date(ticketLastReplyTime(item))`.
- Add an actions cell using `renderTicketActions(item)`.
- Replace the third statistic with `data-ticket-stat="closed"`, `closedCount`, and `tx('ticket_closed_count')`.
- Add `${tx('ticket_last_reply_time')}` and `${t('action')}` table headers.

Update `refreshTicketsPageUnreadUi()` to refresh each row's status, reply status, last-reply time, actions, and the closed statistic count from `state.tickets`.

- [ ] **Step 4: Add the confirmation dialog and close executor**

Add:

```js
function openTicketCloseConfirm(ticketRefId) {
  const id = String(ticketRefId || '').trim();
  const ticket = state.tickets.find(item => ticketId(item) === id);
  if (!id || (ticket && isTicketClosed(ticket))) return;
  const dialog = document.getElementById('global-dialog');
  dialog.innerHTML = renderTicketCloseConfirm(id);
  if (!dialog.open) dialog.showModal();
}

async function closeTicketById(ticketRefId) {
  try {
    await api('/user/ticket/close', { method: 'POST', body: { id: ticketRefId } });
    document.getElementById('global-dialog').close();
    toast(tx('ticket_closed_done'));
    render();
  } catch (error) {
    toast(error.message, 'error');
  }
}
```

Change the detail dialog's close button to `data-action="request-close-ticket"`. Replace the old immediate close branch with:

```js
} else if (action === 'request-close-ticket') {
  openTicketCloseConfirm(target.dataset.id);
} else if (action === 'confirm-close-ticket') {
  closeTicketById(target.dataset.id);
}
```

- [ ] **Step 5: Run targeted and existing tests to verify GREEN**

Run:

```powershell
node --test tests/ticket-list-actions.test.cjs tests/ticket-reply-state.test.cjs tests/frontend-version.test.cjs
node --check assets/theme.js
```

Expected: all tests pass and syntax check exits 0.

- [ ] **Step 6: Commit the JavaScript implementation**

```powershell
git add assets/theme.js tests/ticket-list-actions.test.cjs
git commit -m "feat(ticket): add list actions and closed statistics"
```

### Task 3: Style and verify the ticket actions

**Files:**
- Modify: `assets/theme.css:441-454`
- Modify: `assets/theme.css:541-550`
- Modify: `assets/theme.css:575-630`
- Test: `tests/ticket-list-actions.test.cjs`

- [ ] **Step 1: Add compact action and confirmation styles**

Add styles using existing theme variables:

```css
.ticket-actions { display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; }
.ticket-actions > span { width: 1px; height: 16px; background: var(--line); }
.ticket-action { padding: 2px 0; border: 0; color: var(--primary); background: transparent; font: inherit; cursor: pointer; }
.ticket-action:hover { text-decoration: underline; }
.ticket-action.danger { color: var(--danger); }
.ticket-action:disabled { color: var(--muted); cursor: not-allowed; opacity: .55; text-decoration: none; }
.ticket-close-confirm-copy { margin: 0; color: var(--body); font-size: 14px; line-height: 1.6; }
```

Set a minimum width on the ticket table so its six columns remain readable in the existing horizontally scrollable `.table-wrap`:

```css
.ticket-table { min-width: 960px; }
```

- [ ] **Step 2: Add a CSS contract assertion**

Extend `tests/ticket-list-actions.test.cjs` to load `assets/theme.css` and assert `.ticket-actions`, `.ticket-action:disabled`, and `.ticket-table` exist.

- [ ] **Step 3: Run the full verification set**

Run:

```powershell
node --test tests/*.test.cjs
node --check assets/theme.js
git diff --check
```

Expected: all tests pass; syntax and whitespace checks exit 0.

- [ ] **Step 4: Inspect the rendered desktop and narrow layouts**

Open the theme preview or a local Xboard-backed page and verify:

- The orange card reports closed tickets.
- Open rows show active “View | Close ticket”.
- Closed rows show a disabled close action.
- Closing is impossible until the confirmation button is clicked.
- The table scrolls horizontally at narrow widths without clipping actions.
- The global announcement bell is unchanged.

- [ ] **Step 5: Commit CSS and final verification updates**

```powershell
git add assets/theme.css tests/ticket-list-actions.test.cjs
git commit -m "style(ticket): refine list actions and confirmation"
```
