# Focus Input

## Description

A minimal example of imperative DOM access in React: clicking a button moves focus into a text input.

## Approach

- `useRef<HTMLInputElement>(null)` creates a ref attached to the input via the `ref` prop.
- The button's `onClick` handler calls `inputRef.current?.focus()`, letting the DOM API handle focus directly rather than tracking focus in state.
- The input is not focused on mount — only the button click triggers `.focus()`.

## Trade-offs

- Uses the DOM imperatively (`ref.current.focus()`) instead of React state, which is the appropriate escape hatch for actions like focus/scroll that aren't naturally expressed as rendered output.
