# Chips Input Component

A reusable React component that allows users to enter, display, and manage a list of tags (chips). Users can add chips via keyboard input and remove them individually using a delete action.

## Description

The Chips Input component enables users to input a series of keywords or tags. Each entry is rendered as a **chip** (small label) that can be dynamically added or removed. The component maintains state across re-renders and supports duplicate chip values.

## Features

- Text input field for entering chip values
- Add chips by pressing the **Enter** key
- Prevents empty or whitespace-only chips
- Displays chips horizontally
- Remove individual chips using an **"X"** button
- Supports duplicate chip values without side effects
- State persists across component re-renders

## Behavior

- User types text into the input field
- Pressing **Enter** adds the input value as a chip
- Input is trimmed before being added
- Empty or whitespace-only values are ignored
- Each chip renders with a delete button labeled **"X"**
- Clicking **"X"** removes only the selected chip
- Removing one chip does **not** affect other chips with the same label

## Important Implementation Notes

- The input field is of type `text`
- Chip addition is handled using the `onKeyDown` event
- `onKeyPress` is not used, as it is deprecated
- Chip identity is maintained using index or unique keys to support duplicates

## Edge Cases Handled

- Empty input
- Whitespace-only input
- Duplicate chip values
- Multiple rapid additions and deletions
- Component re-renders without state loss

## Accessibility

- Keyboard-friendly input interaction
- Clickable delete buttons with clear labels
- Predictable focus behavior

## Example Usage

**Input sequence:**
React → Enter
React → Enter
JavaScript → Enter

**Rendered chips:**
[ React ✕ ] [ React ✕ ] [ JavaScript ✕ ]

Deleting one `React` chip removes only that chip.

## Tech Stack

- React (Functional Components)
- JavaScript (ES6+)
- CSS (flexbox for horizontal layout)

## Notes

- Chips are rendered in a horizontal list
- Component is designed to be easily reusable and extensible
