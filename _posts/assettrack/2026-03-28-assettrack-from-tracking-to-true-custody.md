---
title: "2026-03-28 — 🚜 AssetTrack: From Tracking to True Custody"
date: 2026-03-28
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, audit, event-sourcing, custody, offline-first, workflow]
---

TL;DR  
AssetTrack is no longer just tracking assets — it now proves custody. With acknowledgment enforced, a human-readable report added, and a clear path to PDF + email receipts, the system now shows who had what, when, and under what responsibility.

Project page: [AssetTrack](/projects/assettrack/).

## Context

Early versions of AssetTrack answered a simple question:

> Where are the assets?

That was useful, but not enough.

In real operations, especially in government or controlled environments, the real question is:

> Who is responsible for the asset right now, and can you prove it?

That is the difference between:
- tracking inventory  
- and proving custody  

This milestone focused on closing that gap.

## What changed

### 1. Acknowledgment is now enforced

Before, issuing or returning assets could happen without a clear responsibility checkpoint.

Now:
- the operator runs the workflow
- the holder must acknowledge responsibility
- the system blocks commit if acknowledgment is missing

This is simple, but powerful.

Think of it like a tool room:
- You don’t just take a tool
- You sign for it

AssetTrack now enforces that “sign for it” moment.

---

### 2. The system records responsibility, not just movement

Each event now captures:
- who performed the action (operator)
- who accepted responsibility (holder)
- when it happened
- what assets were involved

This matters.

The operator executes the action.  
The holder owns the responsibility.

That separation is what makes the audit meaningful.

---

### 3. Human-readable admin report

We added a new admin-only report at:

`/admin/report`

This is not a backup.  
It is a readable view of the system.

It includes:
- assets
- holders
- organizations and buildings
- current custody
- recent active events
- location and case data

Why this matters:

The raw SQLite backup is correct, but not usable in the field.

This report answers:

> What is happening in the system right now?

Without requiring a database tool.

---

### 4. Clear separation of concerns

We now have three clean layers:

1. **Event system (truth)**
   - append-only
   - audit record
   - source of truth

2. **Workflow UI (operations)**
   - issue
   - return
   - queue → preview → commit

3. **Inspection layer (visibility)**
   - admin report
   - readable system state

This separation is intentional.

It prevents confusion between:
- what happened  
- what the operator is doing  
- what leadership needs to see  

---

### 5. Preparing for PDF and email receipts

We also defined the path forward for receipts.

Real-world workflow:

- Bob (operator) issues assets  
- Sally (holder) accepts responsibility  
- Jonah (authority) must be notified  

The system now:
1. records the custody event first  
2. will later generate a receipt from that event  
3. will send it when connectivity is available  

Key rule:

> The event is the truth.  
> Email is just a notification.

Upcoming work:
- PDF export of the report (shareable receipt)
- deferred email queue (offline-first delivery)
- attaching PDF receipts to those emails

---

## What I learned

### 1. Words matter more than code

The shift from:
- “stock out / stock in”

to:
- “issue / return”

seems small.

But operators don’t think in database terms.  
They think in actions.

Clear language reduces mistakes.

---

### 2. Responsibility must be explicit

Before acknowledgment enforcement, responsibility was implied.

That is not good enough.

Now:
- no acknowledgment → no commit

That makes the system trustworthy.

---

### 3. Offline-first changes everything

You cannot assume:
- email works
- network exists
- systems respond immediately

So the design became:

- store first  
- send later  

That keeps the system reliable under real conditions.

---

### 4. Keep the system small, then layer up

We did not jump straight to:
- PDF generation
- email delivery
- queue retries

Instead:
1. enforce acknowledgment  
2. add readable report  
3. define future layers  

This keeps each step testable and safe.

---

## Next

Next steps are already defined:

- Add PDF export for the admin report  
- Build a deferred email queue  
- Attach PDF receipts to outgoing messages  

Each step builds on the last, without breaking the core system.

---

## Bottom line

AssetTrack has crossed an important line.

It is no longer just:

> “Where is the asset?”

It is now:

> “Who is responsible for this asset, and can you prove it?”

That is the difference between tracking and accountability.