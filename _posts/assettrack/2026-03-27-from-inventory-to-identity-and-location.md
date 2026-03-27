---
title: "2026-03-27 — 🚜 AssetTrack: From Inventory to Identity and Location"
date: 2026-03-27
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, architecture, data-model, sqlite, event-sourcing, field-ops]
---

TL;DR:
AssetTrack now enforces who an asset belongs to and where it logically lives. Organizations, buildings, and holder relationships are no longer loose text. They are structured, enforced, and reconstructable without breaking the event-sourced model.

Project page: [AssetTrack](/projects/assettrack/)

## Context

The last post focused on *why* AssetTrack uses event sourcing.

That solved the question:

> What happened to the asset?

But there was still a gap.

We could track custody events, but identity and location were still soft:

- organizations were text
- buildings were text
- holders could exist without structure
- relationships were implied, not enforced

That works early.

It does not hold up in the field.

If two operators type:

- “GDIT”
- “G.D.I.T”
- “General Dynamics”

The system silently fractures.

Now you have three realities for the same organization.

That breaks trust.

## What Changed

We introduced three core structures:

### 1. Organizations (Canonical Identity)

Organizations are now a real table.

Every holder must belong to one.

If no organization applies, the system assigns:

> **Ad Hoc**

This is not a workaround. It is a rule.

Why this matters:

- eliminates free-text drift
- guarantees every custody chain has ownership context
- prevents “orphan holders”

---

### 2. Buildings (Controlled Location Reference)

Buildings are now defined separately and mapped to organizations.

This creates a simple rule:

> An organization owns a set of valid buildings.

Assets still store building as text.

That is intentional.

Why:

- preserves audit clarity
- keeps events simple and readable
- avoids breaking the append-only model

Structured reference + readable history.

---

### 3. Organization ↔ Building Mapping

We added a mapping layer.

This enables:

- filtering valid buildings by organization
- preventing invalid combinations
- preparing for issue-time location selection

Before:

> Any asset could be “anywhere”

Now:

> Location must make sense for that organization

---

### 4. Mandatory Organization Assignment

This is the real enforcement point.

Every holder now has:

- `organization_id` (canonical)
- `organization` (synced readable text)

No organization is no longer allowed.

If unknown:

> assign Ad Hoc and move on

This keeps the workflow moving without breaking structure.

---

## Migration Strategy (Why It Matters)

We did not wipe data.

We normalized it.

On startup:

- ensure Ad Hoc exists
- convert existing text → organizations
- backfill missing values
- sync readable fields

This is **idempotent**.

You can restart the system safely.

Nothing breaks. Nothing is lost.

That is critical for field deployment.

---

## What This Unlocks

Before this work, the system could answer:

> Who has the asset?

Now it can answer:

- Who has it?
- What organization are they part of?
- What locations are valid for that organization?

That leads directly to the next step:

> Where should this asset go?

We are now ready for:

- issue-time building selection
- organization-filtered location choices
- clear separation between:
  - current location
  - home location

---

## What I Learned

Structure matters, but timing matters more.

If you introduce structure too early:

- you slow down development
- you over-engineer

If you introduce it too late:

- data becomes inconsistent
- cleanup becomes painful

This was the right moment.

The system had:

- stable workflows
- event integrity
- proven usage patterns

So we could add structure without breaking behavior.

---

## Real Life Note

This gap between posts was not technical.

I was traveling for work and with family.

We also celebrated our **30th anniversary**.

That matters.

Because the whole point of building systems like this is not just efficiency.

It is control.

Control of time.
Control of work.
Control of where your attention goes.

AssetTrack is starting to reflect that same idea:

- clear structure
- predictable behavior
- no ambiguity

---

## Next

Next is where this becomes operationally powerful:

- assign building during issue
- enforce valid locations by organization
- make location selection part of the workflow

At that point, AssetTrack will answer cleanly:

> Who has it, where is it now, and where does it belong?

That is the difference between inventory and custody.

And that is where this system is heading.