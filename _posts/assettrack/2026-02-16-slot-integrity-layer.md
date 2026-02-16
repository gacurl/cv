---
title: "2026-02-16 — 🚜 AssetTrack: Locking in the Slot Integrity Layer"
date: 2026-02-16
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, sqlite, flask, system-design, milestone-7]
---

TL;DR: Milestone 7 is complete. AssetTrack now has a real slot model with atomic movement, hard-stop integrity, and zero UI drift. The foundation is solid.

Project page: [AssetTrack](/projects/assettrack/).

---

## Context

AssetTrack started as a scanner-first intake tool: scan → preview → commit.

That worked.

But once I defined the physical reality — Pelican cases, foam slots, one laptop per position — the system needed to grow up.

Slots aren’t decorative.
They’re constraints.

If you don’t model constraints correctly, inventory systems eventually lie.

Milestone 7 was about preventing that.

---

## What Changed

### 1. Added a `slots` table

Simple. Explicit.

- `case_name`
- `slot_position`
- `current_asset_tag`
- Unique constraint on `(case_name, slot_position)`
- Index on `current_asset_tag`

No foreign keys.
No migrations.
No history table (yet).

Just a stable physical abstraction.

---

### 2. Built the Slot Integrity Layer

Everything lives in `assettrack/slots.py`.

We now have:

- Assign asset to slot (hard-stop conflicts)
- Vacate slot (by position or by asset)
- Move asset between slots (atomic)
- Initialize slots for a case (1..N bootstrap)
- Check if asset is slotted
- Check if slot is empty

Every multi-step operation runs in a single SQLite transaction.

No silent overwrites.
No partial moves.
No “we’ll fix it later” states.

If something conflicts, it stops.

---

### 3. Preserved Scope Discipline

Milestone 7 was intentionally boring.

No UI.
No custody wiring.
No event integration.
No refactors.

Just structure.

This is the part most hobby systems skip.

This is also the part that determines whether a system survives real-world use.

---

## What I Learned

A few reminders:

- Constraints first, features second.
- Atomic operations prevent weird edge-case ghosts.
- Hard stops are a gift to future-you.
- Schema changes should be deliberate and rare.
- Git discipline compounds.

Also: building slow on purpose feels weird — but correct.

---

## Where This Leaves AssetTrack

The system now understands physical storage.

It knows:

- A slot belongs to a case position.
- Only one asset can occupy a slot.
- An asset can only be in one slot.
- Movement is atomic.
- Conflicts are not allowed.

That’s real infrastructure.

---

## Next

Milestone 8: Custody.

Stock-Out.
Stock-In.
IN_CUSTODY transitions.
Event logging integration.

Now the slot layer starts touching operations.

And that’s where it gets interesting.

🚜