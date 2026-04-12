---
title: "2026-04-12 — 🧭 Settled on the Field: Admin Control Layer Complete"
date: 2026-04-12
project: Settled Field Platform
categories: [projects, settled-field-platform]
tags: [admin, authentication, postgres, vercel, milestone3]
---

**TL;DR:** The system is no longer just pages and forms — it now has real operator control. Admin access, user lifecycle, and production auth are fully live.

Project page: [Settled Field Platform](/projects/settled-field-platform/)

---

## Context

Up until now, this build was moving toward something real, but not fully operational.

We had:
- a working funnel
- a real registration flow
- persistence in place

But we didn’t yet have:
- controlled access
- operator autonomy
- a way to safely manage who can use the system

That’s what Milestone 3 was about.

And today, that layer is done.

---

## What changed

This milestone introduced the full **admin control layer**.

### 1. Real authentication (DB-backed)
- Admin users stored in Postgres
- Roles:
  - `owner`
  - `admin`
- Passwords hashed properly
- Session cookies signed and verified per request

This is no longer “fake login.”  
It’s real auth.

---

### 2. Full admin lifecycle

We now have the complete flow:

- Owner creates admin users
- Users can request access (`/admin/request-access`)
- Owner reviews requests (`/admin/requests`)
- Owner can:
  - approve
  - deny
  - disable
  - permanently remove

With guardrails:
- system prevents deleting the last owner
- access is validated against DB on every request

This is a **controlled system**, not a free-for-all.

---

### 3. Production bootstrap (the real lesson)

Getting this live surfaced something important:

> A working system locally is not the same as a working system in production.

To make admin login work on Vercel, three things had to be true:

- correct `DATABASE_URL`
- correct production database (not a lookalike)
- **`ADMIN_SESSION_SECRET` present**

That last one was the trap.

Without it:
- login “worked”
- but session creation failed
- result: `Unauthorized`

Once that was fixed, everything snapped into place.

---

### 4. First real operator moment

I created the first production owner via CLI, then logged in through the live app.

That’s the moment this stopped being:
> “a thing I’m building”

and became:
> “a system that can be operated”

Then I brought in a second user as admin.

No CLI.
No database work.
No dev intervention.

Just:
- create user
- send login
- system handles the rest

That’s the shift.

---

## What I learned

### 1. Auth is not just login
You need:
- identity (DB)
- verification (password)
- session (cookie)
- **signature (secret)**

Miss one → system fails in non-obvious ways

---

### 2. Production truth matters
You can’t fake:
- environment variables
- database wiring
- session handling

Those seams will break if they’re not real.

---

### 3. Control is what makes a system usable
Pages don’t make a product.

Control does.

Now the system can:
- onboard users
- restrict access
- remove access
- operate without the developer

That’s the difference between:
> demo  
and  
> product

---

## Next

Milestone 4:

**Payment Hardening (Stripe)**

Up next:
- real checkout session
- payment verification
- tying money to registration truth

That’s where this becomes:
> not just usable  
but valuable

---

This was a big one.

The system is now:
- structured
- controlled
- live

Next step:
make it real revenue.