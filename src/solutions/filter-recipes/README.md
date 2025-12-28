# Recipe Filter and Cart System

A React-based component that allows users to filter recipes by rating, view the average rating of filtered results, and add recipes to a shopping cart with a live item count.

## Description

This component presents a list of recipes containing details such as name, rating, cuisine, and image. Users can filter recipes using a minimum rating threshold, calculate the average rating of the filtered recipes, and add selected recipes to a cart. The cart displays only the total number of added items.

## Features

- Filter recipes by minimum rating
- Dynamically display filtered recipes
- Add recipes to a shopping cart
- Display live cart item count
- Calculate and display average rating of filtered recipes
- Gracefully handle empty filter results

## Functional Requirements

### 1. Recipe Filter

- Dropdown labeled **“Filter by Rating:”**
- Available options:
  - 4.0+
  - 4.3+
  - 4.5+
  - 4.7+
  - 4.9+
- Only recipes with a rating **greater than or equal to** the selected value are displayed

### 2. Cart System

- Each recipe includes an **“Add to Cart”** button
- Clicking the button:
  - Adds the recipe to the cart
  - Updates the cart item count
- Cart display format:
  - `Cart Items: 0`
  - `Cart Items: 1`
  - `Cart Items: N`
- Cart details (recipe names, prices, etc.) are **not required**

### 3. Average Rating Calculation

- Displays the average rating of currently filtered recipes
- Format:
  - `Average Rating: 4.87`
- Average is displayed with **two decimal places**
- If no recipes match the selected filter:
  - Display `Average Rating: 0.00`

## Behavior

- Changing the rating filter updates:
  - The displayed recipe list
  - The average rating value
- Cart count persists across filter changes
- Adding the same recipe multiple times increments the cart count accordingly

## Edge Cases Handled

- No recipes matching selected rating
- Rapid filter changes
- Multiple cart additions
- Floating-point rating precision

## Accessibility

- Clearly labeled dropdown and buttons
- Readable numeric displays
- Predictable user interactions

## Example Scenario

**Selected Filter:** `4.5+`  
**Filtered Recipes:** 3  
**Average Rating:** `4.67`  
**Cart Items:** `2`

## Tech Stack

- React (Functional Components + Hooks)
- JavaScript (ES6+)
- CSS (Flexbox / Grid for layout)

## Notes

- Average rating is recalculated dynamically on filter change
- Cart count is independent of filtering
- Component is designed to be modular and extensible
