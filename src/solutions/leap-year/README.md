# Leap Year Checker

A responsive React component that allows users to enter a year and determine whether it is a leap year. The component validates input, handles edge cases, and displays clear results or error messages.

## Description

The Leap Year Checker accepts a year as text input and checks whether it qualifies as a leap year based on standard leap-year rules. The result is displayed immediately after clicking the **Check** button. Empty or invalid inputs are handled gracefully with a clear error message.

## Features

- Text input for entering a year
- Button to trigger leap-year validation
- Displays leap-year result for valid input
- Displays error message for empty or invalid input
- Trims extra whitespace automatically
- Works with positive and negative integer years
- Fully testable using required data test IDs

## Functional Requirements

### 1. Input & Label

- Label text: **“Enter a year:”**
- Input field of type `text`
- Input may contain leading or trailing whitespace

### 2. Leap Year Check

- Button labeled **“Check”**
- Clicking the button evaluates the input year using leap-year rules:
  - Year is divisible by **400**, OR
  - Year is divisible by **4** but **not** by **100**

### 3. Result Display

- For valid input:
  - `YYYY is a Leap Year`
  - `YYYY is not a Leap Year`
- For invalid or empty input:
  - `Please enter a year`

## Behavior

- Input is trimmed before validation
- Result or error updates immediately on button click
- Previous results are cleared when a new check is performed
- Accepts any valid integer (positive or negative)

## Edge Cases & Constraints

- Empty input
- Whitespace-only input
- Non-integer input
- Leading and trailing spaces
- Large integer values

## Example Scenarios

| Input | Result |
| ------ | -------- |
| `2020` | `2020 is a Leap Year` |
| `2021` | `2021 is not a Leap Year` |
| `2028` | `2028 is a Leap Year` |
| ``(empty)`` | `Please enter a year` |

## Data Test IDs

The following `data-testid` attributes are required for automated testing:

- `label-date` – Label for the year input
- `year-input` – Input field for the year
- `check-btn` – Button to trigger leap-year check
- `result` – Display area for leap-year result
- `error-msg` – Error message container for invalid input

## Accessibility

- Clear label associated with input
- Readable result and error messages
- Keyboard- and mouse-friendly interactions

## Tech Stack

- React (Functional Components + Hooks)
- TypeScript
- CSS (responsive layout and animations)

## Notes

- Leap-year logic follows standard Gregorian calendar rules
- Input validation is performed before calculation
- Component is designed to be simple, reusable, and extensible
