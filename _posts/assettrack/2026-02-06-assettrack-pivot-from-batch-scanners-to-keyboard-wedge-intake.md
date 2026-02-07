---
title: "2026-02-06 — 🚜 AssetTrack: Pivot to Keyboard Wedge Intake"
date: 2026-02-06
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, python, containers, systems-design, offline-first]
---

TL;DR: I pivoted AssetTrack’s scanner intake from vendor-dependent batch downloads to a fully portable, containerized keyboard-wedge workflow. The core ingest, audit, and atomic commit logic remains unchanged.

Project: [AssetTrack](/projects/assettrack)

## Context

AssetTrack exists to support reliable, offline-first asset accountability without pulling hardware quirks into the core system.

Earlier milestones validated batch ingest using CSV files exported from a barcode scanner. That work proved the hard parts: validation, preview, and atomic commit with a clean audit trail.

In practice, the available scanner required vendor software to extract scan data. Installing vendor tooling isn’t always permitted on target machines, which conflicted with the goal of a portable system that can run anywhere with minimal setup.

Rather than fight the constraint, I treated it as a signal.

## What changed

I pivoted the primary scan intake model to **keyboard-wedge scanning**.

Scanners are now expected to behave as standard HID keyboards, typing scan values directly into a local web UI running inside a container. This removes all dependency on vendor drivers, SDKs, or OS-specific tooling.

The existing ingest, validation, audit, and atomic commit pipeline remains intact. Batch CSV ingest is still supported, but it is now secondary to a simpler, more deployable intake path.

As part of this pivot, I rewrote the remaining milestones to reflect reality:

- Milestone 4 focuses on portable scan intake
- Milestone 5 hardens the operator workflow
- Milestone 6 covers documentation and container security visibility using Trivy

## What I learned

This was a reminder that architecture isn’t about what *can* be integrated — it’s about what *should* be.

Pulling scanner hardware directly into the application would have broken portability and introduced OS- and driver-level dependencies. By pivoting at the intake edge instead of the core, AssetTrack stays honest, testable, and realistic.

## Next

Milestone 4 starts by standing up the containerized intake UI, capturing keyboard-wedge scans, and feeding them into the existing ingest path. From there, the focus shifts to workflow hardening and operational documentation.