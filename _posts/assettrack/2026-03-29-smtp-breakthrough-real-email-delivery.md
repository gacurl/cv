---
title: "2026-03-29 — 🚜 AssetTrack: SMTP Breakthrough and Real Email Delivery"
date: 2026-03-29
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, smtp, docker, email, infrastructure, debugging]
---

TL;DR: AssetTrack can now send real receipt emails end-to-end through Gmail. The system moved from “theoretical delivery” to actual operator-confirmed email delivery with full audit integrity preserved.

Project page: [AssetTrack](/projects/assettrack/).

## Context

Today was one of those days where everything looked like it was working… but nothing actually was.

The system had:
- receipt generation
- email queueing
- send logic
- delivery status tracking

But when it came time to send, it failed with:
> “Receipt email delivery is not configured.”

That message turned out to be both correct and misleading.

The real problem wasn’t one thing. It was a chain:
- environment variables not injected into the container
- incorrect variable names between `.env`, Docker, and application code
- authentication failing silently due to missing username
- TLS and port configuration needing to match Gmail expectations

This was not a bug. This was a system integration problem.

## What changed

Three key fixes unlocked everything:

### 1. Docker environment wiring

SMTP values existed locally but were never passed into the container.

Fix:
- added SMTP variables to `docker-compose.yml`
- ensured they were visible inside the runtime

This moved the system from:
- “not configured”
to:
- “connected but failing authentication”

### 2. Variable name alignment

The app expected:
- `ASSETTRACK_SMTP_USERNAME`
- `ASSETTRACK_SMTP_PASSWORD`

But Docker was passing:
- `SMTP_USER`

That mismatch resulted in an empty username and failed login.

Fix:
- aligned all variable names across `.env`, compose, and app

### 3. Correct Gmail configuration

Final working configuration:
- port 587
- STARTTLS enabled
- SSL disabled
- app password used instead of account password

This is Gmail’s required pattern for modern SMTP access.

## What I learned

### Systems fail at the seams

Everything “worked” in isolation:
- app logic
- queueing
- UI
- Docker
- Gmail

But the system failed at the boundaries between them.

That’s where real engineering lives.

### Names matter more than logic

The entire failure came down to:
- `SMTP_USER` vs `ASSETTRACK_SMTP_USERNAME`

One wrong name:
- no auth
- no send
- misleading error

### Observability beats guessing

The turning point was:
```bash
docker compose exec assettrack env | grep SMTP
```

That exposed reality:
- what the container actually sees
- not what I think it should see

### Incremental failure is good

The system progressed cleanly:

1. not configured
2. connected but unauthenticated
3. fully working

Each step gave a clearer signal.

That is a well-behaved system.

## What I learned about the product

This was more than just “email works.”

AssetTrack now has:

- deterministic recipient identity (snapshotted at commit)
- offline-first queue with deferred delivery
- explicit delivery states (pending, sent, failed)
- operator-visible feedback loop

And now:

- real-world delivery confirmation

That closes the loop between:
> custody action → acknowledgment → proof of delivery

That is operational value.

## Next

Immediate:

- continue with Issue 26-58

Near-term candidates:

- document SMTP setup (remove tribal knowledge)
- add `.env.example` for safer onboarding
- possibly add test mail service for offline validation

Long-term:

- expand notification model
- multi-recipient support (accountable party, operator)
- retry and failure handling strategies

---

Today was a breakthrough.

The system stopped pretending to send email.

Now it actually does.