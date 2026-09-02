# Array To Zigzag String Converter

## Description

Takes a comma-separated list of strings and merges them zigzag-style: even-indexed parts are kept as-is, odd-indexed parts are reversed, and everything is concatenated with no separator.

## Approach

- `toZigzag` returns `''` immediately if the trimmed input is empty.
- Otherwise it splits on `,`, trims each part (handling stray spaces around commas), reverses the string at every odd index (`part.split('').reverse().join('')`), and joins all parts together with no separator.
- The result is only recomputed when "Submit" is clicked, not on every keystroke, and is always shown prefixed with `"Output: "`.
- `data-testid` attributes (`input-box`, `submit-button`, `output-result`) are set for testing.

## Trade-offs

- All existing page-level styles (`body`, bare `h1`/`input`/`button`/`p` selectors) were scoped under `.array-to-zigzag-converter-body-container` instead, so this solution's CSS can't leak into or be affected by the rest of the app.
