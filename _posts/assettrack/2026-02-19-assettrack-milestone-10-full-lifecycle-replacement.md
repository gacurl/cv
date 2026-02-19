
This workflow performs three coordinated actions in a single transaction:

1. Retire the failed asset  
2. Create the replacement asset  
3. Assign the replacement into the same physical slot  

All atomically.

If any step fails, nothing changes.

---

## Slot is the Anchor

The system enforces a simple rule:

> The slot remains constant.  
> The asset occupying it changes.

Target slot selection is deterministic:

1. If the failed asset currently occupies a slot → use that slot.
2. Else if the asset has a home_slot_id → use that.
3. Else → hard stop with operator guidance.

No guessing.
No silent fallback.
No partial swaps.

---

## Supports Field Reality (IN_CUSTODY)

If the failed asset is IN_CUSTODY:

- Retirement occurs in-field.
- Custody is closed cleanly.
- No Stock-In required.
- Replacement proceeds directly into the slot.

This matches how hardware actually fails in deployment environments.

---

## Atomic Transaction Boundary

The swap executes inside a single database transaction:

- Retire failed asset (DISPOSED)
- Clear holder
- Remove slot occupancy
- Clear home slot linkage
- Create replacement asset
- Assign replacement to target slot
- Write required audit events

If validation fails at any point:

- Duplicate asset_tag
- Duplicate serial_number
- Target slot occupied by another asset
- Missing target slot

The entire operation rolls back.

No half-swapped systems.

---

## Audit Events Written

Every swap produces:

- `ASSET_RETIRED` or `ASSET_RETIRED_IN_FIELD`
- `ASSET_CREATED`
- `SLOT_ASSIGN`

The audit trail tells the full story.

No invisible corrections.

---

## System Guarantees (Now True)

After Milestone 10:

- Failed assets exit operations cleanly
- Replacement assets inherit slot position
- No slot double-occupancy possible
- No partial lifecycle mutation possible
- No swap without audit evidence
- No swap without deterministic slot logic
- Tests fully passing
- Docker-compatible runtime preserved

This is lifecycle maturity.

---

## What This Means

AssetTrack now supports:

- Intake
- Slot discipline
- Custody issuance and return
- Retirement
- Replacement swap

That is a complete hardware lifecycle.

Not just tracking.

Governance.

---

## What I Learned

Atomicity is not about performance.

It is about trust.

In inventory systems, trust erodes slowly.

Drift starts small:
- A missing slot update
- A manual correction
- A “temporary” swap

Milestone 10 eliminates drift at the point of replacement.

The system enforces reality.

---

## What’s Next

Milestone 11 will focus on operational hardening:

- Admin authentication gate
- Operator documentation
- Deployment discipline

The lifecycle engine is now complete.

Now we secure and document it.

🚜