---
title: "2026-04-26 — ⏱️ Settled on the Field: Going Live"
date: 2026-04-26
project: Settled Field Platform
categories: [projects, settled-field-platform]
tags: [nextjs, vercel, bluehost, dns, deployment, mvp]
---

TL;DR: Settled on the Field is live at [settledonthefield.com](https://settledonthefield.com). The project moved from local build to public-facing site.

Project page: [Settled Field Platform](/projects/settled-field-platform/).

---

## Context

Today was about getting the site out of the local/dev lane and into the real world.

The goal was not perfection.

The goal was:

> Make the site credible, clean, and available before Bill’s meeting.

That meant focusing on flow, trust, and deployment instead of adding more features.

---

## What changed

### The site is live

Settled on the Field is now available here:

[https://settledonthefield.com](https://settledonthefield.com)

The domain is managed through Bluehost, while the app is deployed through Vercel.

The key production setup became:

```text
Bluehost DNS → Vercel → Settled Field Platform
```

---

### The public experience is presentable

The site now has:

- a clear landing page
- Summit path
- registration interest path
- clean footer
- truthful placeholder-safe contact language
- real domain access

This moved the project from:

```text
pages in progress
```

to:

```text
a usable public experience
```

---

### Footer attribution was cleaned up

The CurlTech attribution went through a few iterations.

The final version uses:

- a subtle sentence
- an inline SVG logo
- a link to [gregcurl.dev](https://gregcurl.dev)

This kept the credit present without letting it compete with the site.

---

### DNS was the real boss fight

The code was not the hard part today.

The tricky part was DNS:

- root domain needed the correct Vercel A record
- `www` needed the correct CNAME
- conflicting Bluehost records had to be removed
- Vercel needed time to validate the configuration

The lesson:

> If the site works but Vercel says invalid, check for duplicate or conflicting DNS records.

---

## What I learned

### 1. Live changes force clarity

Once a site is public, placeholders feel different.

Every fake email, broken link, or loud attribution suddenly matters more.

That pressure was useful.

It forced the site to become more honest.

---

### 2. SVG was the right answer

The footer logo issue looked like a CSS problem at first.

It was really an asset problem.

The PNG had sizing/canvas issues, so the fix was to use a proper SVG and size it with `em`.

Lesson:

> Fix the asset layer before fighting CSS too hard.

---

### 3. “Good enough to present” is a real milestone

This version is not the final product.

But it is good enough for a real conversation.

That matters.

A live, credible site creates momentum in a way a local build never can.

---

## Next

After Bill’s meeting, the next work should focus on:

- real speaker content
- real partner logos
- confirmed social links
- confirmed contact method
- stronger Summit credibility
- payment flow when the timing is right

---

## Closing thought

Today the project crossed a line.

It is no longer just a build.

It is now a live system with a real address:

[settledonthefield.com](https://settledonthefield.com)

That changes the conversation.