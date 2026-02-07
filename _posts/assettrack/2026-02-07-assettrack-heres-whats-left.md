---
title: "2026-02-07 — 🚜 AssetTrack: Here’s What’s Left"
date: 2026-02-07
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, backlog, ux, operations, offline-first]
---
TL;DR: AssetTrack is now operable and documented. What’s left is refinement: smoother intake UX, clearer per-scan context, and a few “small” improvements that make the tool feel calm under pressure.
Project page: [AssetTrack](/projects/assettrack/).

## Context

When you close an “operational hardening” milestone, you don’t just check boxes — you change what the project *is*.

Before Milestone 6, AssetTrack was correct. After Milestone 6, AssetTrack is something you can hand to a person and feel decent about it.

But “decent” isn’t the finish line. The finish line is: the operator stays confident even when the day is chaotic.

So here’s what’s left — not in a doom-list way, but in a “this is how it gets better” way.

## What changed

Milestone 6 did the unglamorous work:
- Deployment guidance
- Scanner expectations
- Security baseline visibility
- Operational assumptions spelled out

That matters because it sets the rules of the road. Now we can improve the driving experience without worrying the wheels are going to fall off.

## What I learned

- **The real product is the operator’s mental model.** If the UI makes sense to me as a developer but not to the person scanning items, I’m building the wrong thing.
- **Reliability is a feeling, not just a property.** The system can be “correct” and still feel sketchy if the UI stutters or surprises the operator.
- **Backlog items aren’t “extra.”** They’re often the difference between “usable” and “trusted.”

## Next

Here’s the backlog I’m intentionally deferring until after the last milestone / MVP, but I’m writing it down now so it doesn’t get lost:

### Intake UI micro-improvements (defer)
1. **Client-side auto-lock UI at 0 seconds without refresh**  
   When the timer hits zero, the UI should lock immediately — no waiting for a reload to catch up.
2. **Subtle pulse/animation under 10 seconds**  
   Not gimmicky. Just a quiet “hey, you’re about to lock” signal.
3. **Show per-scan timestamps in the queue**  
   Operators should be able to answer, “Did this just scan, or was that earlier?”

### Equipment type handling improvements (defer)
- Keep the default as **laptop** (and make it configurable).
- Ensure **equipment_type is stored per scan item** so later edits don’t rewrite history.
- Consider a dropdown/preset list and (optionally) a per-item override workflow when needed.

### The deeper theme
All of these point to the same idea: **reduce operator surprise**.

If the system feels predictable, it gets used.  
If it feels unpredictable, it gets bypassed, and then your audit trail becomes fiction.

So the roadmap from here is simple:
- make intake calmer
- make the queue more informative
- make timing behavior obvious
- keep history honest

That’s how AssetTrack turns into a tool people actually lean on.