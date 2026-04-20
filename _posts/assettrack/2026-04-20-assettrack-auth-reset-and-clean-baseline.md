---
title: "2026-04-20 — 🚜 AssetTrack: Authentication Hardening and Returning to a Clean Baseline"
date: 2026-04-20
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, authentication, security, sqlite, ux]
---

TL;DR: Implemented a secure admin-controlled password reset without schema changes, fixed a subtle auth bug, reset the system to a clean production baseline, and removed friction from the operator experience.

Project page: [AssetTrack](/projects/assettrack/).

## Context

After deployment and email delivery were stabilized, the next gap became clear:

Authentication recovery.

In a real system, users will forget passwords.  
If recovery is weak, the system is fragile.  
If recovery is too powerful, the system becomes unsafe.

This work focused on building a reset path that:

- works offline  
- stays inside local trust boundaries  
- does not weaken authentication  
- does not introduce new infrastructure dependencies  

At the same time, the system accumulated test data and UX friction that needed to be cleaned up before moving forward.

This was both a **security pass** and a **reset to a clean operational state**.

---

## What changed

### Admin-controlled password reset (no schema change)

A reset flow was introduced with these properties:

- admin triggers reset
- system generates a strong temporary password
- password is shown **one time only**
- stored value remains hashed (no plaintext persistence)
- user must change password on next login

The key constraint:

> no schema change allowed

Instead of adding a column, a marker prefix was applied to the existing password hash:

```
assettrack-temp-password:<hash>
```

This allowed the system to:

- detect temporary password state
- enforce password change
- avoid migrations entirely

This kept the system stable while extending behavior.

---

### The bug that proved the design

Initial implementation failed at login.

Symptom:

- temp password generated successfully
- login returned “Invalid login”

Root cause:

- authentication logic treated the prefixed value as a normal hash
- password verification never stripped the prefix

Fix:

- detect prefix during verification
- strip prefix
- pass underlying hash to verifier

This was a small change, but important.

It reinforced a rule:

> Any encoding or wrapping of stored values must be understood everywhere that value is read.

---

### Forced password change (gated access)

After successful login with a temporary password:

- user is blocked from normal routes
- user is redirected to password change
- access is restored only after successful update

This ensures:

- temporary credentials cannot be reused
- users do not operate the system in a degraded state

---

### Secure one-time password reveal

Temporary passwords are:

- generated server-side
- returned only in the immediate response
- never stored in plaintext
- never retrievable later

Hardening added:

- `Cache-Control: no-store`
- `Pragma: no-cache`
- `Expires: 0`

This reduces risk of:

- browser caching
- proxy storage
- accidental leakage

Delivery to the user is intentionally **out-of-band**:

- in person
- phone
- trusted local channel

The system does not attempt to deliver secrets.

---

### Account state remains authoritative

Reset does **not** modify account status.

If a user is:

- disabled → they remain disabled after reset

This avoids:

- accidental reactivation
- bypass of administrative intent

The system separates:

- **authentication state** (password)
- **account state** (active/disabled)

This is intentional.

---

### Clean database reset

At this point, test users and data were polluting the system.

Instead of partial cleanup:

- database was backed up
- database was removed
- system was rebuilt clean

Result:

- no test artifacts
- no hidden references
- no inconsistent state

Bootstrap was then used to:

- create the initial admin user
- verify first-run behavior

This restored the system to a **true baseline**.

---

### Manual import remains intentional

Inventory import was run manually after reset.

It is not part of startup.

This is by design.

If import ran automatically:

- duplicate data would occur
- restarts would mutate state
- debugging would become difficult

Import is treated as a **controlled data operation**, not a system requirement.

---

### UX friction: the pointer fix

One small issue had outsized impact:

Buttons did not show a pointer cursor.

Effect:

- UI felt unresponsive
- operators questioned whether actions were clickable

Fix:

```css
button { cursor: pointer; }
```

This did not change behavior.

It changed **perception of reliability**.

---

## What I learned

### 1. Schema changes are expensive — avoid when possible

The reset flow could have introduced new columns.

It didn’t.

By reusing existing structure carefully, the system gained capability without increasing migration risk.

---

### 2. Authentication bugs hide in edge encoding

The system worked — except for one detail:

A prefix.

That small mismatch broke the entire flow.

Lesson:

> Every transformation of stored data must be reversible at every read point.

---

### 3. Separation of concerns matters

Password reset did not:

- enable accounts
- change roles
- alter workflow

That separation keeps the system predictable.

---

### 4. Clean state beats partial cleanup

Deleting test users manually risks:

- orphaned data
- inconsistent references
- hidden bugs

Resetting the database created:

- a known-good baseline
- a reproducible starting point

---

### 5. UX signals are part of system correctness

The pointer cursor fix did not change logic.

But it changed:

- operator confidence
- perceived responsiveness
- usability under pressure

That matters in a field system.

---

## Next

**Issue 26-152 — Improve Admin User Reset Flow Clarity**

The system works correctly, but the UI still requires operator thinking:

- user state is not obvious
- reset vs enable sequence is not guided

Next step:

- make account state explicit
- guide correct next action
- reduce cognitive load

---

## Bottom line

The system is now:

- secure in authentication recovery  
- free of test data  
- operating from a clean baseline  
- more trustworthy to the operator  

The biggest changes were not structural.

They were about:

- respecting constraints  
- fixing small but critical gaps  
- and making the system behave predictably  

That is what turns working code into a reliable system.