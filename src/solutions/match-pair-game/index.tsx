import { type JSX, useEffect, useState } from 'react';
import './styles.css';

interface Card {
  id: number;
  value: string;
  revealed: boolean;
  matched: boolean;
}

const initialEmojis: string[] = ['❤️', '🍀', '🌎', '🍎', '⚽️', '🚗', '⛵️', '💎'];

function shuffleCards(): Card[] {
  const deck = [...initialEmojis, ...initialEmojis];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.map((value, index) => ({ id: index, value, revealed: false, matched: false }));
}

const MatchPairGame = (): JSX.Element => {
  const [cards, setCards] = useState<Card[]>(() => shuffleCards());
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const won = cards.length > 0 && cards.every((c) => c.matched);

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    const timeoutId = setTimeout(() => {
      if (firstCard.value === secondCard.value) {
        setCards((prev) => prev.map((c) => (c.id === firstCard.id || c.id === secondCard.id ? { ...c, matched: true } : c)));
      } else {
        setCards((prev) => prev.map((c) => (c.id === firstCard.id || c.id === secondCard.id ? { ...c, revealed: false } : c)));
      }
      setFirstCard(null);
      setSecondCard(null);
      setIsLocked(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [firstCard, secondCard]);

  const handleClick = (card: Card): void => {
    if (isLocked || card.revealed || card.matched) return;

    setCards((prev) => prev.map((c) => (c.id === card.id ? { ...c, revealed: true } : c)));

    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
      setIsLocked(true);
      setMoves((prev) => prev + 1);
    }
  };

  const resetGame = (): void => {
    setCards(shuffleCards());
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
    setIsLocked(false);
  };

  return (
    <div className="game-container">
      <h1>Match Pair Game</h1>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.revealed || card.matched ? 'revealed' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => handleClick(card)}
          >
            {(card.revealed || card.matched) && card.value}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      {won && <p className="won">🎉 You won!</p>}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default MatchPairGame;
