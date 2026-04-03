---
title: "2026-04-02 — 🚜 AssetTrack: Building a Real System — Email, Deployment, and the Truth About Production"
date: 2026-04-02
project: AssetTrack
categories: [projects, assettrack]
tags: [assettrack, docker, deployment, email, sendgrid, debugging, production]
---

TL;DR: The system is now live, deployed, and sending real emails. The hardest problems weren’t code — they were environment, networking, and understanding how real systems behave under constraints.

Project page: [AssetTrack](/projects/assettrack/).

---

## Context

Over the last three days, AssetTrack crossed a major boundary.

This stopped being a local project and became a real system:

- deployed to a cloud host
- running behind HTTPS
- backed by persistent storage
- executing real-world workflows
- attempting to send real emails

That last part turned out to be the most instructive.

---

## What changed

### Cloud deployment is now real

A fresh DigitalOcean Droplet was provisioned and brought up from scratch:

- Docker + Compose installed
- Repo cloned clean
- App started successfully
- SQLite persistence verified across restarts
- Inventory imported and validated
- Nginx configured as reverse proxy
- HTTPS enabled and working

This matters because it proves something simple but critical:

A new machine can run this system without tribal knowledge.

That is the difference between a project and a system.

---

### The email problem was not a code problem

Initial attempt:
- Gmail SMTP on port 587
- Proper credentials
- Correct configuration

Result:
- hard failure

Investigation showed:

- DNS resolution worked
- app config loaded correctly
- connection attempts failed at the network layer

Root cause:

DigitalOcean blocks outbound SMTP on standard ports.

This was the turning point.

Instead of debugging code, the problem required understanding infrastructure constraints.

---

### Solution: move to SendGrid

Switched to SendGrid using:

- SMTP host: smtp.sendgrid.net
- port: 2525 (allowed)
- API key as credential

This immediately resolved:

- network reachability
- SMTP handshake
- provider acceptance

But introduced a new class of problem.

---

### The From address bug that wasn’t obvious

Even after switching providers, email still failed.

Error:

550 The from address does not match a verified Sender Identity

Root cause:

- app was reading ASSETTRACK_RECEIPT_FROM_EMAIL
- environment was set to ASSETTRACK_EMAIL_FROM

The system had:
- correct provider
- correct credentials
- correct network path

But was sending from:

assettrack@local

Fix required:

- tracing the actual env var used in code
- wiring it through Docker Compose
- aligning it with a verified sender

---

### The real blocker: provider trust

Even after fixing configuration, emails stayed stuck at:

Processed

No delivery. No bounce.

Root cause:

SendGrid account was under review and had not been approved to send.

This was not visible in code, logs, or configuration.

This was a provider-level gate.

---

### Final unlock: domain authentication + activation

After:

- authenticating domain
- fixing DNS
- allowing account review to complete
- sending multiple test emails

The system transitioned:

Processed → Deferred → Delivered

That was the moment the system became real.

---

## What I learned

### 1. Most production problems are not code problems

The failure chain looked like this:

App  
SMTP  
Credentials  

But the real issue was:

Cloud provider network policy

Lesson:

Always verify each layer before assuming where the failure is.

---

### 2. Environment variables are part of your system design

The bug was not complex. It was this:

EMAIL_FROM ≠ RECEIPT_FROM_EMAIL

Lesson:

Naming consistency is not cosmetic. It is system behavior.

---

### 3. External providers are part of your system

SendGrid became part of the system.

And it had:

- rate limits
- trust thresholds
- account review gates

Lesson:

Your system does not stop at your code.

---

### 4. Delivery is a pipeline, not a moment

You do not “send an email”.

You initiate a pipeline:

App → Provider → Internet → Recipient → Inbox

Each stage can:
- accept
- delay
- reject

Lesson:

Processed does not mean delivered.

---

### 5. Reputation is real

A brand new sender hits:

Deferred (rate limited)

before reaching:

Delivered

Lesson:

Trust must be earned, even for your own system.

---

## Next

With email now functioning end-to-end, the next step is:

- Issue 26-64 — default CC recipient for all receipts

This will:
- ensure oversight visibility
- strengthen accountability
- complete the notification model

---

## Bottom line

In three days, AssetTrack became:

- deployable
- reproducible
- externally accessible
- operational under real constraints

The code did not change much.

The understanding did.

That is what makes the system durable.