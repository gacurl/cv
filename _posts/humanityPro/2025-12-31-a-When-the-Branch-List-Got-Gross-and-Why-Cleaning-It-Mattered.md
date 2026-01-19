---
title: "2025-12-31-a — When the Branch List Got Gross (and Why Cleaning It Mattered)"
date: 2025-12-31
layout: single
categories:
  - engineering
  - process
tags:
  - git
  - cleanup
  - technical-debt
  - workflow
---

## TL;DR
I hit a point where my GitHub branch list felt *gross*.
Not broken — just messy enough that I couldn’t trust it anymore.

So I stopped feature work for a bit, cleaned house properly, and ended up with a much healthier codebase (and brain).

---

## The moment it clicked

I wasn’t looking for trouble — I was just deleting an old branch.

That’s when Git politely told me:

> “This branch is not fully merged.”

That should be a simple message.  
Instead, it opened a can of worms.

I ran `git branch -r`… and yeah.  
Dozens of old `issue-*` branches.  
Some merged. Some squash-merged. Some half-finished. Some duplicated. Some abandoned.

Nothing was *on fire* — but I had no confidence that:
- all meaningful work had made it into `main`
- no important fixes were stranded on old branches
- the branch list reflected reality

That’s when I paused and decided to clean it **properly**, not just delete things until Git stopped complaining.

---

## Why this mattered (more than aesthetics)

Branch clutter isn’t just cosmetic.

It creates real risks:
- You assume something shipped… but it didn’t.
- You delete a branch… and lose work you forgot existed.
- You hesitate to refactor because you’re unsure what’s “still in flight.”
- You stop trusting your own repo.

For a solo project, that’s dangerous.
For a future team project, it’s a slow disaster.

So instead of guessing, I went methodical.

---

## The real problem: squash merges hide ancestry

Here’s the key lesson:

**Squash merges make `git branch --merged` unreliable.**

Git tracks *commit ancestry*, not *patch equivalence*.
So when you squash a PR:
- the code is in `main`
- but the original branch commits are not

Result: Git thinks the branch is “unmerged” even though the work shipped.

That’s how branch lists silently rot.

---

## The fix: treat branches like evidence, not trash

Instead of deleting blindly, I used this mental model:

> “Show me what work exists **only** on this branch.”

Technically, that meant using:

git cherry origin/main <branch>


This was the turning point.

- `-` lines → already in `main`
- `+` lines → unique, at-risk work

No guessing. No vibes. Just facts.

---

## What I found

Across the repo, patterns emerged:

### 1. Many branches were fully safe to delete
Their commits were already patch-equivalent to `main`.

These went straight into the trash.

### 2. Some branches had *one or two valuable commits*
Often things like:
- documentation
- cleanup
- small tooling improvements

Those got **salvaged** via cherry-pick into fresh, clearly named branches, PR’d, merged, and *then* deleted.

### 3. A few branches revealed incomplete thinking
For example:
- fixes for older Postgres versions
- partial test work that overlapped newer tests

Instead of rushing, I made an explicit call:
> “This isn’t needed *right now* — and that’s okay.”

Those branches were deleted *intentionally*, not accidentally.

---

## The surprising outcome

At the end?

My remote branch list went from overwhelming… to empty.

No mystery branches.  
No “is this merged?” anxiety.  
No fear of deleting the wrong thing.

Just:
- `main`
- active work
- a clean backlog

That sense of calm is real — and earned.

---

## What I learned

### 1. Cleanups are engineering work
This wasn’t janitorial busywork.
It was risk reduction.

### 2. Git has the answers if you ask the right questions
`git cherry` > assumptions.

### 3. Small projects still deserve discipline
Especially if you plan to grow them later.

### 4. Emotional signals matter
When something feels “gross,” it usually is.
Listen to that instinct early.

---

## What’s next

With the repo clean, I’m back to forward motion:
- finishing admin polish
- inventorying placeholder features
- tightening contracts between views, styles, and tests

But now I’m doing it on solid ground.

And yeah — it feels *really* clean. 😌