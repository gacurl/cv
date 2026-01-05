---
title: "2026-01-03 — Making the Admin Honest"
date: 2026-01-03
layout: single
categories:
  - engineering
  - rails
  - admin
tags:
  - rails
  - observability
  - technical-debt
  - admin-ui
---

## TL;DR
Milestone 5 is **mostly complete**.  
The admin UI is now honest, read-only, and resilient — with one small follow-on issue (5-2) remaining to finish the milestone cleanly.

---

## The goal

Milestone 5 was about one thing:

> Treat the admin area as an **observability layer**, not a control panel.

That means:
- no hidden writes
- no pretend buttons
- no rescuing errors into silence
- no UI that implies authority the system doesn’t yet have

If the platform can’t safely act yet, the admin UI shouldn’t lie about it.

---

## What actually happened today

### 1. Admin buttons lied (so they had to go)

Across multiple admin views, there were actions that *looked* real:
- approve
- reject
- assign
- message
- bulk actions

Some were placeholders.  
Some depended on assumptions the system couldn’t guarantee.  
None belonged in a read-only observability phase.

So they weren’t disabled or commented out — they were **removed**.

In their place: explicit messaging that says what the admin *can* and *cannot* do right now.

---

### 2. Optimistic data assumptions got cleaned up

A lot of the admin UI assumed data would always exist:
- counts without guards
- collections assumed non-nil
- stats read optimistically

That works… until it doesn’t.

Today turned into a small campaign against that optimism:
- force numbers to be numbers
- treat missing collections as empty
- replace rescue-and-hope with explicit guards

Not glamorous — but the admin pages no longer crash or lie when data is missing.

---

### 3. One syntax error tried to ruin the vibe

At one point:
- tests were green  
- then suddenly red  
- then red again  

Classic ERB problem: a missing `end` hiding at EOF.

Instead of guessing, I stopped, ran the tests, found the exact error, fixed it surgically, and moved on.

That moment alone justified the slower pace.

---

### 4. The user profile page was the last boss

It had everything:
- action buttons
- alerts pretending to be features
- metrics without guards
- mixed layout conventions

By the end of the day:
- it’s read-only
- metrics are safe
- fake affordances are gone
- admin intent is explicit

It finally matches the rest of the system.

---

## The important decision

I wanted to refactor.

There are stat blocks begging to be partials.  
There’s repetition.  
There are obvious cleanups.

But I didn’t — not yet.

Instead:
- correctness first  
- safety second  
- refactor later  

Those refactors are captured explicitly as **Issue 5-2**, so they don’t get lost or mixed into behavior changes.

That separation matters.

---

## Where Milestone 5 actually stands

This is the honest status:

- **Issue 5-1:** complete  
  (Admin made read-only, resilient, and truthful)

- **Issue 5-2:** remaining  
  (small, intentional cleanup and polish to fully close the milestone)

The finish line is close, but it’s not crossed yet — and that’s okay.

---

## What I learned (again)

- Remove beats disable  
- Rescue hides problems  
- Read-only UIs build trust  
- Refactors deserve their own issue  
- Pace matters more than speed  

Also: ERB will absolutely humble you if you rush.

---

## What’s next

Finish **Issue 5-2**, close Milestone 5 cleanly, then move on with confidence.

That’s a good place to stop for the day — and a better place to pick back up tomorrow.