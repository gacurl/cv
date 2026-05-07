---
title: "2026-05-07 — 🚜 AssetTrack: Theme and navigation cleanup"
date: 2026-05-07
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, ux, navigation, accessibility, css, workflow]
---

TL;DR: Today was a cleanup and cognition day. I tightened workflow navigation, standardized layout behavior, fixed a subtle accessibility issue in the theme toggle, and reduced navbar noise with an icon-only dark mode control.

Project page: [AssetTrack](/projects/assettrack/).

## Context

AssetTrack is at the stage where the major workflows exist, but the operator experience is starting to matter more than raw feature count.

The system already works.

Now the question becomes:

> Does the system *feel* understandable under pressure?

That led into a chain of navigation and presentation cleanup issues focused on reducing cognitive load for operators.

The biggest realization today was that navigation has layers:

```text
global navigation
local workflow navigation
workflow actions
```

When those layers visually compete, the operator has to stop and think.

That is exactly what we do not want in a field inventory system.

## What changed

Completed UX/navigation cleanup chain:

- Issue 27-39 — strengthened preview affordance
- Issue 27-40 — clarified `/add-assets` action hierarchy
- Issue 27-41 — simplified alternate workflow navigation
- Issue 27-43 — compacted shared top-nav chips
- Issue 27-44 — standardized workflow-local back links
- Issue 27-46 — aligned workflow/admin container widths
- Issue 27-47 — fixed server-rendered theme toggle pressed state
- Issue 27-49 — simplified theme toggle to icon-only

The most interesting fix today was probably not visual at all.

The theme toggle had a subtle accessibility mismatch where the server-rendered HTML did not initially include the correct `aria-pressed` state. JavaScript eventually corrected it, but there was a brief mismatch between what the page showed and what accessibility tools understood.

The fix itself was tiny:

```text
one missing attribute
```

But those are the kinds of details that quietly erode trust over time if left unresolved.

I also simplified the dark mode toggle into a compact icon-only control. Removing words from the navbar sounds small, but it noticeably reduced visual noise.

## What I learned

I discovered an important distinction today:

```text
actual layout inconsistency
vs
perceived layout density
```

Originally I thought several admin pages had width problems.

After recon and testing, the real issue was only one outlier route using a narrower container.

Everything else that still *felt* different came from:

- table density
- spacing rhythm
- control grouping
- visual composition

That matters because it prevents over-fixing the wrong problem.

Another lesson:

```text
tiny UI inconsistencies compound
```

One slightly different nav row.
One awkward button hierarchy.
One oversized text label.

Individually they seem harmless.

Together they create friction.

## Next

Next up is likely continued workflow cognition cleanup:

- separating mixed nav/action rows more aggressively
- refining dense admin surfaces
- continuing to reduce unnecessary wording
- preserving accessibility while simplifying presentation

The system is starting to feel calmer.

That is the goal.