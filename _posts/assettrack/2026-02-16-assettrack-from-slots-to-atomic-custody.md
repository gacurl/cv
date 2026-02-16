---
title: "2026-02-16 — 🚜 AssetTrack: From Slots to Atomic Custody"
date: 2026-02-16
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, sqlite, atomic-transactions, custody, inventory]
---

**TL;DR:** Milestone 7 gave AssetTrack a physical slot model. Milestone 8 adds atomic custody transitions — assets now move from STORAGE to IN_CUSTODY safely, transactionally, and without partial state corruption.

Project page: [AssetTrack](/projects/assettrack/).

---

## Context

At the end of Milestone 7, AssetTrack stopped being “just a scanner.”

It gained a **physical storage abstraction**:

- Cases
- Slot positions
- One asset per slot
- Hard-stop assignment rules
- Atomic slot mutation

That gave the system structural integrity.  
But it didn’t yet behave like a deployment system.

Assets could sit in storage.  
Slots were enforced.  
But custody — the real-world transfer of responsibility — didn’t exist.

That’s what Milestone 8 begins to solve.

---

## The Problem

Inventory systems fail in subtle ways.

If you:
- Update the asset table
- Forget to clear the slot
- Log the event separately
- Or crash mid-operation

You create split state.

And split state is how audits go sideways.

I didn’t want “mostly correct.”  
I wanted atomic.

---

## What Changed

Issue 8-2 introduced **atomic Stock-Out batch processing**.

When Stock-Out mode is enabled and a custodian is selected, `/preview/commit` now performs a single transaction that:

1. Validates every asset:
   - Exists
   - Is in `STORAGE`
   - Is currently slotted
2. Transitions the asset:
   - `location_type` → `IN_CUSTODY`
   - Sets `current_holder_id`
3. Vacates the slot
4. Inserts a `STOCK_OUT` event with `holder_id`
5. Commits or rolls back as one unit

If anything fails:

Nothing changes.

That’s the difference between a hobby script and a system.

---

## The Subtle Bug We Caught

Scanner normalization was stripping dashes:

```

AT-SMOKE-0001 → ATSMOKE0001

```

But the database stored dashed values.

That meant lookups failed even when the asset existed.

Instead of rewriting the database or guessing formats, I implemented canonical matching:

- Exact match
- OR dash-stripped match
- Use the canonical DB value for all mutations

No guessing digit counts.
No auto-padding.
No silent corrections.

Inventory systems must be exact.

---

## What Is Now True

AssetTrack now enforces a real custody state machine:

```

STORAGE  (slot-bound)
IN_CUSTODY (holder-bound)

```

And that transition is:

- Atomic
- Validated
- Logged
- Slot-consistent
- Rollback-safe

After a stock-out:

- The asset is no longer in a slot
- The slot is empty
- The asset references its custodian
- The event log records the transfer

There is no partial state.

---

## Why This Matters

The slot system (Milestone 7) gave the system structure.

Atomic custody (Milestone 8) gave it discipline.

You can now:

- Physically remove a device
- Assign it to a person
- Trust the database reflects reality
- Trust the event log reflects history

That’s when an inventory system starts behaving like a deployment tool.

---

## What’s Next

Milestone 8 continues with:

- Stock-In return flow
- Custody reporting
- UX guardrails
- Hardening around edge cases

But the most important part is already done:

The transition layer is safe.

---

## What I Learned

Two things:

1. Atomicity isn’t a luxury in inventory systems — it’s foundational.
2. Normalization must be intentional, or it will bite you later.

AssetTrack is still small.

But it is now structurally honest.

And that’s how systems survive audits.