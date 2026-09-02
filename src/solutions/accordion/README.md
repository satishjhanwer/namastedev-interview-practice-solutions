# Accordion

## Description

A React accordion that displays a list of `{ title, content }` items, expanding one section at a time.

## Approach

- A single `openIndex` state (`number | null`) tracks which item is expanded; clicking a title toggles it closed if it's already open, or opens it while collapsing any other item.
- Content is only rendered for the open item (conditional rendering), avoiding hidden DOM for collapsed sections.
- `aria-expanded` on the title button reflects state for accessibility, and `FaChevronDown`/`FaChevronUp` indicate the toggle direction.
- If `items` is missing, not an array, or empty, the component renders a "No items available" message instead.

## Trade-offs

- Only one section can be open at a time (accordion behavior), rather than allowing multiple simultaneous open sections.
- Items are keyed by `title`; duplicate titles in the input array would collide as React keys.
