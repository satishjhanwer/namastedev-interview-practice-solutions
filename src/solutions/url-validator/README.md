# Url Validator

## Description

Validates a URL typed into an input, giving real-time "Valid URL" / "Invalid URL" feedback.

## Approach

- `isValidUrl` rejects any value containing whitespace, then requires the string to start with `http://` or `https://` via regex.
- The remaining check parses the value with the built-in `URL` constructor (wrapped in try/catch, since malformed input throws) and accepts it only if `hostname` is exactly `localhost` or contains at least one `.`.
- Validation re-runs on every keystroke against component state — no debouncing, since the check is cheap.
- The result text is colored green (valid) or red (invalid) via CSS classes toggled on the `result` element.

## Trade-offs

- Relies on the `URL` constructor for parsing rather than a hand-rolled regex for the whole URL, which is more robust for edge cases (ports, paths, query strings) but ties validation to the runtime's URL parser behavior.
- Any protocol other than `http`/`https` (e.g. `ftp://`) is rejected outright by the leading regex check.
