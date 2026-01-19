---
title: "2026-01-03 — Closing Milestone 4: The Style System Extraction (aka The Unsexy Work That Matters)"
date: 2026-01-03
layout: single
categories:
  - engineering
  - rails
  - humanitypro
tags:
  - rails
  - tech-debt
  - refactoring
  - frontend
---

## TL;DR
Milestone 4 was about removing hidden fragility.  
No new features. No flashy UI. Just pulling style and JavaScript decisions out of random places and putting them where Rails actually expects them to live.  
It was harder than it looked — and worth every minute.

---

## Why this milestone existed at all

Milestone 4 wasn’t born from ambition.  
It was born from *unease*.

The app worked. Tests passed. Pages loaded.  
But under the surface:

- CSS lived wherever it happened to land
- JavaScript was embedded inline in views
- Behavior depended on browser quirks like implicit `event`
- Tests passed… unless Spring got grumpy
- CI failures felt “mystical”

In other words: **the app was polite, but lying to me.**

This milestone was about making the truth boring again.

---

## What actually got done

### 1. Style system extraction
Admin styles were consolidated and validated as *actual CSS*, not “SCSS-looking stuff that happened to work.”

That included:
- Verifying media queries weren’t secretly nesting selectors
- Removing ambiguity about where admin styles live
- Making the contract between views and styles explicit

Nothing changed visually — which is exactly the point.

---

### 2. Inline JavaScript eviction (Issue 4-12)

This was the big one.

Every admin page had little `<script>` blocks doing real work:
- filtering
- tabs
- modals
- animations
- form behavior

They worked… until they didn’t.

So I:
- extracted all inline JS into managed Sprockets assets
- declared them properly in the asset manifest
- loaded them intentionally via `javascript_include_tag`
- fixed implicit global `event` usage everywhere

No frameworks. No rewrites.  
Same behavior, cleaner wiring.

---

### 3. The “why do tests only pass *this* way?” rabbit hole

At one point, tests only passed with:

```
DISABLE_SPRING=1 bin/rails test
```
Which is a smell you can’t ignore.

That led to uncovering:

a missing Rails-convention directory

an asset manifest pointing at something that didn’t exist

Spring doing exactly what it was supposed to do (and exposing the problem)

Fixing that restored:

normal bin/rails test

predictable CI behavior

my trust in the test suite

Why this was harder than it sounds
Because nothing was broken.

This was:

archaeology

constraint work

“don’t accidentally change behavior” engineering

cleaning up things that only fail under pressure

It’s the kind of work you only notice when it’s missing.

And yes — there were moments where I created the wrong folder, deleted the right one, questioned my life choices, and learned (again) that Rails has opinions, whether you follow them or not.

---

### What I learned (again)
Rails conventions are boring on purpose

Inline JS is technical debt with a short fuse

If Spring and CI disagree, listen carefully

Structure buys you speed later

“It works” is not the same as “it’s stable”

---

### Where this leaves HumanityPro
Milestone 4 is now done.

That means:

Admin UI behavior is explicit and traceable

Styles and JS live where Rails expects them

Tests are trustworthy again

Future UI work won’t require superstition

The app is quieter now — and that’s a good thing.

---

### What’s next
Now that the foundation is stable:

future admin features get simpler

UI changes get safer

regressions get louder (and faster to fix)

Milestone 5 can finally focus on capability, not cleanup.

And honestly?
I’m glad I did the unsexy work first.