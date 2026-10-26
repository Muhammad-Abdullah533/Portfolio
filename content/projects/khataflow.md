---
title: "KhataFlow"
slug: "khataflow"
summary: "A digital khata for Pakistani small businesses: customer and vendor ledgers, bills, payments, and printable statements in PKR."
date: "2025-06-01"
tech:
  - "Next.js"
  - "Tailwind CSS"
  - "Vercel"
featured: true
order: 0
liveUrl: "https://khataflows.vercel.app"
placeholder: false
draft: false
---

## Overview

KhataFlow is a digital khata — a ledger — built for small businesses in Pakistan. It takes
the familiar idea of a shop's running account book and turns it into a shared, always-current
system that both the owner and their staff can trust.

The product is live at [khataflows.vercel.app](https://khataflows.vercel.app) and is used by
real businesses to manage their accounts.

## The problem

Almost every shop, distributor, and small business in Pakistan keeps a khata: a running record
of who owes them and whom they owe. It works, but it is fragile. A torn page, a missing entry,
or a forgotten payment can turn into a dispute, and adding up balances by hand every month
wastes hours.

I saw this first-hand while managing accounts for a retail market business for two years.

## What it does

- **Customer ledgers** with a running balance for every customer: bills, payments, and credits.
- **Vendor ledgers** tracked side by side, so both sides of the business live in one system.
- **Bills and payments in PKR**, with a quick entry mode and an itemized mode when detail matters.
- **Printable statements**, A4-ready, carrying the business name for WhatsApp or in-person handoff.
- **Monthly reports** per customer and vendor, without adding up a ledger book by hand.
- **Shared workspaces** with owner and staff roles, so a team sees one live ledger.
- **Managed onboarding** over WhatsApp instead of an open sign-up, so opening balances start correct.

## How it is built

- **Framework:** Next.js with the App Router and React Server Components.
- **Styling:** Tailwind CSS.
- **Hosting:** Vercel.
- **Localisation:** amounts in PKR with Pakistan Standard Time dates.

## Impact

KhataFlow is not a tutorial project. It is in active use by businesses that need their
accounts to be correct, and it is the clearest example of how I work: find a real, recurring
problem, understand the people who live with it, and ship a simple tool that removes the
manual burden.
