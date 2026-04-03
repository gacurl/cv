---
title: "AssetTrack"
date: 2026-04-03
status: "Active development"
tech: ["Python", "SQLite", "Docker", "Trivy"]
type: "Offline-first asset custody system"
permalink: /projects/assettrack/
---
<span style="display:inline-block;
padding:0.25em 0.6em;
font-size:0.85em;
font-weight:600;
border-radius:0.375em;
background:#dcfce7;
color:#166534;">
🟢 Active development
</span>

AssetTrack is a purpose-built asset custody system designed for environments where modern assumptions fail — no Wi-Fi, no cloud, no guarantees.

The goal isn’t flash. It’s trust.

---

## Why it exists

Picture this:

A few hundred laptops.  
Multiple cases.  
Multiple locations.  
People coming and going.

Now someone asks:

> “What’s issued right now — and to whom?”

That question should take seconds.

Instead, it turns into a hunt across spreadsheets, notes, and memory.

In restricted or SCIF-like environments, most tools don’t even get off the ground. AssetTrack starts where those tools break.

---

## How it works

AssetTrack does not track “current state” directly.

It records events:

- issued  
- returned  
- moved  

That’s it.

From those events, the system derives reality.

This means:

- nothing is overwritten  
- history is never lost  
- custody can always be reconstructed  

If something looks wrong, you don’t guess.  
You rewind.

---

## What it does

- Tracks assets with a minimal, operator-friendly model
- Supports **offline scan → queue → preview → commit workflows**
- Enforces **explicit custody actions** (Issue / Return)
- Generates **receipt records with delivery tracking**
- Maintains an append-only **audit log**
- Answers the only questions that matter:
  - What exists?
  - Who has it?
  - Where should it be?

No silent changes. No hidden state.

---

## Example workflow

1. Select the holder  
2. Scan assets into a queue  
3. Review a clear preview  
4. Commit the action  
5. System records events  
6. Receipt is created and can be sent when connected  

Simple. Linear. No surprises.

---

## What makes it different

Most systems:

- overwrite rows  
- depend on connectivity  
- lose history under pressure  

AssetTrack:

- append-only event model  
- offline-first by design  
- built for constrained, real-world operations  

It doesn’t assume ideal conditions. It assumes reality.

---

## Design principles

- **Offline-first** — works with zero network  
- **Append-only truth** — history is the system  
- **Boring on purpose** — predictable beats clever  
- **Operator-first** — large targets, clear actions, no ambiguity  

---

## Current status

- Core custody workflow: **complete and in use**
- Issue / Return flows: **operator-validated**
- Receipt system: **implemented with deferred delivery**
- Email delivery: **working end-to-end**
- Ongoing work:
  - validation tightening
  - UX refinement
  - holder lifecycle improvements

This system is not waiting to be finished.  
It’s being used while it’s being built.

---

## What this project demonstrates

- Designing for **constraint, not convenience**
- Translating physical custody into **deterministic workflows**
- Using event history to create **audit-grade systems**
- Applying disciplined engineering (Docker, scanning, invariants) to a real problem

This isn’t an inventory app.

It’s accountability, made explicit.

---

## Links

- **Live App:** [https://assettrack.gregcurl.dev](https://assettrack.gregcurl.dev)
- **Repository:** [AssetTrack repo on GitHub](https://github.com/gacurl/AssetTrack)
- **Blog series:** tagged `assettrack`