# Selected Work Redesign Walkthrough

I have successfully updated the **Selected Work** section and the left sidebar color state transitions to exactly match the reference screenshot.

## Changes Made

### 1. Updated NavLink Types & Data
- **File**: [`types/index.ts`](file:///d:/websiteclone/Website-Cloning/src/types/index.ts)
  - Added `sectionId?: string` to the `NavLink` interface.
- **File**: [`data.ts`](file:///d:/websiteclone/Website-Cloning/src/lib/constants/data.ts)
  - Mapped each link in `NAV_LINKS` to its corresponding target `sectionId` in the DOM (`hero`, `about`, `projects`, `overview`, `services`, `testimonial`, `faq`).

### 2. Wired Active Section Transitions
- **File**: [`Navigation.tsx`](file:///d:/websiteclone/Website-Cloning/src/components/layout/Navigation.tsx)
  - Appended `is-dark` to the main `<header className="navigation">` element when the active section is `"projects"`.
  - Replaced the static `idx === 0` link checks with dynamic evaluations against the `activeSection` state, correctly toggling the `is-active` and `w--current` classes as the user scrolls.

### 3. Redesigned Selected Work Section HTML
- **File**: [`Work.tsx`](file:///d:/websiteclone/Website-Cloning/src/components/sections/Work.tsx)
  - Restructured the DOM layout to follow the Webflow stylesheet hierarchy (`work-container`, `work-top-layout`, `work-card-content`, etc.).
  - Set the header title to exactly: `"Built in Webflow, Made to Perform"` using the `.h2-style-white` white-to-grey gradient style.
  - Added the description paragraph on the right column of the grid.
  - Built out the card content structure with top and bottom rows containing numbers (`01`, `02`...), tag pills, titles, and slide-up hover arrows.

### 4. Custom Dark Sidebar & Card CSS Rules
- **File**: [`animations.css`](file:///d:/websiteclone/Website-Cloning/src/styles/globals/animations.css)
  - Appended `.navigation.is-dark` selector overrides that smoothly turn the sidebar dark charcoal/gray, change the active text/svg colors, and highlight the PROJECTS link background pill with `var(--yellow)` when viewing the projects.
  - Ensured card thumbnail images override their default hidden opacity on page load.

---

## How to Verify

1. The local development server is already running. Check your browser to see the changes live (thanks to Next.js fast-refresh, no manual rebuild is needed).
2. Scroll down to the **projects section**:
   - The body background becomes dark.
   - The left sidebar container and all cards smoothly transition to the dark-charcoal theme.
   - The **PROJECTS** pill turns yellow, and its text turns black.
3. Observe the **Selected Work** layout:
   - Left side shows the Pill Label, giant gradient H2 text, and right side description paragraph.
   - Horizontal scrolling cards load with numbered badges, project tag pills, and yellow action arrows that slide on hover.
4. Scroll back up to the Hero or About sections:
   - The sidebar returns to the original light beige theme.
