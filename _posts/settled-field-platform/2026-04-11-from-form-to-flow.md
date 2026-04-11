---
title: "2026-04-11 — 🧭 Settled on the Field: From Form to Flow"
date: 2026-04-11
project: Settled Field Platform
categories: [projects, settled-field-platform]
tags: [nextjs, stripe, product-design, mvp, conversion]
---

**TL;DR:** The site stopped being “just pages” today. Registration is real, payment is scaffolded, and the funnel now has forward motion.

Project page: [Settled Field Platform](/projects/settled-field-platform/).

---

## Context

Up until now, everything looked good — but it wasn’t *real* yet.

Milestone 1 gave me:
- a clean landing page
- a summit page that builds trust
- a registration page that *looked* like the next step

But it was still a surface.

Today was about turning that surface into behavior:
- capturing intent
- holding it
- moving the user forward

Without overbuilding the backend.

---

## What changed

Two major things happened.

### 1. Registration became real

The form now:
- enforces required fields
- validates input server-side
- normalizes data (email)
- stores a short-lived draft (HTTP-only cookie)

That last part matters.

Instead of jumping straight into a database, I used a **draft model**:
- temporary
- server-owned
- just enough to bridge into payment

This keeps the system light while still making it *real*.

---

### 2. Payment became a defined path

Stripe isn’t live yet — and that’s intentional.

What *is* live:
- a server-side checkout entry point
- environment-driven Stripe config shape
- a controlled “stub mode” when keys aren’t present

Flow now looks like:

```
Register → Payment-ready → Checkout seam → Stub (for now)
```

No fake success.  
No dead ends.  
No pretending.  

Just forward motion.

---

## What I learned

### 1. Don’t solve the final system too early

It’s tempting to jump straight into:
- database models
- payment records
- webhook handling

But that would’ve slowed everything down.

Instead:
- form → server action
- draft → cookie
- checkout → scaffold

Each step supports the next, without locking anything in.

---

### 2. Design consistency matters more than features

The biggest improvement today wasn’t technical.

It was removing the **“app UI” feel** from `/register`.

Once I aligned it with the same:
- spacing
- typography
- section structure

…it stopped feeling like a form and started feeling like a **step in a journey**.

That’s the difference between:
- a page
- and a conversion system

---

### 3. Forward motion is everything

Every step now answers:

> “What happens next?”

- submit → you’re ready for payment  
- continue → you enter checkout (or stub)  
- no confusion, no guessing  

Even without Stripe live, the system *moves*.

---

## Next

Two paths, depending on timing:

### If Stripe keys arrive:
- wire real Checkout
- complete payment loop
- introduce confirmation state

### If not:
- build Confirmation page (Issue 2-4)
- complete the visible funnel
- keep momentum

---

Today was the shift.

This isn’t a website anymore.

It’s a system.