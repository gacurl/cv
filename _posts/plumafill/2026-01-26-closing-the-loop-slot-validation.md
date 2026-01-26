---
title: "2026-01-26 — 🪶Closing the Loop: Slot-Based Validation in PlumaFill"
date: 2026-01-26
tags: [plumafill, rails, game-dev, architecture]
---

TL;DR: PlumaFill can now reason about correctness at the *word* level. Each slot knows whether it’s incomplete, incorrect, or correct—and the puzzle can report its overall state without touching the UI.

[Project page → /projects/plumafill](#)

## Context

Up through Milestone 1, PlumaFill was all about feel: typing, navigation, paste behavior, and making sure the grid behaved like a real puzzle.  
With Issue 2-1 and 2-2, the grid became data-driven and learned how to derive *slots* (across and down words) from structure alone.

That set the stage for Issue 2-3: teaching the system how to decide whether a word—or the entire puzzle—is right or wrong.

Importantly, this work was intentionally **logic-only**. No UI feedback yet. No Tailwind. No animations. Just correctness.

## What changed

The `PuzzleDemo` model now owns validation logic in a clean, deterministic way:

- Each slot is evaluated as:
  - `:incomplete` (any blank cells)
  - `:incorrect` (fully filled, at least one mismatch)
  - `:correct` (fully filled, all letters match)
- The puzzle derives its overall state from the slots:
  - `:incomplete` if any slot is incomplete
  - `:incorrect` if all slots are filled but any are wrong
  - `:correct` only when every slot is correct

All of this happens without UI assumptions. Given a user grid and the puzzle definition, the model returns a structured, inspectable result.

Validation was verified directly in the Rails console using empty grids, correct grids, and intentionally corrupted input.

## What I learned

Two things really stood out:

1. **Lock the shape before behavior.**  
   Defining return structures and method contracts first made it much easier to reason about correctness without second-guessing design choices later.

2. **Words matter more than cells.**  
   Crosswords are solved by words, not individual letters. Once the model “thinks in slots,” everything downstream—feedback, checking, completion—becomes simpler and more honest.

This also reinforced the value of strict scope control. Keeping Issue 2-3 UI-free prevented accidental drift into polish or UX decisions too early.

## Next

With slot-level correctness in place, the next step is Issue 2-4: **slot-based visual feedback**.

That work will:
- Consume the validation states already implemented
- Highlight words instead of individual cells
- Stay lightweight and non-intrusive

The architecture is ready. Now it’s time to let the player *see* what the puzzle already knows.
