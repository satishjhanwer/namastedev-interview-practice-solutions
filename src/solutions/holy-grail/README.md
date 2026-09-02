# Holy Grail

## Description

A classic Holy Grail layout: a fixed-height header and footer, with a three-column body between them — a fixed-width left `<nav>`, a flexible `<main>`, and a fixed-width right `<aside>`.

## Approach

- `.container` is a full-height (`min-height: 100vh`) flex column holding `header`, `.columns`, and `footer` in order.
- `.columns` is a flex row with `flex: 1 1 auto`, so it grows to fill any remaining vertical space, which naturally pins the footer to the bottom of the viewport even on short pages — no `position: fixed` needed.
- Inside `.columns`, `nav` and `aside` are fixed at `flex: 0 0 100px` (won't grow or shrink) while `main` takes `flex: 1 1 auto` to fill the remaining width; `min-width: 0` on `main` prevents it from overflowing its flex basis with long unbroken content.
- Flexbox's default `align-items: stretch` makes all three columns match height automatically, regardless of content length.
- All styling is scoped under the required `.container`/`.columns` classNames rather than bare element or universal selectors, so nothing leaks outside this component's own layout.

## Trade-offs

- Header/footer heights (60px/100px) and sidebar widths (100px) are hardcoded per the spec rather than exposed as props, since this is a fixed layout demo rather than a configurable component.
