---
title: "2026-04-25 — 🧭 Making the site feel real"
date: 2026-04-25
project: Settled Field Platform
categories: [projects, settled-field-platform]
tags: [nextjs, ui, ux, conversion, design]
---

TL;DR: Today wasn’t about adding features. It was about making the site feel real enough that someone would actually click.

Project page: [Settled Field Platform](/projects/settled-field-platform/).

---

## Context

I’m working toward a meeting-ready version of the Settled Field Platform site.

The goal isn’t perfection.  
It’s credibility.

If someone lands on the page, they should:
- understand what this is
- trust it
- know what to do next

Before today, the site had structure, but it still felt like a template.  
Clean… but not convincing.

---

## What changed

### 1. The hero stopped feeling like a brochure

I shifted the landing section into more of a “poster” feel:
- stronger visual presence
- clearer headline
- real CTA positioning

It started to feel like an event instead of a webpage.

---

### 2. Typography became intentional

I introduced:
- Playfair Display for headings
- Inter for body text

Then centralized everything in `globals.css`.

This wasn’t just about fonts.  
It made the hierarchy obvious and removed visual noise.

---

### 3. CTAs became actual actions

Big realization here:

The buttons looked styled, but they didn’t *feel clickable*.

The issue wasn’t color — it was separation.

Fix:
- stronger fill
- real shadow (not glow)
- clear elevation off the background image

Now the CTA sits *above* the hero instead of blending into it.

---

### 4. Added a trust layer

This was the biggest shift.

Right after the hero, I added a section that answers:
- who this is for
- what you get
- why it matters

No fluff. No long paragraphs.

Then on the summit page:
- added lightweight credibility framing
- tightened outcomes into short, practical statements

The site now answers:
> “Why should I care?” within 10 seconds

---

## What I learned

### 1. Visual polish doesn’t create trust

You can have:
- clean layout
- good fonts
- nice colors

…and still not convert.

Trust comes from:
- clarity
- specificity
- restraint

---

### 2. Buttons don’t need effects — they need separation

I tried glow. Didn’t like it.

The real fix was:
> make the button feel like it exists on a different layer

Simple shadow + solid fill beat everything else.

---

### 3. Repetition kills credibility

Adding a trust section exposed overlap with existing sections.

Lesson:
> every section has to earn its space

If two sections say the same thing, one has to go or tighten.

---

### 4. Check what the browser is actually doing

At one point I assumed fonts weren’t applying because of Next.js font output.

Reality:
> computed styles told the truth

---

## Next

The pieces are all there now:
- hero
- CTA
- trust

Next step is tightening flow:

> what the user sees first → second → where they click

That’s where this becomes a real conversion system.

---

## Closing thought

Today wasn’t about building more.

It was about removing doubt.

That’s the difference between:
- a site that looks good  
- and a site someone actually uses