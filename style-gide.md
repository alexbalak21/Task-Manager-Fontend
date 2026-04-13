# Style Guide

This document defines the visual and interaction language for the Task Manager frontend. It should be used when creating new pages, components, or refinements to existing UI.

## Brand Direction

The interface should feel clean, focused, and productivity-oriented.

- Primary mood: calm, modern, and efficient.
- Visual priority: readable content first, decoration second.
- Overall tone: polished dashboard UI with soft surfaces and clear hierarchy.

## Color System

The current design leans on a blue primary palette with neutral support colors.

- Primary actions use the app blue token family from `--color-primary-500` and `--color-primary-600`.
- Use light neutral surfaces for content cards and panels.
- Use saturated accents sparingly for status, priority, and emphasis.
- Prefer semantic colors for status: success, warning, error, and info.
- Dark mode should stay intentional. Do not rely on browser defaults for form fields or surfaces.

Recommended usage:

| Role | Usage |
|---|---|
| Primary | Main buttons, focus rings, active states |
| Surface | Cards, sheets, sidebar, layout containers |
| Muted text | Secondary labels, descriptions, helper text |
| Status colors | Task progress, priorities, alerts, badges |

## Typography

- Use `Poppins` for the application shell and most UI content.
- Keep headings compact and confident.
- Use strong hierarchy with size, weight, and spacing instead of excessive color changes.
- Body text should remain highly readable and avoid dense line lengths.
- Numeric and status-heavy UI should favor clear, legible weights.

Guidance:

- Page titles should be prominent and short.
- Section labels should be smaller and muted.
- Supporting copy should not compete with the main action or the main metric.

## Layout Principles

- Use spacious layouts with generous padding and rounded corners.
- Prefer card-based composition for dashboards and task views.
- Keep content aligned to a consistent grid.
- Avoid cramped inline layouts when a stacked layout improves clarity.
- Let primary content occupy the center of attention; navigation should stay present but not dominant.

The app shell should keep a stable structure:

- Top bar for global context and actions.
- Sidebar for navigation.
- Main region for page content and data views.

## Components

### Buttons

- Primary buttons should be filled and use the primary blue.
- Secondary buttons should be neutral and low contrast.
- Outline buttons are appropriate for less prominent actions.
- Danger buttons must be reserved for destructive actions only.
- Disabled and loading states should be visually obvious.

### Inputs

- Inputs should have clear borders, rounded corners, and visible focus rings.
- Labels should be explicit and placed above the field.
- Error text should be short and directly actionable.
- Placeholder text is a hint, not a label.

### Cards

- Cards should feel like elevated surfaces with soft shadows and subtle borders.
- Use rounded corners consistently.
- Task cards should expose status, priority, progress, dates, and assignees clearly.
- Visual decoration should support comprehension, not replace it.

### Badges and Chips

- Use badges for status and priority.
- Keep badge text short and readable.
- Badge colors should be meaningful and consistent across screens.

### Progress Indicators

- Use progress bars for task completion and similar progress states.
- Make the current value obvious with label text and visual fill.
- Keep progress motion subtle and quick.

## Data Display

- Tables, cards, and summary blocks should prioritize scannability.
- Important values should be isolated with whitespace and weight.
- Supplementary metadata should never overpower the main record.
- Avatars, icons, and attachments should support identification without clutter.

## Motion

- Motion should be light and purposeful.
- Prefer short transitions for hover, focus, and state changes.
- Avoid constant animation unless it communicates loading or progress.
- Spinners and progress fills are acceptable when they clearly represent asynchronous work.

## Accessibility

- Maintain strong contrast for text and controls.
- Every interactive element must have a visible focus state.
- Labels should always be present for form fields.
- Use accessible semantics for progress, buttons, and navigation.
- Do not depend on color alone to communicate meaning.

## Theme Behavior

- The app should default to light mode when the theme preference is missing or invalid.
- Theme handling should happen during app bootstrap so the correct classes are applied early.
- Shared form elements should avoid accidental OS-driven dark styling.
- If a component has theme-specific styling, verify both light and dark states explicitly.

## Do

- Use the primary blue palette for navigation, actions, and focus.
- Keep surfaces soft, light, and structured.
- Write concise labels and clear helper text.
- Reuse existing shared components before introducing new variants.

## Do Not

- Do not introduce random accent colors without a semantic reason.
- Do not use heavy shadows or sharp corners as a default style.
- Do not make forms or dashboards feel dense and cramped.
- Do not let dark mode depend on browser defaults.
- Do not mix incompatible visual treatments within the same screen.

## Component Implementation Notes

- Keep new UI consistent with the existing Tailwind-based styling approach.
- Prefer shared primitives in `components/ui/` for repeated patterns.
- Use module-scoped components for domain-specific patterns such as tasks, auth, and dashboards.
- If a new pattern appears repeatedly, extract it into a reusable component.
