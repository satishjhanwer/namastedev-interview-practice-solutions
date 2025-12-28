# Even or Odd Checker

A simple React component that allows users to input a number and determine whether it is **even or odd**, with a simulated processing delay and proper validation handling.

## Features

- User can enter a number in an input field
- Input field includes placeholder text
- Button triggers the even/odd check
- Simulates processing with a 1-second loading state
- Displays clear result or error message
- Fully testable using required data test IDs

## Behavior

- Clears any previous result immediately when the button is clicked
- Displays a loading message for 1 second
- Shows the final result only after loading completes
- Gracefully handles invalid and empty inputs

## Result Format

- `"The number X is even."`
- `"The number X is odd."`
- `"Please enter a valid number."` (for invalid or empty input)

## Edge Cases Handled

- Empty input
- Non-numeric input (e.g. text, symbols)
- Leading and trailing spaces
- Large numbers
- Rapid repeated button clicks

## Accessibility

- Clear visual feedback during loading
- Predictable UI behavior
- Semantic HTML elements used

## Test IDs

The following `data-testid` attributes are required for automated testing:

- `number-input` – Input field for entering the number
- `check-button` – Button to trigger the check
- `loading` – Loading indicator shown during processing
- `result` – Element displaying the final result or error message

## Example Inputs & Outputs

|Input|Output|
|-----|------|
|`4`|`The number 4 is even.`|
|`5`|`The number 5 is odd.`|
|`abc`|`Please enter a valid number.`|
|`` (empty) ``|`Please enter a valid number.`|

## Tech Stack

- React (Functional Components + Hooks)
- CSS (Glassmorphism UI)
- JavaScript (ES6+)

## Notes

- Processing delay is simulated using `setTimeout`
- Input is trimmed before validation
- Result rendering is strictly gated behind the loading state
