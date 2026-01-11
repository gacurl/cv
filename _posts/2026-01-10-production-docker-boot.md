---
title: "2026-01-10 — Production Docker Boot"
date: 2026-01-10
layout: single
categories:
  - engineering
  - delivery
  - infrastructure
tags:
  - production
  - docker
  - rails
  - launch
  - milestones
---

## TL;DR
Built and successfully booted a real production Docker image for HumanityPro. Fixed several production-only failures, verified HTML rendering in a containerized environment, and confirmed the app is deployable to a public host.

---

## What I set out to do

The goal for the day was simple:

**Prove HumanityPro can run in production.**

Not “development with a flag flipped.”  
Not “it should work once deployed.”

An actual production Docker image that boots, renders HTML, and serves assets.

---

## What broke (and why)

As expected, production exposed things development never does.

### Native gem platform pinning

`Gemfile.lock` had Nokogiri pinned to `x86_64-linux`.  
That works until Docker builds in a clean Linux environment and Bundler refuses to resolve the gem.

**Fix:**  
Removed the hard platform pin and let Bundler resolve native extensions correctly at build time.

---

### Asset compilation required Node at build time

Rails with `cssbundling-rails` assumes Node exists during asset compilation.  
In Docker, that’s not true unless you explicitly install it.

**Fix:**  
Installed Node 20 in the Docker build stage so assets could compile successfully.

---

### `database.yml` assumed too much about the environment

The production config expected `USER` to exist.  
Containers don’t guarantee that.

**Fix:**  
Made the config defensive so it doesn’t hard-fail in containerized environments.

---

### Forced SSL blocked local production verification

Production Rails forces HTTPS, which is correct — but it makes local verification harder.

**Fix:**  
Added a controlled escape hatch:

```bash
DISABLE_FORCE_SSL=1
```
This allows local HTTP verification without weakening real production behavior.

---

## Verification

Once the image built cleanly:

- `curl -I http://localhost:3000` returned `200 OK`
- Safari rendered the app successfully
- CSS loaded correctly
- No runtime errors
- No missing assets

Chrome refused HTTP due to HTTPS-only behavior, which is expected and not an app issue.

At that point, the question changed from *“Will this work?”* to *“Where do I deploy it?”*

---

## Cleanup

After validation:

- stopped the temporary Postgres container
- removed the Docker network
- left no stray infrastructure running

Production testing should be repeatable, not messy.

---

## Why this mattered

This work didn’t add features or UI polish.

What it did was move HumanityPro from:

> “works locally”

to:

> “can be deployed and shared.”

That line matters.

---

## What’s next

Next is a production smoke test on a real host:

- home page
- authentication
- navigation
- mailers
- database connectivity
- assets

Once that passes, I can send a real link to the app owner.

That’s the milestone.
