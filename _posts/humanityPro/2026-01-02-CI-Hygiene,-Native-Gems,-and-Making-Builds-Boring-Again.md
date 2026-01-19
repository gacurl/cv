---
title: "2026-01-02 — CI Hygiene, Native Gems, and Making Builds Boring Again"
date: 2026-01-02
layout: single
categories:
  - engineering
  - rails
  - ci
tags:
  - rails
  - github-actions
  - ci
  - bundler
  - dependabot
  - nokogiri
  - pg
---

## TL;DR
CI kept breaking in ways that *felt random* but weren’t.  
The root cause was native gem platform resolution on Ubuntu. I fixed it by taking control of Bundler’s install order and platform normalization so builds are deterministic again. CI is boring now — and that’s the win.

## The goal
Issue 4-11 started as “dependency hygiene,” but the real goal was simpler:

> **Stop fighting CI.**

Dependabot PRs were piling up, native gems were flaky on Ubuntu runners, and every small bump felt like a gamble. Before doing *more* upgrades, I wanted the system to be predictable again.

## The early smell
The red flags were subtle at first:

- CI failing before tests even ran  
- Errors involving `nokogiri` or `pg`  
- Different behavior locally vs GitHub Actions  
- Re-running CI sometimes “fixed” it  

That last one is the tell.  
If re-running works, you don’t have a test problem — you have an **install determinism problem**.

## What was actually breaking (plain English)
Bundler resolves gems differently depending on:

- OS  
- architecture  
- available precompiled native gems  

On Ubuntu runners, Bundler was sometimes trying to install Linux-specific native gems (`x86_64-linux`) that no longer had matching builds.

Meanwhile:

- `ruby/setup-ruby` was auto-running `bundle install`  
- That happened **before** I could normalize platforms  
- So installs were effectively racing the workflow  

Same code. Same lockfile. Different results.

That’s not bad luck — that’s an ordering bug.

## The fix (the important part)
Instead of chasing individual gem failures, I fixed the **system**.

### 1) Stop Bundler from installing automatically
I disabled `bundler-cache` auto-install so I could control when installs happen.

### 2) Normalize platforms explicitly (on Ubuntu)
Before installing gems, CI now does:

```
bundle lock --add-platform x86_64-linux-gnu
bundle lock --remove-platform x86_64-linux
That tells Bundler exactly which Linux platform to target.
```
### 3) Force Ruby platform for native gems
Setting:
```
BUNDLE_FORCE_RUBY_PLATFORM: true
```
prevents Bundler from going hunting for platform-specific native gems unless absolutely necessary.

### 4) Install gems explicitly, once, in the right order

No more surprise installs. No more roulette.

## The result

- CI installs are deterministic  
- Native gems (`nokogiri`, `pg`) behave  
- Re-runs aren’t “fixing” anything anymore  
- Dependency bumps are boring again  

Which is exactly what you want.

## About Dependabot (and why branches lied)

One thing that’s easy to misunderstand:

Dependabot branches can show as “not merged” even when the dependency is already on `main`.

That’s because:

- the branch history doesn’t match  
- the end state *does*  

So I stopped trusting branch ancestry and started checking actual versions in `Gemfile.lock` instead.

When I did that, the answer was clear:

- Everything targeted by Issue 4-11 was already present  
- Remaining Dependabot PRs were redundant or intentionally skipped  

That’s when you close the door and move on.

## What I learned

- CI flakiness is usually a systems problem, not a code problem  
- Native gems don’t care about your intentions  
- Install ordering matters as much as versions  
- “Green” isn’t enough — **boring and repeatable** is the goal  

## What’s next

Issue 4-11 is closed.

With CI stabilized and dependencies at a clean baseline, I can get back to:

- product work  
- admin polish  
- features that users actually see  

And the next time CI goes red, at least I’ll know it’s for a real reason.