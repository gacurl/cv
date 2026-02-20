---
title: "2026-02-20 — 🚜 AssetTrack: From Drift to Discipline (Milestones 11 & 12)"
date: 2026-02-20
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, audit-log, database-design, integrity, milestone-11, milestone-12]
---

**TL;DR:**  
Milestones 11 and 12 hardened AssetTrack’s audit core. We formalized append-only history, centralized event writing, and introduced a database-enforced correction model that makes the system trustworthy—not just functional.

Project page: [AssetTrack](/projects/assettrack/).

---
# From Drift to Discipline: Closing Out Milestones 11 & 12  
## The Foundation Sprint

Today we closed out Milestone 11 and Milestone 12.

It wasn’t flashy.  
It wasn’t UI-heavy.  
It wasn’t feature-packed.

It was structural.

This stretch of work was about one thing:

> Turning AssetTrack from working software into trustworthy infrastructure.

Milestones 11 and 12 were not about adding surface area.  
They were about tightening the core.

And we grinded.

---

# Where We Started

Before Milestone 11, AssetTrack could:

- Create assets  
- Assign assets to slots  
- Move assets between slots  
- Issue assets to holders  
- Return assets  
- Retire assets  
- Replace failed hardware  

All of that worked.

But there was a quiet weakness underneath:

- Events were recorded, but not disciplined.
- Some invariants relied on application logic instead of database enforcement.
- Corrections had no formal model.
- History was stored — but not truly protected.

It worked.

But it wasn’t hardened.

Milestone 11 changed that.

---

# Milestone 11 — Event Discipline

Milestone 11 was about tightening how the system thinks about history.

## Centralized Event Writing

Audit writes were consolidated behind a single pathway for recording events.

Previously, event inserts were scattered across multiple workflows. By introducing a unified mechanism for writing audit events, we achieved:

- Consistent payload serialization  
- Predictable field handling  
- A single extension point for audit behavior  
- Clear separation between domain logic and persistence  

Instead of ad-hoc inserts, events now flow through one disciplined interface.

One path.  
One rule.

---

## Formalizing Append-Only

Milestone 11 established a non-negotiable rule:

The asset_events table is append-only.

No updates.  
No silent rewrites.  
No retroactive corrections.

Every state transition results in a new row.

This shifted the philosophy from maintaining tidy data to preserving truthful history.

The goal is not to keep the table clean.  
The goal is to keep the record honest.

---

## Pushing Integrity Into the Database

A major focus of Milestone 11 was moving invariants from application code into database constraints.

We reinforced:

- Slot occupancy integrity through transactional operations  
- Logical state transitions via guarded checks  
- Replacement workflows to avoid partial state mutation  
- Force-vacate logic to ensure explicit, safe transitions  
- Index-backed guarantees where appropriate  

The principle was simple:

Do not rely on discipline alone.  
Enforce integrity at the lowest level possible.

By the end of Milestone 11, the system behaved less like a lightweight CRUD application and more like structured infrastructure.

But one gap remained.

Corrections.

---

# The Correction Problem

Mistakes happen.

An administrator mistypes an event date.  
Metadata is logged incorrectly.  
A payload contains slightly wrong details.

There are three ways to handle that:

- Update the existing row.  
- Delete and reinsert the event.  
- Append a new event that supersedes the original.  

Only one of those options preserves audit integrity.

Milestone 12 implemented the correction model properly.

---

# Milestone 12 — Immutable Correction Model

Milestone 12 introduced a formal, database-enforced supersession model for correcting events.

Not a workaround.  
A structural extension of the audit system.

## Schema Evolution

We extended the asset_events table with two fields:

- A reference to the event being superseded  
- A required correction reason  

These additions were not just columns. They were enforced by:

- A check constraint requiring a non-empty reason whenever an event supersedes another  
- A foreign key ensuring the referenced event actually exists  
- A unique partial index enforcing that an event can only be superseded once  

This guarantees:

- No silent edits  
- No multiple conflicting corrections  
- No correction without explanation  
- No correction of a non-existent event  

The database now enforces correction integrity.

---

# The Admin Correction Endpoint

Milestone 12 introduced a new administrative endpoint for corrections.

Access is restricted via configured admin credentials.

The correction request requires:

- The identifier of the event being superseded  
- A non-empty correction reason  

All other fields default to the original event unless explicitly overridden.

This design allows:

- Targeted corrections  
- Full metadata replacement when necessary  
- Payload adjustments  
- Explicit traceability  

Importantly, the original event remains untouched.

The correction is appended as a new event that formally supersedes the prior one.

---

# What Happens During a Correction

The flow is deliberate:

- Validate the request structure  
- Confirm the event identifier is valid  
- Ensure a correction reason is provided  
- Load the original event  
- Reject if not found  
- Reject if already superseded  
- Copy original values  
- Apply any explicit overrides  
- Begin a transaction  
- Append the new event  
- Commit  

At no point is the original row modified.

History is never rewritten.  
It is extended.

---

# What We Verified

We verified the following behaviors:

- Successful correction returns a creation response  
- Missing correction reason is rejected  
- Non-existent event identifiers are rejected  
- Attempts to supersede an already superseded event are rejected  
- Administrative authentication is enforced  

The correction model is guarded at multiple layers:

- Application validation  
- Database check constraints  
- Foreign key enforcement  
- Unique index enforcement  

The application coordinates.

The database guarantees.

---

# What We Did Not Build

Milestone 12 was structural. It intentionally avoided surface-level features.

We did not:

- Add a correction user interface  
- Suppress superseded events in reporting  
- Add visual correction indicators  
- Introduce derived “effective event” views  
- Build reporting abstractions  

The goal was not presentation.

The goal was integrity.

---

# The Grind

Today was not glamorous engineering.

We:

- Refactored event pathways  
- Hardened schema guarantees  
- Aligned API responses  
- Resolved environment execution issues  
- Verified transactional safety  
- Confirmed index enforcement  
- Tested correction edge cases  
- Ensured no mutation paths remained  
- Closed integrity gaps  

It was quiet tightening.

No shortcuts.  
No optimistic assumptions.  
Just disciplined reinforcement.

---

# Where AssetTrack Stands Now

After closing Milestones 11 and 12, AssetTrack has:

- An immutable audit log  
- A formal supersession model  
- Database-enforced correction constraints  
- Administrative gating for sensitive operations  
- Transaction-safe state transitions  
- A hardened event architecture  

This is no longer just functional software.

It is trustworthy software.

---

# The Real Shift

Before Milestone 11:

Make it work.

After Milestone 12:

Make it trustworthy.

That is the difference.

---

# Closing the Milestones

Milestone 11: closed.  
Milestone 12: closed.  
Schema hardened.  
Correction model enforced.  
Audit core stabilized.

This was not a feature sprint.

It was a foundation sprint.

And foundation work compounds.