# Tab Switcher

## Description

Displays a row of tab buttons (Home, Profile, Settings) and shows the active tab's content below, highlighting whichever tab is currently selected.

## Approach

- `tabs` is a module-level array of `{ id, label, content }`, mapped into buttons rather than hardcoded JSX — adding a new tab means adding one array entry.
- A single `activeTabId` state (defaulting to the first tab's id, `"home"`) drives both which button gets the `active` class and which tab's content is looked up and rendered.
- Clicking a tab calls `setActiveTabId(tab.id)`; clicking the already-active tab sets state to the same value, which React no-ops on (no re-render, content and styling stay put).
- `role="tablist"`/`role="tab"`/`aria-selected`/`role="tabpanel"` are added for keyboard/screen-reader usability alongside the required `data-testid` attributes.
- If `tabs` were ever empty, the component renders a "No tabs available" fallback instead of an empty button row.

## Trade-offs

- Tab data is hardcoded in the module rather than accepted as a prop, matching the fixed three-tab scaffold given; making it prop-driven would be a small follow-up if reuse across different tab sets is needed.
