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
  - refactoring
  - technical-debt
---

## TL;DR
I finished Milestone 5 by turning the admin UI into something it wasn’t before: **honest**.  
No hidden writes. No fake buttons. No rescuing errors into silence. Just read-only views that tell the truth.

---

## The goal

Milestone 5 was simple to describe and tricky to execute:

> Treat the admin area as an **observability layer**, not a control panel.

That means:
- no writes
- no pretending features exist
- no hiding broken data
- no “we’ll fix it later” logic leaks

If the system can’t safely act yet, the UI shouldn’t lie about it.

---

## What actually happened

### 1. Admin buttons lied
Across multiple views, the admin UI *looked* powerful:
- approve
- reject
- assign
- message
- bulk actions

But most of those either:
- didn’t exist yet, or
- depended on assumptions the system couldn’t guarantee

So they all had to go.

Not disabled.  
Not commented out.  
**Removed.**

In their place: clear read-only messaging that explains *why*.

---

### 2. Counts were optimistic (and fragile)
A lot of numbers assumed data was always there:

```
@something.count
@stats[:total]
@collection.any?
```
That works… until it doesn’t.

Today turned into a small campaign against optimistic assumptions:

- counting things that might not exist
- reading stats that might be missing
- asking collections questions when the collection might be nil

The fix was boring but effective:
- force numbers to be numbers
- treat missing collections as empty
- prefer explicit guards over rescuing failures

Not glamorous — but the admin pages no longer crash or lie when data is missing.

---

## One syntax error tried to ruin the vibe

At one point:
- tests were green  
- then suddenly red  
- then red again  

Classic ERB problem: a missing `end` hiding at the end of the file.

Instead of guessing, I stopped, ran the tests, found the exact error, fixed it surgically, and moved on.

That moment alone justified the pace.

---

## The user profile page was the last boss

It had everything:
- action buttons
- alerts pretending to be features
- metrics without guards
- mixed layout conventions

By the end of the day:
- it’s read-only
- metrics are safe
- no fake affordances remain
- admin intent is explicit

It finally matches the rest of the system.

---

## The important decision

I wanted to refactor.

There are stat blocks begging to be partials.  
There’s repetition.  
There are obvious cleanups.

But I didn’t.

Instead:
- correctness first  
- safety second  
- refactor later  

The refactor idea is captured in the backlog, where it belongs.

That separation matters.

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

Milestone 5 is done.

Milestone 6 can now start cleanly, without guessing what the admin meant to say.

That’s a good place to stop for the day.

