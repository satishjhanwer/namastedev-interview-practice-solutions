# Progress Bar Component

A React progress bar component that visually represents progress from 0% to 100% and allows users to increment or decrement the value using buttons. The bar dynamically changes color based on progress thresholds.

## Description

This component displays a single progress bar whose value can be increased or decreased in steps of 10%. The progress is visually represented through both width and color, providing clear feedback to the user. All updates are clamped between 0% and 100% to ensure valid values.

## Features

- Displays a single progress bar
- Progress value ranges from 0% to 100%
- Buttons to increment and decrement progress by 10%
- Progress value displayed inside the bar
- Dynamic color change based on progress thresholds
- Smooth UI updates
- Fully testable with required DOM identifiers

## Functional Requirements

### 1. Progress Display

- Shows the current progress value as a percentage
- Format: 10%, 40%, 80%
- Progress text updates immediately after button interaction

### 2. Controls

- **+10%** button:
- Increases progress by 10
- **-10%** button:
- Decreases progress by 10

### 3. Value Constraints

- Progress cannot go below `0%`
- Progress cannot exceed `100%`
- Values are clamped automatically when limits are reached

## Color Rules

The progress bar color changes based on the current value:

| Progress Value | Color |
| --------------- | ------- |
| `< 40%` | Red |
| `40% – 79%` | Orange |
| `≥ 80%` | Green |

## Behavior

- Initial progress starts at `0%`
- Clicking **+10%** increases progress by 10
- Clicking **-10%** decreases progress by 10
- Color updates immediately when thresholds are crossed
- Progress text and width remain in sync

## Edge Cases & Constraints

- Decrementing below 0 clamps the value to 0
- Incrementing above 100 clamps the value to 100
- Only one progress bar is rendered
- Progress text is rendered as a single string (e.g. `10%`)

## Testing Requirements

The following constraint is required for automated testing:

- The progress bar element **must** include:

```html
id="testBgColor"
```

- This identifier is used to verify the background color during tests.

## Accessibility

- Clear text feedback for progress value
- Buttons are keyboard- and mouse-accessible
- Predictable interaction behavior

## Tech Stack

- React (Functional Components)
- TypeScript
- CSS (external stylesheet for layout and styling)

## Notes

- Progress state is managed locally using useState
- Color logic is derived directly from the current progress value
- Component is designed to be simple, deterministic, and test-friendly
