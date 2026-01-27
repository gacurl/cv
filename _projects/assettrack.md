---
title: "AssetTrack"
date: 2026-01-27
status: "In progress (10-day sprint)"
tech: ["Python", "SQLite", "OPN-2004", "Docker", "Trivy"]
type: "Offline-first inventory system"
permalink: /projects/assettrack/
---
<span style="display:inline-block;
padding:0.25em 0.6em;
font-size:0.85em;
font-weight:600;
border-radius:0.375em;
background:#fef3c7;
color:#92400e;">
🟡 In progress
</span>

AssetTrack is a small, purpose-built inventory system designed for environments where modern assumptions don’t hold — no Wi-Fi, no Bluetooth, no cloud sync, and sometimes no laptop at the point of storage.

The goal isn’t flash. It’s trust.

## Why it exists

I’m responsible for accountability of a few hundred laptops stored across multiple cases and locations.  
The existing process relied on paper notes and spreadsheets, which works until someone asks a simple question like:

> “How many are issued right now — and to whom?”

In restricted or SCIF-like spaces, many commercial inventory tools simply aren’t usable. AssetTrack is designed around those constraints instead of fighting them.

## What it does (and will do)

- Tracks assets using a clear, minimal schema (serial, asset tag, status, location, custodian)
- Supports **offline batch barcode scanning**
- Applies **explicit state changes** (verify, issue, return, move)
- Maintains an append-only **transaction log** for auditability
- Generates simple dashboards that answer real questions

Nothing changes state implicitly. Every update is deliberate and traceable.

## Design principles

- **Offline-first**: the system of record lives locally
- **Boring by design**: predictable behavior beats cleverness
- **Audit-friendly**: state transitions are logged, not inferred
- **Tool-agnostic**: works with simple scanners and standard hardware

## Current status

- Inventory schema defined
- Offline batch scanning workflow planned (OPN-2004)
- Initial batch import + state-change logic in progress
- Dashboards and reporting to follow

This project is being built in short, focused iterations and used immediately as it matures.

## What this project demonstrates

- Designing for constrained environments
- Turning physical processes into deterministic software workflows
- Treating “inventory” as a trust and accountability problem
- Applying container discipline and vulnerability scanning even to small tools

## Links

- **Repository:** https://github.com/gacurl/Hand-Receipt-Manager
- **Blog series:** tagged `assettrack`
