---
title: "2026-02-06 — 🚜 AssetTrack: Milestone 4 — Design Pivot and Course Correction"
date: 2026-02-06
project: AssetTrack
categories: [projects, assettrack]
tags: [python, offline-first, barcode-scanning, ux, design-decisions]
---
TL;DR: Milestone 4 didn’t go the way I planned. I made an early design assumption that didn’t hold up, had to rewrite the milestone, add new issues, and work through the pivot deliberately. That work is now complete and the milestone is closed.

Project page: [AssetTrack](/projects/assettrack/)

## Context

Milestone 4 was supposed to be straightforward: **portable intake using a handheld scanner**.

I came into it assuming I could extend the batch ingest work from Milestone 3 and reuse that mental model in a portable setting. On paper, it looked reasonable.

In reality, that assumption caused friction almost immediately.

## Where things went sideways

There were two things I didn’t think through enough up front.

First, I treated portable scanning like **batch upload**, which works fine for CSVs but doesn’t match how people actually use scanners in the field.

Second — and more importantly — I underestimated what it would take to **download batches off the device**.

Doing that “properly” would have meant:
- Relying on proprietary vendor software
- Dealing with OS-level USB access
- Tinkering inside the operating system to get ports and permissions right
- Accepting platform-specific behavior I don’t control

At that point, AssetTrack would’ve been solving USB and driver problems instead of inventory problems.

The juice wasn’t worth the squeeze.

## The decision: rewrite the milestone

Once it was clear the original approach wasn’t viable, I stopped and reset.

That meant:
- Rewriting Milestone 4 to reflect a **keyboard wedge–first** approach
- Adding new issues to support the design shift
- Closing out work that no longer made sense
- Working the new issues all the way through to resolution

This wasn’t a small tweak — it was a design correction.

## Why the keyboard wedge won

Keyboard wedge mode already solves the hardest problems:
- No proprietary software
- No OS-level USB work
- No drivers
- No special permissions

The scanner just types characters and hits Enter.  
That’s boring — and boring is exactly what you want in an offline-first intake flow.

Once I leaned into that reality, the intake design simplified fast.

## What Milestone 4 delivered (after the pivot)

By the time the milestone closed, AssetTrack had:

- A keyboard-wedge friendly intake UI
- Immediate scan capture and queuing
- Preview and validation routes shaped for ingest
- Server-side session enforcement
- Clear, visible session timing in the UI

The system still enforces security and custody — it’s just no longer mysterious about it.

## What I took away from this

If I had to explain this milestone to myself a month ago:

- Hardware dictates workflow. Don’t fight it.
- Proprietary tools add risk and friction you don’t control.
- If a design forces you into OS internals, step back.
- Rewriting a milestone is better than dragging a bad assumption forward.

Milestone 4 took longer than planned, but the pivot made the system stronger.

## Next

Milestone 4 is now closed with the **correct** design in place.

The next step is tightening discipline around commits — reviewed scans should be committed **as a unit**, intentionally and atomically.

That work starts in Issue 5-1.