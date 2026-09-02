# Acronym Generator

## Description

Takes a typed phrase and generates its acronym: the uppercased first letter of each word, joined together.

## Approach

- `phrase` is a controlled input's state; `result` is only updated when the "Generate" button is clicked, not on every keystroke.
- `toAcronym` trims the phrase, splits on runs of whitespace (`/\s+/`), filters out empty strings (handles leading/trailing/extra spaces), and maps each word to its first character uppercased.
- An empty or whitespace-only phrase produces an empty acronym.
- `data-testid` attributes (`input`, `generate-button`, `result`) are set on the input, button, and result paragraph for testing.

## Trade-offs

- Only ASCII/Unicode word-initial characters are considered; no special handling for hyphenated words or numbers beyond taking their first character as-is.
