# Match Pair Game

## Description

A 4x4 memory matching game: 8 emoji pairs are shuffled into 16 cards, cards flip on click, matching pairs stay revealed, mismatches flip back after a delay, and moves are counted until all pairs are found.

## Approach

- `Card` is `{ id, value, revealed, matched }`; `shuffleCards()` builds the 16-card deck (each of the 8 emojis duplicated) and runs a Fisher-Yates shuffle, called both on mount and on reset.
- `firstCard`/`secondCard` hold snapshots of the two currently-selected cards. A `useEffect` keyed on `[firstCard, secondCard]` fires only once both are set:
  - Same value → both cards marked `matched: true` immediately, selection cleared, no delay.
  - Different value → `isLocked` is set so further clicks are ignored, then after a 1-second `setTimeout` both cards are un-revealed, selection cleared, and the board unlocks. The effect's cleanup clears the timeout if it re-runs before firing.
- `moves` increments once per completed pair of flips (i.e., once per effect run when both cards are set), not once per card click.
- A separate `useEffect` on `cards` sets `won` once every card's `matched` is true.
- `handleClick` guards against clicking during the lock delay, an already revealed/matched card, or a third click while two are still pending evaluation.
- Reset re-shuffles, and clears moves, selection, lock, and win state in one go.

## Trade-offs

- Card class names/CSS (`card`, `revealed`, `matched`, `game-container`, `grid`, `won`) are kept exactly as given in the scaffold, since styling was already provided.
