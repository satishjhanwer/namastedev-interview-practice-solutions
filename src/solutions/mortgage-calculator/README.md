# Mortgage Calculator

## Description

Calculates the fixed monthly mortgage payment from a loan amount, annual interest rate, and term in years, using the standard amortization formula.

## Approach

- Three controlled text inputs (kept as strings) hold the raw loan amount, annual interest rate, and term; parsing and validation only happen when "Calculate" is clicked, not on every keystroke.
- `parseInputs` requires all three fields to be non-empty, finite numbers with loan amount > 0, interest rate > 0, and term > 0 (per the stated constraints); it returns `null` on any failure.
- `calculateMonthlyPayment` applies `M = P * (r * (1+r)^n) / ((1+r)^n - 1)`, where `r` is the monthly rate (`annualRate / 12 / 100`) and `n` is the number of monthly payments (`years * 12`).
- On invalid input, "Invalid input" is shown and any previous result is cleared; the result (`aria-label="result"`) is only rendered when the calculation succeeds.

## Trade-offs

- Validation runs only on submit (via the Calculate button) rather than live, matching the spec's explicit "Calculate" button requirement.
- The loan term input keeps the literal `id="Loan Term"` (with a space) as specified, even though it's an unusual id value.
