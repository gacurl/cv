---
title: "🚜 AssetTrack — Milestone 3: Atomic Batch Ingest"
date: 2026-02-04
project: AssetTrack
categories: [projects, assettrack]
tags: [python, sqlite, offline-first, inventory]
---

**TL;DR:** AssetTrack can now safely ingest offline barcode scans. Batches are validated first, then committed atomically — everything succeeds, or nothing does.

[AssetTrack](/projects/assettrack/)

## Context

Milestone 3 was about one thing: **not lying to myself**.

Offline scanning sounds easy until you realize partial imports are worse than failures.  
If row 7 commits and row 8 fails, you don’t have “mostly correct” data — you have a mess you won’t notice until it matters.

So the goal became very clear:  
**review the batch first, then commit it as a single unit**. No exceptions.

## What changed

AssetTrack now has a real batch ingest path:

- CSV scans are parsed and validated with **no database writes**
- Valid rows are then applied inside **one SQLite transaction**
- Any error rolls back the entire batch
- Asset creation vs update is enforced using the database, not guesses
- Only `SCAN` is allowed to create a new asset
- Every action is still captured in the append-only audit log

This required ripping out a few “helpful” implicit commits that quietly broke atomicity. Once those were gone, the design finally behaved the way it was supposed to.

## What I learned

Transactions only work if you respect them everywhere.

It’s not enough to say “we use SQLite transactions” if helper functions commit behind your back. Once commit ownership was pushed to the edge — one connection, one transaction — the system became predictable again.

Separating validation from enforcement also paid off. Validation answers *“does this look right?”*  
Enforcement answers *“is this allowed right now?”*  
Those are different questions, and mixing them causes problems later.

## Next

Milestone 3 closes the loop from offline scan to trusted state change.

Next up:
- real-world testing with a physical OPN-2004 scanner
- small UX improvements around preview → confirm → commit
- operational docs so this can be used without tribal knowledge

This one feels solid.

