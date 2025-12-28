# Back to Top Button

A floating React component that appears when the user scrolls down the page and allows them to smoothly scroll back to the top with a single click.

## Description

The Back to Top Button enhances user navigation on long pages by providing a quick way to return to the top. The button remains hidden near the top of the page and becomes visible only after the user scrolls beyond a defined threshold.

## Features

- Floating button that stays visible on screen
- Appears only after scrolling past a certain distance
- Smooth scrolling behavior back to the top
- Hidden by default to avoid UI clutter
- Testable via required `data-testid`

## Functional Requirements

### 1. Button Visibility

- Button is hidden when the page is near the top
- Button appears only after scrolling beyond **500px**
- Button remains fixed on the screen when visible

### 2. Scroll Behavior

- Clicking the button scrolls the page back to the top
- Scroll action is smooth and animated

### 3. Page Content

- Page contains enough content to allow vertical scrolling
- Button visibility can be reliably tested through scroll interaction

## Behavior

- Initial page load: button is hidden
- User scrolls past 500px: button becomes visible
- User clicks button: page scrolls smoothly to the top
- After reaching the top: button hides again

## Edge Cases & Constraints

- Button does not render when scrolling is not possible
- Button visibility updates correctly on rapid scroll events
- Only one Back to Top button appears at any time

## Data Test IDs

The following `data-testid` attribute is required for automated testing:

- `back-to-top-btn` – Back to Top button element

## Accessibility

- Clickable element with clear affordance
- Visible only when useful to the user
- Predictable interaction behavior

## Example Flow

1. User scrolls down the page
2. Scroll position exceeds 500px
3. Back to Top button appears
4. User clicks the button
5. Page scrolls smoothly to the top
6. Button hides again

## Tech Stack

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- CSS (Fixed positioning and transitions)

## Notes

- Scroll position is tracked using `window.scrollY`
- Smooth scrolling uses `window.scrollTo` with `behavior: "smooth"`
- Component is designed to be reusable across long pages
