---
title: "2025-12-28 — Pulling Admin Styles Out of Views (Without Breaking Everything)"
date: 2025-12-28
layout: single
categories:
  - engineering
  - rails
  - frontend
tags:
  - rails
  - css
  - refactoring
  - admin-ui
---

**TL;DR:**
I moved admin dashboard styles out of individual views and into one shared stylesheet. Nothing was redesigned — this just makes the admin UI safer to change without breaking random pages.

## The goal

My admin pages worked, but they worked for the wrong reason: each page carried its own chunk of CSS. That’s fine early on, but it’s fragile. Change one thing and suddenly three pages look different.

The goal here wasn’t to redesign anything. It was simpler: **put admin styles in one place so future changes don’t feel risky**.

## What I did

I went page by page and moved inline `<style>` blocks into a shared stylesheet: `admin_dashboard.css`.

The tricky part was naming. A lot of pages used generic classes like `.container`, `.btn`, and `.back-link`. Instead of trying to “fix” that globally, I wrapped each page in a page-specific parent class and scoped the CSS under it. Boring? Yes. Safe? Also yes.

I also avoided touching global resets or body styles. Those belong at the layout level, not sprinkled across views.

## What I learned

Refactors get scary when you mix them with polish. I didn’t try to make things look better — I just made them **less fragile**. Once the structure is solid, polish is easy. Doing both at once is how bugs sneak in.

Tests staying green the whole time was the signal that this was the right pace.

## What’s next

Now that styles live in one place, I can do a focused cleanup pass: tighten spacing, remove duplication, and make the admin UI more consistent — without worrying about breaking random pages.

This wasn’t flashy work, but it’s the kind that pays off every time you come back to the codebase.
