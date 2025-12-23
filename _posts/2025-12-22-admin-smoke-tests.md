---
title: "Locking Down Admin Pages with Smoke Tests (Milestone 2)"
date: 2025-01-22
categories:
  - engineering
  - rails
  - testing
tags:
  - rails
  - testing
  - smoke-tests
  - engineering-hygiene
---

## Locking Down Admin Pages with Smoke Tests (Milestone 2)

As HumanityPro grows, one of my non-negotiables is that **admin pages should never 500**.

Not “rarely.”  
Not “only when the data is perfect.”  
**Never.**

During Milestone 2, I added a focused layer of **canary-style smoke tests** to lock in that guarantee. This post documents *why* I did it, *how* I approached it, and the small habits that made the work faster and safer than expected.

---

## What I Mean by “Smoke Tests”

These tests are **not correctness tests**.

They do **not** verify:
- business rules
- database side effects
- emails, jobs, or state transitions

Instead, each smoke test answers a single question:

> *Can this route be hit, with the right permissions, without crashing the app?*

That’s it.

The scope is intentionally narrow:
- route exists
- auth is enforced
- response is safe (usually a redirect)

If something deeper breaks later, that’s acceptable — but **admin pages should fail soft**, not explode.

---

## Why Admin Pages Deserve Canary Coverage

Admin interfaces are uniquely fragile:
- optional associations
- partial data
- legacy records
- feature flags
- background processes in flight

They’re also the last place you want surprises.

By adding smoke tests at the route level, I’m creating **early warning sensors** for:
- missing guards
- broken helpers
- incorrect redirects
- refactors that accidentally remove protections

These tests don’t replace unit or policy tests — they **complement them** by protecting the surface area.

---

## The Naming Convention (and Why It Mattered)

Every test added during this milestone followed a deliberate naming pattern:

```

Admin::<Action><Subject>SmokeTest

```

Examples:
- `Admin::ApproveCoachSmokeTest`
- `Admin::RejectCoachSmokeTest`
- `Admin::NonAdminAccessTest`

This mattered more than expected:
- Intent is obvious at a glance
- CI failures are easier to scan
- Scope is immediately clear
- Future contributors know these are *canaries*, not deep assertions

The same discipline applied to branch names and PR titles:

```

issue-2-7-approve-coach-smoke
issue-2-8-reject-coach-smoke
issue-2-9-non-admin-access-smoke

````

Consistency reduced cognitive load and friction across the entire milestone.

---

## A Small Habit That Saved Time: Confirming Routes First

Before writing any smoke test, I confirmed the route with:

```bash
bin/rails routes | rg <keyword>
````

This avoided:

* guessing helper names
* `undefined method *_path` errors
* debugging the wrong failure

Rails already knows the truth — asking it directly is faster than assuming.

This habit alone saved significant time across the milestone.

---

## What We Covered (Issues 2-5 → 2-9)

Over a short sequence of focused issues, I added smoke coverage for:

* Admin users page
* Admin coaches page
* Pending coaches page
* Coach detail page
* Approve coach (PATCH)
* Reject coach (PATCH)
* Non-admin access denial to the admin dashboard

Each test:

* exercised a real route
* used existing fixtures
* made **one assertion**
* avoided business logic entirely

The result is a lightweight but meaningful safety net.

---

## What Broke Along the Way (and Why That Was Useful)

Several things surfaced immediately:

* incorrect assumptions about model names
* fixture mismatches
* route helper typos
* redirects pointing to the wrong helper

None of these were catastrophic — and that’s the point.

The smoke tests caught them **before** they became runtime admin failures.

---

## The Mental Model Going Forward

* Admin pages should **never 500**
* Smoke tests protect *behavior*, not *implementation*
* One route + one assertion is enough
* Naming is part of the engineering work
* Shipping “working and documented” beats polish

Milestone 2 didn’t add flashy features — it added **confidence**.

And confidence compounds.

---
```
*Next up: continuing to build forward knowing the admin surface is guarded.*

```
