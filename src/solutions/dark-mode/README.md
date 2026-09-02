# Dark Mode Toggle

A simple React component that lets users switch between light mode and dark mode using a checkbox-styled toggle switch.

## Description

The component tracks the current theme with a single boolean `useState`. Toggling the checkbox flips the state, which drives both the `dark-mode`/`light-mode` class applied to the container (controlling background and text color) and the label text (`Dark Mode` / `Light Mode`) next to the switch.

## Approach

- `isDarkMode` boolean state, initialized to `false` (light mode by default).
- `toggleTheme` flips `isDarkMode` on every checkbox change.
- The checkbox is a controlled input (`checked={isDarkMode}`) paired with the `.slider.round` label to render the pill-shaped switch purely in CSS.
- The theme class (`dark-mode` or `light-mode`) is applied alongside the layout class (`container`) on the outer `<div>`, so switching themes only changes colors, not layout.

## Trade-offs

- Theme state is local to the component and not persisted (e.g. to `localStorage`) or synced with the OS `prefers-color-scheme`, since the task only calls for local toggle behavior.
