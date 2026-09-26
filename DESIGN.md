---
name: Institutional Excellence
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#424654'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737785'
  outline-variant: '#c3c6d6'
  surface-tint: '#0056d2'
  primary: '#0040a1'
  on-primary: '#ffffff'
  primary-container: '#0056d2'
  on-primary-container: '#ccd8ff'
  inverse-primary: '#b2c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#38485d'
  on-tertiary: '#ffffff'
  tertiary-container: '#506076'
  on-tertiary-container: '#cadaf5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001847'
  on-primary-fixed-variant: '#0040a1'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 120px
---

## Brand & Style

This design system is built for a consultancy operating at the highest levels of public policy and infrastructure finance. The brand personality is **authoritative, institutional, and precise**, designed to resonate with Ministers and International Financial Institution (IFI) executives. It balances the gravity of public sector projects with a forward-looking, modern technical expertise.

The visual style is **Corporate / Modern** with subtle **Glassmorphism** and **Tonal Layering** to denote depth and sophistication. It avoids decorative flourishes in favor of structural integrity, clear information hierarchy, and high-fidelity finishes that suggest reliability and bankable results.

Key emotional responses:
- **Trust:** Through a stable, deep-blue-anchored palette.
- **Clarity:** Through generous whitespace and structured typography.
- **Competence:** Through precise alignment and technical-inspired UI details.

## Colors

The palette is rooted in "Institutional Blue," a color synonymous with stability and international cooperation.

- **Primary (#0056D2):** A vibrant, clear blue used for calls to action, active states, and key brand identifiers. It represents the "Open" nature of the consultancy.
- **Secondary (#0F172A):** A deep navy/slate used for navigation backgrounds, hero sections, and primary headings to provide a sense of weight and authority.
- **Tertiary (#64748B):** A professional slate gray used for supporting text, borders, and icons, maintaining legibility without competing with primary actions.
- **Neutral (#F8FAFC):** A range of cool whites and grays used for background layering to create a clean, modern workspace.

**Status Colors:**
- Success: #10B981 (Sustainable growth)
- Information: #3B82F6 (Technical data)
- Warning: #F59E0B (Risk mitigation)

## Typography

The typography strategy prioritizes structural hierarchy. **Hanken Grotesk** is used for headings to provide a sharp, contemporary, and highly professional appearance. It features a technical precision that aligns with engineering and consultancy.

**Inter** is the workhorse for body copy, chosen for its exceptional legibility in dense reports and project descriptions. **IBM Plex Sans** is utilized for labels, data points, and UI elements, lending a slightly more systematic and technical feel to functional components.

Line heights are generous to ensure readability for a demographic that frequently consumes long-form policy and financial documents.

## Layout & Spacing

This design system utilizes a **Fixed Grid** approach for desktop to maintain a professional, magazine-style layout that feels curated and intentional. 

- **Grid:** A 12-column grid with 24px gutters. 
- **Rhythm:** An 8px base unit governs all internal component spacing.
- **Sectioning:** Large vertical gaps (120px+) are used between major content blocks to allow the "Institutional Blue" and high-quality photography to breathe.
- **Mobile Adaptivity:** On mobile devices, the layout collapses to a single column with 16px side margins. Typography scales down slightly, and "Section-gap" is reduced to 64px to maintain momentum.

## Elevation & Depth

To convey a sense of high-fidelity "Engineering," the design system uses **Tonal Layers** combined with **Low-contrast Outlines**. 

- **Surface Levels:** Base backgrounds use `Neutral-50`. Content cards use white backgrounds with a subtle `1px` border in `Neutral-200`. 
- **Shadows:** When used, shadows are "Ambient" — extremely diffused (30px-40px blur) with low opacity (5-10%) and a slight tint of the Secondary Navy color. This prevents the UI from feeling "cheap" or overly "app-like."
- **Overlays:** Dark hero sections and footer areas use the Secondary color with subtle radial gradients to create focus on center-aligned text.

## Shapes

The shape language is **Soft (0.25rem)**. This provides just enough approachability to soften the institutional nature of the brand without appearing playful or informal. 

- **Standard Elements:** Buttons and input fields use a `4px` (0.25rem) radius.
- **Cards/Containers:** Large cards use a `8px` (0.5rem) radius to define clear boundaries for project data.
- **Interactive Accents:** Small circular elements (like icon containers or bullet points) are permitted to be fully rounded (pill-shaped) to provide visual variety and focal points.

## Components

### Buttons
- **Primary:** Solid Primary Blue with white text. High contrast, sharp 4px corners.
- **Secondary:** Transparent with a 2px Primary Blue border.
- **Ghost:** Primary Blue text, no background, used for "Read More" in text-heavy sections.

### Structured Cards
Used for "Pôles d'Excellence" and "Portfolio." Cards must have a clear header, a 1px divider, and a structured list of benefits or services. Imagery within cards should use a subtle grayscale or blue-tinted overlay to maintain institutional consistency.

### Benefit Lists
Use custom Primary Blue checkmark icons. Text should be aligned to a strict vertical grid. Avoid bullet points in favor of these more "result-oriented" icons.

### Professional Headers
A sticky header with a white background, the brand logo on the left, and a "Contact" CTA as a primary button on the right. Navigation links use `Label-md` styling.

### Input Fields
Used for the "Get in Touch" section. Dark backgrounds with light-bordered fields (low opacity white) suggest a high-tech, secure environment for data submission. Labels must always be visible above the field.

### Stats & Impact
Large numerical displays using `Display-lg` in Primary Blue, accompanied by a small label beneath describing the metric (e.g., "Projects Delivered" or "Billion USD Managed").