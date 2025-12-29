---
title: "2025-12-29 — Making Admin Tools Feel Intentional"
date: 2025-12-29
layout: single
categories:
  - engineering
  - rails
  - product
tags:
  - rails
  - admin-ui
  - ux
  - refactoring
---

**TL;DR:**  
Finished polishing the admin experience by fixing a subtle UX gap. The Pending Coach Approvals workflow worked, but wasn’t obvious. A small, intentional link made the difference — no redesign, no new logic, just clarity.

---

## The goal

Today was about finishing something that *felt* off, even though it technically worked.

Admin tools don’t need to be pretty, but they **do** need to feel intentional. When something exists but you can’t easily find it, that’s not a feature gap — that’s friction.

---

## What I worked on

I closed out **Issue 4-6**, which started as “the Pending Coaches page doesn’t work” and turned out to be something more subtle:

The page worked.  
The route existed.  
The view rendered correctly.

But the **path to get there wasn’t obvious**.

---

## What was actually wrong

On the *Manage Coaches* page, the status tabs (All / Pending / Approved / Rejected) looked like navigation — but they were really just JavaScript filters.

Meanwhile, the real “Pending Coach Approvals” workflow lived on its own page.

That mismatch creates confusion:
- one “Pending” filters
- another “Pending” is a workflow
- neither makes that distinction clear

If you have to stop and think, the UI already lost.

---

## The fix

I made one intentional change:

- **“Pending Approvals” now links directly from the Manage Coaches page**
- The other tabs stay as in-page filters
- A small “Quick filters” label clarifies the intent

No new routes.  
No redesign.  
No behavior changes.

Just aligning the UI with how a human expects it to behave.

---

## What I learned

Small UX mismatches compound faster than big bugs.  
If something *feels* confusing, treat it like a real defect — because to the user, it is.

---

## What’s next

Milestone 4 is in a good place. The admin area is now consistent, discoverable, and predictable.

Next up will either be:
- deeper UI spacing cleanup, or
- stepping back and letting this settle before moving on

For today, this was a good stopping point.