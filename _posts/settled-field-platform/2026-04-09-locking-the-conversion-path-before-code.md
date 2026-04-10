---
title: "2026-04-09 — 🧭 Settled on the Field: Locking the Conversion Path Before Code"
date: 2026-04-09
project: Settled Field Platform
categories: [projects, settled-field-platform]
tags: [conversion, product-design, nextjs, planning, mvp]
---

**TL;DR:** I locked the full user flow for the Summit (Landing → Summit → Register → Pay → Confirm) and packaged it for the client before writing any code.

Project page: [Settled Field Platform](/projects/settled-field-platform/)

---

## Context

I’m building out the Settled on the Field platform, but this isn’t a normal website build.

The goal is not pages—it’s **conversion**.

The current gap is simple:
- No structured way for users to move from interest → commitment  
- No system for registration, payment, or follow-up  
- No backend to support the experience  

Before writing a single line of code, I needed to answer one question:

👉 *What is the exact path a user takes to commit?*

---

## What changed

I defined and locked the core flow:

**Landing → Summit → Registration → Payment → Confirmation**

Then I translated that into:
- Wireframes (Figma, view-only for client)
- A design intent document (client-facing)
- A structured walkthrough plan for the call

Each step in the flow has a job:

- **Landing:** Get attention  
- **Summit:** Build trust  
- **Registration:** Capture intent  
- **Payment:** Create commitment  
- **Confirmation:** Reinforce decision  

This turned the project from:
> “build a site”

into:
> “build a system that moves people to act”

---

## What I learned

If you don’t lock the flow first, everything downstream breaks.

Design debates start too early.  
Features creep in.  
You end up building something that looks good but doesn’t convert.

The key shift was treating this like a **decision system**, not a UI.

Every page exists to answer a question in the user’s head:
- Why should I care?
- Why should I trust this?
- Am I in?
- Did I make the right call?

If a page doesn’t answer one of those, it doesn’t belong.

---

## Next

I’m running the client call to validate the flow.

Best case:
👉 Flow is approved → move into build (Milestone 1)

If not:
👉 Adjust the path, not the visuals

Once approved, I’ll start turning Landing + Summit into real Next.js pages and begin building the system out in phases.

No code until the path is right.