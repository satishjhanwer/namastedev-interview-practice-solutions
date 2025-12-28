# Color Explorer

A React-based application that allows users to explore colors by entering natural language CSS color names and instantly viewing their corresponding HEX codes with a visual color preview.

## Description

Color Explorer helps users convert standard CSS color names (such as `lavender`, `skyblue`, or `darkorange`) into their HEX equivalents. The application matches user input against a predefined color dictionary and presents the result with a circular color preview. Invalid or unsupported color names are handled gracefully with clear error messaging.

## Features

- Input field for entering CSS color names
- Case-insensitive color matching
- Automatic conversion of valid color names to HEX codes
- Circular visual preview of the selected color
- Clear error handling for unsupported or invalid inputs
- Fully testable using required data test IDs

## Functional Requirements

### 1. Color Input & Search

- Input field for users to enter a color name
- Search button to trigger the color lookup
- Input is trimmed and normalized before matching

### 2. Valid Color Handling

If the entered color name is valid:

- Display the color name
- Display the corresponding HEX code
- Display a circular color preview
- Render all results inside a dedicated result container

### 3. Invalid Color Handling

If the entered color name is invalid:

- Display the error message:  
  `Sorry, I couldn't recognize that color.`
- Clear any previously displayed valid result

## Supported Color Names

- Supports **140+ standard CSS color names**
- Color list is sourced from the provided `colorData.js` file
- Matching rules:
  - Case-insensitive
  - Leading and trailing whitespace ignored
  - Only exact matches from the dictionary are recognized

## Behavior

- Input like `" Light Gray "` resolves correctly
- Input like `"skyBlue"` resolves correctly
- Unsupported color names trigger an error
- Results update immediately on search
- Previous results are cleared on invalid input

## Edge Cases & Constraints

- Extra spaces in input are ignored
- Mixed casing is supported
- Partial or misspelled color names are not recognized
- Only colors defined in `colorData.js` are valid

## Data Test IDs

The following `data-testid` attributes are required for automated testing:

- `color-input` – Input field for color name
- `search-button` – Button that triggers the search
- `color-name` – Rendered color name
- `color-hex` – Rendered HEX code
- `color-preview` – Circular color preview element
- `color-box` – Container for valid color result
- `error-msg` – Error message displayed for invalid input

## Accessibility

- Clear text labels and visual feedback
- High-contrast color preview
- Predictable and accessible interactions

## Example Flow

1. User enters `lavender`
2. Clicks **Search**
3. App displays:
   - Color Name: Lavender
   - HEX Code: #E6E6FA
   - Circular color preview

If the user enters `bluishish`:

- Error message is displayed
- Previous color result is cleared

## Tech Stack

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- CSS (Flexbox and border-radius for circular preview)

## Notes

- Color normalization is handled before lookup
- Component is designed to be reusable and extensible
- UI updates are fully controlled by component state
