---

title: "2026-06-01 Tightening AssetTrack Before the Next Workflow Change"
date: 2026-06-01
project: AssetTrack
tags:

* AssetTrack
* event-sourcing
* operator-workflows
* validation
* recon

---

TL;DR: Today was not about adding big new features. It was about closing open loops, documenting guardrails, and making sure future workflow changes do not weaken AssetTrack’s event-sourced custody model.

Project page: AssetTrack

## Context

AssetTrack is built around one simple rule:

The event log is the truth.

That means every workflow change has to be careful. A cleaner button, a better email action, or a smoother validation screen cannot quietly change custody truth, receipt truth, audit history, or persistence behavior.

Today’s work stayed focused on that discipline.

The recent receipt email work had already made the admin resend path safer and cleaner. From there, the next question was not “what can we build next?” It was “what do we need to close, document, and understand before the next behavior change?”

That is slower in the short term, but safer for the system.

## What changed

We worked through several Issue 27 cleanup and recon items.

First, we confirmed that the holder follow-up email action was already implemented on `main` by earlier work. No new code was needed. The existing behavior already supports a manual holder follow-up email from the holder detail page, using the local SMTP configuration, without writing to the database or changing custody or receipt truth.

That issue was closed as already satisfied.

Next, we added a pre-event validation checklist.

That checklist documents what AssetTrack must confirm before any event-producing workflow appends custody history. It covers authentication, authorization, workflow intent, required context, asset eligibility, queue validity, preview confirmation, append-only commit boundaries, SQLite persistence expectations, post-commit reconciliation, and receipt/email separation.

The point is simple:

Validation happens before the event is appended.

Once the event is appended, history is not edited to make the workflow feel cleaner later.

Then we completed recon on multi-location holder support.

The finding was important. Holders are currently global custody actors, not location-scoped records. A holder can operate across approved locations without needing a schema change. Issue location is transaction context. Receipts snapshot holder identity and location separately. That means no runtime change is needed right now for a holder working across multiple locations.

The recon also identified two possible future paths, but only if operators need them later:

1. Read-only holder location filtering semantics.
2. Persistent holder-to-location membership with schema and migration planning.

Finally, we completed recon on validation flow and redundancy.

The current Issue and Return workflows still preserve the correct seam:

entry page → prerequisite selection → scan queue → preview → commit

That seam matters because preview is the operator’s main checkpoint before custody events are appended. Commit handlers and transaction helpers also revalidate state before writing events. That duplication is intentional. It protects custody truth.

The recon found a few presentation-only simplification candidates, including repeated guidance and blocked-state summaries, but it also clearly marked the checks that must not be removed.

## What I learned

A system like AssetTrack does not get safer just because it has more code.

It gets safer when the rules are written down, checked, and respected.

The pre-event checklist gives future issues a shared reference point. Instead of re-arguing every workflow decision from scratch, we now have a plain checklist that says what must be true before AssetTrack writes an event.

The multi-location holder recon also helped prevent premature schema work. It would be easy to assume holders need location membership records. But the current model already supports the real operational case: a global custody actor participating in transactions at different locations.

That matters because schema changes are expensive. In AssetTrack, they are not just database changes. They affect event interpretation, receipts, custody reports, workflows, and operator trust.

The validation recon reinforced another lesson:

Some repetition is bad interface design. Some repetition is system protection.

The job is knowing which is which.

Repeated helper text may be simplified later. Commit-time validation should stay.

## Next

The next useful work should stay small and disciplined.

Good candidates include:

* presentation-only cleanup from the validation recon
* issue prerequisite guidance compression
* return preview blocked-state summary cleanup
* case structure and capacity recon
* asset search improvements

Before any behavior-changing issue, the new pre-event validation checklist should be used as a guardrail.

The goal remains the same:

Keep AssetTrack simple for the operator without making the custody model weaker behind the scenes.
