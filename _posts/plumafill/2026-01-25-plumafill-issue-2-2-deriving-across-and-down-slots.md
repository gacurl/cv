---
title: "2026-01-25 — 🪶 PlumaFill: From Proof-of-Fun to Real Puzzle Logic"
date: 2026-01-25
categories: [projects, plumafill]
tags: [plumafill, rails, game-dev]
---
TL;DR: In one long, productive day, PlumaFill graduated from “this feels playable” to “this actually understands puzzles.”

**Project page:** [/projects/plumafill/](/projects/plumafill/)

## Context
Milestone 1 closed with Proof-of-Fun officially locked. The grid worked, typing felt good, navigation was predictable, and the game finally behaved like a puzzle instead of a tech demo.

That milestone was intentionally about *interaction*, not correctness.

Today was about crossing that line.

Between closing Milestone 1 and the end of the day, I worked through **Issue 2-1** and **Issue 2-2**, which together marked the transition from “letters in boxes” to “a system that understands what a puzzle actually is.”

## What changed
### Issue 2-1 — Data-driven grid (and a lot of cleanup)
The first step was ripping out every remaining hard-coded assumption about the grid.

The demo grid is now fully driven by puzzle data:
- grid shape comes from the model
- blocked cells are inferred, not indexed
- typing, paste, arrow navigation, and backspace all work without assuming width or height

There was some honest friction here — controller drift, subtle bugs, and one especially sneaky dataset typo — but the end result was worth it. The grid logic is now stable, readable, and interview-defensible.

Most importantly, all Milestone 1 behavior was preserved. Nothing “new” was added — it just stopped being fragile.

### Issue 2-2 — Teaching the puzzle about words
Once the grid was stable, the next question was obvious: *where are the words?*

Issue 2-2 introduced real puzzle logic by deriving **across and down slots programmatically** from the grid data. Instead of encoding word boundaries by hand, the model now scans the grid and identifies slot starts based on simple rules.

Each derived slot now includes:
- orientation (across or down)
- starting row and column
- length
- an ordered list of cell coordinates

At that point, the puzzle stopped being a collection of cells and became a collection of words. That’s a quiet change, but it’s a foundational one.

## What I learned
- Refactors feel messy right up until they suddenly don’t
- Slot logic belongs in the puzzle model, not the UI
- Small, disciplined commits make long sessions survivable
- It’s okay to slow down when the code starts arguing back

Also: paste handling across browsers is *way* more exciting than it sounds.

## Next
- Use slot metadata to drive validation and feedback
- Highlight words, not just cells
- Keep layering correctness on top of a stable interaction core

Today felt like a real inflection point for PlumaFill.  
It’s still small, still playful — but it finally knows what a puzzle *is*.
