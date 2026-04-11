---
title: "2026-04-11 — 🏗️ gregcurl.dev Rebuild: Milestone 0 Complete"
date: 2026-04-11
project: gregcurl-dev-rebuild
categories: [projects, gregcurl-dev-rebuild]
tags: [nextjs, architecture, ci-cd, security, consulting-platform]
---

**TL;DR:** Milestone 0 is complete. The rebuild now has a clean architecture, hosting strategy, and security baseline. Next step is building the actual application.

Project page: [gregcurl.dev Rebuild](/projects/gregcurl-dev-rebuild/)

---

## Context

I’m rebuilding my portfolio into a working consulting platform.

The goal isn’t a better-looking website — it’s a system that:
- demonstrates real capability
- captures leads
- supports direct engagement
- eventually enables payment

Before writing any application code, I focused on getting the foundation right.

---

## What changed

Milestone 0 is now complete:

- Established canonical repository (`gacurl-web`)
- Defined hosting split (Vercel for frontend, DigitalOcean for systems like AssetTrack)
- Documented DNS cutover strategy
- Created environment variable contract (`.env.example`)
- Implemented CI/CD and security baseline:
  - GitHub Actions pipeline
  - Dependency Review
  - CodeQL scanning

This means the project now has a stable, security-conscious starting point.

---

## What I learned

The biggest lesson is that **discipline early prevents rework later**.

It’s tempting to jump straight into building pages, but that usually leads to:
- unclear architecture
- messy environment handling
- security gaps
- rework during deployment

By locking these decisions first, the rest of the build becomes much more straightforward.

---

## Next

Milestone 1: Scaffold the Next.js application.

This will:
- activate the CI pipeline with real builds
- establish the development loop
- create the first visible version of the platform

From here, the project shifts from planning → execution.