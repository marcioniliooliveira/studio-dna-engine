---
version: "1.1"
name: "SCALEX A2"
description: "Global light design system derived from the approved A2 direction."
colors:
  canvas: "#F8F8F6"
  surface: "#FFFFFF"
  card: "#F2F2F0"
  ink: "#0B0D11"
  accent: "#FFC552"
  muted: "#4A4A4A"
  border: "rgba(11, 13, 17, 0.12)"
typography:
  hero-display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(64px, 8.4vw, 132px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0"
  nav:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0"
rounded:
  none: "0px"
  control: "4px"
spacing:
  page: "48px"
  hero-gap: "32px"
  control-x: "28px"
  control-y: "20px"
components:
  primary-cta:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-y} {spacing.control-x}"
---

# SCALEX A2

## Overview

SCALEX is a B2B growth landing page for decision makers. The A2 direction is a global light editorial system: strong black typography, an amber action signal and one vertical rocket as the central visual anchor.

## Colors

- **Canvas:** `#F8F8F6` is the default page background.
- **Surface:** `#FFFFFF` differentiates raised or editorial reading areas.
- **Ink:** `#0B0D11` carries all high-priority text and structural lines.
- **Accent:** `#FFC552` is the only action and emphasis color.
- **Muted:** `#4A4A4A` is for supporting copy only.

## Typography

- Anton is reserved for the two-line hero display and major impact headings.
- Inter is used for navigation, body copy, forms, labels and buttons.
- All content remains selectable semantic HTML. The golden is not a text asset.

## Layout

- Desktop target: 1440 by 900 in a 12-column grid.
- A2 hero: headline and conversion block on columns 1 through 7, rocket on columns 10 through 12.
- The rocket may crop at the viewport edge but never overlaps a control or text.
- Below 768px, order content as headline, copy, CTA and rocket with no negative overlap.

## Elevation & Depth

Use borders, tonal surfaces and the rocket material for depth. Do not use glass panels, dark section inversions, heavy shadows or fake dashboards.

## Shapes

The system is sharp. Controls use the 4px control radius. Do not introduce pills or rounded-card motifs.

## Components

- Navigation stays on a single desktop line.
- Navbar CTA and primary CTAs are amber filled with ink text.
- One amber trajectory line may support the hero composition. It is not a data visualization.

## Do's and Don'ts

- Do preserve the approved A2 proportion, whitespace and rocket placement.
- Do use the page canvas globally.
- Do honor `prefers-reduced-motion` and animate only transform and opacity.
- Do not add dark section inversions, orbit circles, floating cards, fake metrics, micro-labels or a second accent.
- Do not use the golden PNG as a background or source of visible text.
