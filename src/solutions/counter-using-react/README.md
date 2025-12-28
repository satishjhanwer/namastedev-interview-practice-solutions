# React Counter Component

A simple React counter component built using **TypeScript** that allows users to increment, decrement, and reset a numeric counter value.

## Description

This component displays a counter with three action buttons—**Increment**, **Decrement**, and **Reset**. Users can increase or decrease the counter value by 1 or reset it back to zero. The current count is always displayed with the label **“Counter”**.

## Features

- Increment counter value by 1
- Decrement counter value by 1
- Reset counter value to 0
- Real-time counter display
- Implemented strictly using **TypeScript**
- Simple, predictable UI behavior

## Functional Requirements

### 1. Counter Display

- Displays the current counter value
- Format: Counter: X

where `X` is the current count

### 2. Increment Button

- Labeled **“Increment”**
- Increases the counter value by 1 on click

### 3. Decrement Button

- Labeled **“Decrement”**
- Decreases the counter value by 1 on click

### 4. Reset Button

- Labeled **“Reset”**
- Resets the counter value back to `0`

## Behavior

- Initial counter value is `0`
- Clicking **Increment** increases the value
- Clicking **Decrement** decreases the value
- Clicking **Reset** sets the value to `0`
- UI updates immediately on every action

## Edge Cases & Constraints

- Counter state is managed locally within the component
- Multiple rapid clicks are handled correctly
- No external state management required
- Component remains stable across re-renders

## Accessibility

- Clearly labeled buttons
- Readable counter text
- Keyboard- and mouse-friendly interactions

## Tech Stack

- React
- TypeScript
- CSS (basic styling)

## Notes

- Component is implemented using React Hooks (`useState`)
- TypeScript enforces strict typing for state and handlers
- Designed to be minimal, reusable, and easy to extend
