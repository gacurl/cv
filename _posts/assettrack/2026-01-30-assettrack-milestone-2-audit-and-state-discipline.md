---
title: "2026-01-30 — 🚜 AssetTrack: State, Audit, and Doing It the Hard Way"
date: 2026-01-30
project: AssetTrack
tags: [python, sqlite, audit-log, offline-first, state-machines]
---

TL;DR: Milestone 2 locked down asset state transitions and audit logging so nothing changes silently, nothing disappears, and every action leaves a trail.

Project page: [AssetTrack](/projects/assettrack/)

## Context

Before AssetTrack can ingest data in batches or operate offline with confidence, it needs discipline. Not UI polish. Not speed. Discipline.

Milestone 2 was about making sure that every asset change is explicit, intentional, and traceable. If something moves, changes hands, or changes state, it should leave evidence behind. No magic updates. No quiet edits.

## What changed

During this milestone I:
- Defined explicit asset custody and accountability states
- Introduced an append-only audit log for all state changes
- Bound state transitions to audit records so they can’t drift apart
- Made “events” the unit of truth instead of mutable fields
- Set the foundation for offline-first behavior by treating history as sacred

This wasn’t flashy work, but it was necessary. Everything that comes later depends on this being boring and correct.

## What I learned

Two lessons stood out:

1) If you don’t force discipline early, you end up retrofitting it later under pressure—and that never goes well.
2) Audit logs aren’t just for compliance; they’re a design tool. They force you to be honest about what your system actually does.

Milestone 2 also reinforced that offline systems need *more* structure, not less. When you can’t rely on constant connectivity, your data model has to stand on its own.

## Next

With state and audit foundations in place, the path forward was clear: offline batch ingest.

Milestone 3 moves up a layer—parsing, validation, preview, and eventually atomic commit—built on top of the guarantees Milestone 2 established.
