---
title: "2026-02-02 — 🚜 AssetTrack: Milestone 3 Validation Done, CI Paused"
date: 2026-02-02
project: AssetTrack
tags: [python, github-actions, ci-cd, offline-first, batch-ingest]
---

TL;DR: Milestone 3’s validation and preview work is complete and ready to merge; GitHub Actions is the only thing standing between the code and `main`.

Project page: [AssetTrack](/projects/assettrack/)

## Context

Milestone 3 is about offline batch ingest: scan assets in the field, review the batch calmly, then commit everything atomically later. The key requirement is confidence—being able to look at a batch and *know* what will happen before anything touches the database.

Today’s work finished the validation and preview layer for that milestone. The only reason it didn’t merge is a GitHub Actions outage that left hosted runners queued globally.

## What changed

Milestone 3 now has a complete preview pipeline:
- CSV batch files are parsed into ordered, structured rows
- Each row is validated independently and reported with a `row_number`
- Validation rules include:
  - required fields
  - allowed `event_type` values (per OPN-2004 v1)
  - ISO-8601 timestamp validation
  - asset tag format checks
  - enforced `OUT/OUT` pairing for case and slot

All validation is preview-only:
- no database writes
- no side effects
- no guessing about asset existence

This creates a clean “review first” boundary that atomic commit logic can rely on later.

## What I learned

Two things were reinforced during Milestone 3 so far:

1) Preview-first validation is the backbone of offline systems. If you can’t trust the preview, you can’t trust the commit.
2) Discipline around scope matters. Anything that truly depends on database state (like create-vs-update rules) was explicitly deferred, rather than hacked in with heuristics.

The CI outage itself was a reminder that local verification still matters. When `compileall` and smoke scripts pass locally, waiting on runners is an inconvenience—not a blocker to confidence.

## Next

Once GitHub Actions recovers, the Milestone 3 validation PR will merge cleanly. The next step is Issue 3-4: atomic batch commit—where previewed rows become a single, all-or-nothing transaction.

Milestone 3 is now structurally ready for that jump.
