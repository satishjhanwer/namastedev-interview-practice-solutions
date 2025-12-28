# Confirmation Modal Component

A reusable React modal component that presents a confirmation prompt to the user and captures their decision through **Confirm** or **Cancel** actions.

## Description

This component provides a modal dialog that appears on user interaction and asks for confirmation before proceeding with an action. Based on the user’s choice, the modal closes and a corresponding status message is displayed.

## Features

- Button to trigger the confirmation modal
- Modal with title and message
- Confirm and Cancel actions
- Status message displayed after user action
- Single modal instance at any time
- Fully testable using required data test IDs

## Functional Requirements

### 1. Open Modal

- A button labeled **“Open Confirmation Modal”**
- Clicking the button displays the modal

### 2. Modal Content

The modal includes:

- Title: **“Confirm Action”**
- Message: **“Are you sure you want to proceed?”**
- Two buttons:
  - **Confirm**
  - **Cancel**

### 3. Confirm Action

- Clicking **Confirm**:
  - Closes the modal
  - Displays the status message:  
    `Confirmed`

### 4. Cancel Action

- Clicking **Cancel**:
  - Closes the modal
  - Displays the status message:  
    `Cancelled`

## Behavior

- Modal is hidden by default
- Modal appears only after clicking the open button
- Only one modal can be visible at a time
- Status message updates based on the last user action
- Modal closes automatically after Confirm or Cancel

## Edge Cases & Constraints

- Modal does not render before user interaction
- Status message updates correctly for each action
- Re-opening the modal does not create duplicates
- State is properly reset between interactions

## Data Test IDs

The following `data-testid` attributes are required for automated testing:

- `open-modal-button` – Button that opens the modal
- `confirmation-modal` – Modal container
- `modal-title` – Modal title text
- `modal-message` – Modal message text
- `confirm-button` – Confirm action button
- `cancel-button` – Cancel action button
- `action-status` – Status message displayed after user action

## Accessibility

- Clear and readable modal content
- Keyboard- and mouse-friendly interactions
- Predictable focus and close behavior

## Example Flow

1. User clicks **Open Confirmation Modal**
2. Modal appears with title and message
3. User clicks **Confirm**
4. Modal closes
5. Status message displays: `Confirmed`

## Tech Stack

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- CSS (Modal overlay and layout styling)

## Notes

- Modal visibility is controlled via component state
- Status message persists until the next user action
- Component is designed for reuse across confirmation flows
