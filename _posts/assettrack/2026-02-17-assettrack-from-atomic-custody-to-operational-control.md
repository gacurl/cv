---
title: "2026-02-17 — 🚜 AssetTrack: From Atomic Custody to Operational Control"
date: 2026-02-17
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, custody, atomicity, admin-tools, sqlite, inventory-systems]
---

TL;DR: Milestone 8 completed AssetTrack’s atomic custody engine. Milestone 9 added admin correction tools. The system now enforces integrity and can fix reality without corrupting itself.

Project page: [AssetTrack](/projects/assettrack/).

## Context

At the start of today, AssetTrack could enforce slot structure (Milestone 7) and perform atomic Stock-Out transitions.

By the end of today, Milestone 8 was fully operational.

Assets now move between:


STORAGE (slot-bound)
IN_CUSTODY (holder-bound)


With:

- Atomic transactions
- Hard-stop validation
- Slot consistency
- Explicit event logging
- Rollback safety

No split state.  
No partial commits.  
No ghost slots.

But inventory systems don’t live in clean lab conditions.

Reality drifts.

Milestone 9 acknowledges that.

---

## What Changed

### Atomic Custody Is Complete

Stock-Out and Stock-In now operate as a single transactional layer.

Every transition:

- Validates state
- Mutates slot occupancy
- Updates holder
- Logs event
- Commits or rolls back as one unit

The lifecycle state machine is now real.

---

### Admin Reality Correction Layer

Databases drift.

Imports create unslotted assets.  
Racks get reorganized.  
Humans mis-slot devices.  
Sometimes the database is wrong.

AssetTrack now includes explicit admin tools to reconcile that drift:

- `SLOT_ASSIGN`
- `SLOT_MOVE`
- `FORCE_VACATE`

Each one:

- Is admin-only  
- Has hard-stop validation  
- Executes atomically  
- Writes an audit event  
- Refuses silent correction  

---

## What Is Now True

The system now behaves like this:


```
                         +----------------------+
                         |      IN_CUSTODY      |
                         |   (holder-bound)     |
                         +----------------------+
                               ^         |
                               |         |
                        STOCK_IN|         |STOCK_OUT
                               |         v
+----------------------+     +----------------------+
|       STORAGE        |<--->|     SLOT MODEL       |
|    (slot-bound)      |     |  One asset per slot  |
+----------------------+     +----------------------+

Admin Corrections (All Atomic + Logged):

  SLOT_ASSIGN  → STORAGE + slot-bound
  SLOT_MOVE    → STORAGE, new slot
  FORCE_VACATE → STORAGE, UNSLOTTED
```


There is no path that:
- Skips validation  
- Leaves partial state  
- Moves without logging  
- Silently mutates occupancy  

The system enforces discipline.

And when reality disagrees, it reconciles visibly.

---

## What I Learned

1. Atomicity is necessary — but not sufficient.

   Systems must also allow controlled correction.

2. Governance is not about preventing mistakes.

   It’s about making mistakes visible and recoverable.

Milestone 8 made AssetTrack safe.

Milestone 9 made it operationally honest.

That’s when an inventory tool starts behaving like infrastructure.

---

## Next

Milestone 9 continues with:

- Admin single-asset creation
- Operational reporting tools
- Additional guardrails

The custody engine is stable.

The admin layer is emerging.

Now the system isn’t just correct.

It’s governable.