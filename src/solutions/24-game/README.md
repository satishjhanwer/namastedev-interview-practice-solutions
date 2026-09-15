# 24 Game

## Description

Deal 4 random numbers (1–9); build an arithmetic expression using all four exactly once, with `+ - * /` and parentheses, that evaluates to 24.

## Approach

- `logic.ts` holds all the pure logic, independent of React/the DOM:
  - `judgePoint24(numbers)` — classic backtracking solver: repeatedly combines any two remaining numbers with `+ - * /` (skipping division by zero) into one, recursing until a single value remains and is within `1e-6` of 24.
  - `evaluateTokens(tokens)` — a small recursive-descent parser/evaluator over the token list directly (no `eval`/`Function`), respecting `*`/`/` before `+`/`-` and parentheses. Returns `null` for any malformed input (unmatched parens, dangling operators, division by zero) instead of throwing, so the UI never crashes on an incomplete or invalid expression.
  - `generateCards`/`shuffleArray` are the random-number and Fisher-Yates helpers.
- The scaffold given for this problem was an imperative `document.getElementById`-driven module wired up via a `useEffect(() => { init(); dealNewCards(); }, [])`. That pattern fights this project's convention (controlled React state, no DOM-manipulation effects) and this repo's ESLint rule against synchronous `setState` in effects, so this is a from-scratch React-state implementation instead, keeping every required behavior and `data-testid`.
- The expression is stored as a `Token[]` (`{type:'number', value, cardIndex}` / `{type:'op'}` / `{type:'paren'}`), not a plain string — each number token remembers which card slot it came from. `usedIndices` (which cards are disabled) is *derived* from `tokens` via `useMemo` rather than tracked separately, so Undo and Clear can't desync a card's disabled state from the expression — removing a number token automatically re-enables its card.
- The live preview (`result`, `data-testid="result"`) recomputes from `tokens` on every render; the Check button's ✅/❌/"Invalid Expression ❌" outcome is a separate transient `feedback` state that's cleared the moment the expression is edited again, so the preview naturally takes back over.
- Shuffle reorders the `cards` array (Fisher-Yates) but also clears the in-progress expression — a card's on-screen slot (`card-0`..`card-3`) is what tokens key off of, so reordering slots mid-expression would silently point tokens at the wrong number if the expression weren't reset.
- Give Up calls `judgePoint24` on the current deal: if solvable it just shows an encouragement message; if not, it deals a fresh set and clears the expression automatically, per spec.

## Trade-offs

- Move history persists across "New Deal" (the spec allows either); it's cleared only by page reload, giving a full session log rather than resetting each round.
- No native `alert()` calls (the original scaffold's hint used them for the "must use all 4 numbers" case) — everything surfaces as inline text, since `alert()` is poor UX in an embedded widget and can hang headless test runners.
