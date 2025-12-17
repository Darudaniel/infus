INFUS

INFUS is a minimalist, clinical-grade web tool for calculating continuous infusion rates.

It is designed for urgent and critical care settings, where clarity, speed, and safety matter more than features.

From dose to pump — without cognitive friction.

Purpose

INFUS addresses a common and high-risk problem in clinical practice:

Medical orders are written in mcg/kg/min or similar units

Infusion pumps operate in mL/h or mL/min

Conversions are often done mentally, under pressure, with variable conventions

INFUS acts as a translation layer between:

Evidence-based dosing

Infusion preparation

Pump configuration

Core Principles

Minimalist: no clutter, no unnecessary options

Deterministic: same input always produces the same output

Clinically grounded: logic based on guidelines and standard practice

Modular: rules and calculations are separated from the interface

Transparent: calculations are explicit and inspectable

Current Scope (MVP)

Continuous infusion calculations

Weight-based dosing (e.g. mcg/kg/min)

Translation to pump rate (mL/h by default)

Designed initially for vasopressors

Future modules may include:

Sedatives and analgesics

Electrolyte infusions

Nutrition and glucose infusions

Safety alerts based on dose thresholds

Architecture

INFUS is built with plain web technologies for maximum portability and auditability:

HTML — structure

CSS — minimal visual hierarchy

JavaScript — calculation logic

Suggested module separation:

js/
├─ infus-core.js     // shared utilities
├─ infus-calc.js     // infusion calculations
├─ infus-rules.js    // clinical rules & limits
└─ infus-ui.js       // DOM interaction

This separation allows clinical logic to evolve independently from the UI.

Safety Disclaimer

INFUS is a clinical decision-support tool, not a medical device.

It does not replace clinical judgment

All outputs must be verified by the prescribing clinician

Local protocols and institutional guidelines always take precedence

Use at your own clinical responsibility.

Deployment

INFUS is designed to be deployed as a static site, for example using GitHub Pages:

No backend

No patient data storage

No authentication

This makes the tool:

Fast

Auditable

Easy to share in educational settings

Philosophy

INFUS is intentionally simple.

In critical care, the safest tool is often the one that:

Does one thing

Does it clearly

Does it the same way every time

License

To be defined.

INFUS — infusion logic, simplified.