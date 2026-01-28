---
title: "2026-01-28 — 🚜 AssetTrack: Foundations and the Core Asset Model"
date: 2026-01-28
layout: post
tags: [assettrack, python, sqlite, systems-design, offline-first]
---

TL;DR: Closed Milestone 0 and Milestone 1 by stabilizing the project foundations and delivering a clean, code-only core asset model with disciplined CRUD helpers.

Project: /projects/assettrack

## Context

AssetTrack exists to solve a very specific problem: reliable, offline-first asset accountability without accidental complexity. Before building workflows, reports, or operator interfaces, the project needed a solid footing.

Milestone 0 was about getting the *ground* right. Milestone 1 was about defining and operating on the *thing that matters most*: the asset itself.

Both milestones were intentionally unglamorous. That was the point.

## What changed

### Milestone 0 — Foundations (closed)

Milestone 0 focused on making the repo boring in the best way:

- Project structure and scope were locked early
- Architecture decisions were written down instead of living in my head
- A minimal CI/CD pipeline was added using Python 3.12 and `compileall`
- The goal was confidence, not coverage

By the end of Milestone 0, the project had a stable baseline with no ambiguity about how it should grow.

### Milestone 1 — Asset Core Model (closed)

Milestone 1 defined what an “asset” actually is in AssetTrack — and just as importantly, what it is not.

Key decisions:
- `asset_tag` is the globally unique identifier and primary scan target
- Custody (`issued_to`) is separate from condition and accountability
- Location data supports logistics, not identity
- Deletion is avoided; assets are retired instead
- Date-level auditing is sufficient at this stage

From there, the milestone delivered:
- A SQLite-backed schema with explicit constraints
- A clean database bootstrap that auto-creates on connection
- Code-only CRUD helpers:
  - `create_asset`
  - `get_asset_by_tag`
  - `update_asset`
  - `retire_asset`

No UI. No audit engine. No legacy wiring. Just predictable data access with tight boundaries.

## What I learned

Two things stood out during this work.

First, pausing early and often prevents architectural debt. Several times, the right move was to stop, smoke test, and confirm assumptions before continuing. That discipline paid off.

Second, small commits matter. Treating each helper as its own completed slice made the work easier to reason about and easier to review later. It also kept the PRs honest.

This milestone reinforced that moving deliberately is often the fastest way to move forward.

## Next

With the core asset model complete, AssetTrack can finally move up the stack.

Milestone 2 will introduce:
- State transitions
- Audit history
- Rules around accountability changes

The foundation is stable. Now the system can start doing real work — carefully.
