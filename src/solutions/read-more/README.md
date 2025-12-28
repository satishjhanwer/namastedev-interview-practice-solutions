# Read More / Read Less Component

A React component that displays a truncated preview of a long paragraph and allows users to expand or collapse the content using a toggle button. This improves readability and user experience for lengthy text blocks.

## Description

The Read More / Read Less component initially shows a shortened version of a paragraph (for example, the first 100 characters followed by an ellipsis). Users can toggle between the preview and the full content using a button that dynamically updates its label.

## Features

- Displays a truncated preview of long text by default
- Expands to show full text on user interaction
- Toggle button switches between **Read More** and **Read Less**
- Instant UI update on click
- Fully testable using required data test IDs

## Functional Requirements

### 1. Text Display

- Shows a shortened preview of the text initially
- Preview consists of the first 100 characters followed by `...`
- Displays the full paragraph when expanded

### 2. Toggle Button

- Button label is **“Read More”** when text is collapsed
- Button label changes to **“Read Less”** when text is expanded
- Clicking the button toggles between states immediately

## Behavior

- Initial render shows truncated text
- Clicking **Read More**:
  - Displays full text
  - Updates button label to **Read Less**
- Clicking **Read Less**:
  - Collapses text back to preview
  - Updates button label to **Read More**

## Edge Cases & Constraints

- Works correctly with long paragraphs
- Handles rapid toggle clicks without UI glitches
- Button and text stay in sync at all times

## Data Test IDs

The following `data-testid` attributes are required for automated testing:

- `readmore-text` – Paragraph element displaying truncated or full text
- `readmore-button` – Button used to toggle text expansion

## Accessibility

- Clear, descriptive button labels
- Predictable and immediate content updates
- Readable text presentation

## Example Flow

1. User sees truncated text with **Read More** button
2. User clicks **Read More**
3. Full text is displayed
4. Button label changes to **Read Less**
5. User clicks **Read Less**
6. Text collapses back to preview

## Tech Stack

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- CSS (basic text and button styling)

## Notes

- Text truncation is handled programmatically
- Component is reusable for any long text content
- Designed to be lightweight and easy to integrate
