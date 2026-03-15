---
title: "2026-03-15 — 🚜 AssetTrack: MVP Achieved After a Month Heads Down"
date: 2026-03-15
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, python, sqlite, docker, event-sourcing, inventory]
---

**TL;DR:**  
I have been quiet since Feb 20 because I was heads down finishing the AssetTrack MVP. As of March 15, the full custody lifecycle works end-to-end: issue, preview, commit, return, and slot reconciliation. The system now runs cleanly in Docker with SQLite and passes a full operator smoke test.

Project page: [AssetTrack](/projects/assettrack/)

---

# Context

If you follow this blog you probably noticed something unusual:  
no AssetTrack updates since **February 20**.

That was not because the project stalled.

It was the opposite.

I went **heads down** to finish the operational seams of the system so the MVP could actually work end-to-end without operator dead ends.

AssetTrack is an **offline-first asset custody system** designed for field environments where laptops are issued and returned from Pelican cases with fixed slots.

The system tracks custody through an **append-only event log** and projects the current state from those events.

But architecture only matters if the workflow works for the operator.

So the last month was spent closing the final seams.

---

# What Changed

Between Feb 20 and March 15 the following milestones landed:

### Workflow Stability

The entire operator lifecycle is now validated:

```
login
select holder
scan assets
preview
commit
verify custody
return
verify case occupancy
verify dashboard
```

The lifecycle now works cleanly:

```
STORAGE → IN_CUSTODY → STORAGE
```

### Key Fixes

Several small but critical workflow issues were fixed:

- Holder context now persists after issuing assets
- Queue timestamps display in UTC
- Return confirmation shows the final slot location
- Session activity refresh works reliably
- Preview pages now clearly signal readiness to commit

These changes eliminate the subtle workflow dead ends that appear in real operator use.

### Operator UX Improvements

Technical language was replaced with operator language.

Preview pages now read:

**Issue preview**

```
Ready to Issue
Review the listed assets below. Commit Issue is the next step.
```

**Return preview**

```
Ready to Return
Review the listed assets below. Commit Return is the next step.
```

This removed internal terms like **“Per-Asset Diff”**, which made sense to developers but not to operators.

---

# What I Learned

The hardest part of systems like this is not the data model.

It is the **workflow seams**.

Everything looks correct in isolation:

- database schema
- event model
- projection logic

But the real test is whether a human can run the workflow repeatedly without confusion.

That is why the last few weeks focused almost entirely on **operator smoke testing**.

Every issue fixed during this period came from running the workflow like an operator would.

---

# Next

With the MVP complete the project moves into the next phase:

- operator workflow polish
- navigation simplification
- deployment packaging
- documentation improvements
- real field testing

The important milestone is this:

AssetTrack is now **operational**.

It works end-to-end.

And that is the foundation everything else builds on.