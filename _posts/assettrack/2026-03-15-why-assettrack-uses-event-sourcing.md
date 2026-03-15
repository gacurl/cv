---
title: "2026-03-15 — 🚜 AssetTrack: Why Event Sourcing Instead of a Traditional Inventory Table"
date: 2026-03-15
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, event-sourcing, inventory, sqlite, python]
---

**TL;DR:**  
Most inventory systems store the current state of an asset. AssetTrack stores the *history of events* that happened to the asset and derives the current state from that history. This design preserves audit integrity and makes custody reconstruction reliable in field environments.

Project page: [AssetTrack](/projects/assettrack/)

---

# Context

Most inventory systems start with a simple table:

```
assets
```

Each row represents the current state of an asset:

```
asset_tag
location
holder
status
```

When something changes, the row gets updated.

That approach works fine for basic inventory tracking.

But AssetTrack is solving a different problem.

AssetTrack is a **custody system**, not just an inventory list.

In custody systems, the most important question is not:

> “Where is the asset now?”

The important question is:

> “What happened to the asset?”

---

# The Problem with Updating Rows

Imagine a laptop moves through a normal lifecycle.

```
CASE → issued to user → returned → reissued → moved to another case
```

If the system simply updates rows, the previous state disappears.

You can try to recover it with:

- change logs
- audit tables
- soft deletes
- history tables

But those systems are often incomplete or inconsistent.

And if someone edits a row incorrectly, the history can be corrupted.

For asset custody in operational environments, that is unacceptable.

---

# Event Sourcing Instead

AssetTrack uses **event sourcing**.

Instead of storing state directly, the system stores **events**.

Example events:

```
ASSET_ADDED
ASSET_ISSUED
ASSET_RETURNED
ASSET_MOVED
```

Each event is written once and never modified.

This creates an **append-only event log**.

The current state of the system is derived by replaying those events.

---

# What That Looks Like

Instead of updating a row like this:

```
UPDATE assets
SET holder = 'Bob'
```

AssetTrack records an event:

```
ASSET_ISSUED
asset_tag: DDC4CY002424
holder: Bob
timestamp: 2026-03-15T14:21:33Z
```

Later, when the asset returns:

```
ASSET_RETURNED
asset_tag: DDC4CY002424
slot: CASE-13 / Slot 6
timestamp: 2026-03-15T17:09:02Z
```

The system projects the current state from those events.

---

# Why This Matters

This design gives several advantages.

### Audit Integrity

The system never overwrites history.

You can always reconstruct exactly what happened to an asset.

---

### Debugging Reality

If something looks wrong in the dashboard, the events tell you why.

You can trace the entire custody chain.

---

### Operational Safety

Field deployments often involve:

- unreliable connectivity
- manual corrections
- human mistakes

An append-only event log makes the system **resilient to those realities**.

---

# Why SQLite Works Well Here

AssetTrack uses SQLite rather than a remote database.

That choice was intentional.

SQLite provides:

- durability
- portability
- zero network dependency

Combined with event sourcing, it creates a system that works **offline and reliably**.

---

# What I Learned

The biggest benefit of event sourcing is clarity.

Instead of wondering what the current state should be, you can simply ask:

```
What events occurred?
```

From there the system state becomes deterministic.

This makes the architecture surprisingly simple once the model is in place.

---

# Next

Now that the MVP lifecycle works end-to-end, the next phase focuses on:

- operator workflow polish
- navigation improvements
- field deployment validation
- documentation

The important milestone is this:

AssetTrack now has a **stable operational foundation**.

Everything else builds on that.