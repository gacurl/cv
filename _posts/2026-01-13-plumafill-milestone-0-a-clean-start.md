---
title: "2026-01-13 — 🪶 PlumaFill: Milestone 0 — A Clean Start"

tags: [plumafill]
---

TL;DR: PlumaFill boots in the iOS simulator, Git is clean, and I’ve got a baseline I can trust.

**Project page:** /projects/plumafill/

## Context
Milestone 0 is intentionally boring: prove the toolchain works, the app runs, and the repo is in a sane state before I start “real work.”
This saves future-me from debugging ghosts that were actually just setup problems.

## What changed
- Installed Xcode via Apple Developer download (reliable setup)
- Confirmed iOS simulator runs and the app launches successfully
- Normalized project folder structure (so Git and Xcode agree on reality)
- Locked a known-good baseline commit

## What I learned
- Tooling problems are still problems — they just wear nicer clothes
- A clean repo root matters more than you think (until it doesn’t match and everything hurts)
- Shipping starts with “it runs” — not “it’s clever”

## Next
- Create the GitHub repo (`plumafill-ios`)
- Push `main`
- Start Milestone 1: navigation + an empty puzzle screen (the “shape” of the app)
