import { type JSX, useMemo, useState } from 'react';
import { type Token, evaluateTokens, formatExpression, generateCards, judgePoint24, roundResult, shuffleArray } from './logic';
import './styles.css';

type CheckStatus = 'correct' | 'incorrect' | 'invalid';

interface CheckFeedback {
  status: CheckStatus;
  text: string;
}

export default function Game24(): JSX.Element {
  const [cards, setCards] = useState<number[]>(() => generateCards());
  const [tokens, setTokens] = useState<Token[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<CheckFeedback | null>(null);
  const [giveUpMessage, setGiveUpMessage] = useState<string | null>(null);

  const usedIndices = useMemo(() => new Set(tokens.filter((t) => t.type === 'number').map((t) => t.cardIndex)), [tokens]);
  const liveResult = useMemo(() => evaluateTokens(tokens), [tokens]);
  const expressionText = useMemo(() => formatExpression(tokens), [tokens]);

  const clearTransientMessages = (): void => {
    setFeedback(null);
    setGiveUpMessage(null);
  };

  const appendNumber = (index: number): void => {
    if (usedIndices.has(index)) return;
    clearTransientMessages();
    setTokens((prev) => [...prev, { type: 'number', value: cards[index], cardIndex: index }]);
  };

  const appendOperator = (value: '+' | '-' | '*' | '/'): void => {
    clearTransientMessages();
    setTokens((prev) => [...prev, { type: 'op', value }]);
  };

  const appendParen = (value: '(' | ')'): void => {
    clearTransientMessages();
    setTokens((prev) => [...prev, { type: 'paren', value }]);
  };

  const undo = (): void => {
    clearTransientMessages();
    setTokens((prev) => prev.slice(0, -1));
  };

  const clearExpression = (): void => {
    clearTransientMessages();
    setTokens([]);
  };

  const dealNewCards = (): void => {
    clearTransientMessages();
    setCards(generateCards());
    setTokens([]);
  };

  const shuffleCards = (): void => {
    clearTransientMessages();
    setCards((prev) => shuffleArray(prev));
    setTokens([]);
  };

  const addHistory = (line: string): void => {
    setHistory((prev) => [...prev, line]);
  };

  const handleCheck = (): void => {
    if (usedIndices.size !== 4) {
      setFeedback({ status: 'invalid', text: 'Invalid Expression ❌' });
      addHistory(`${expressionText || '(incomplete)'} = Invalid ❌`);
      return;
    }

    const result = evaluateTokens(tokens);
    if (result === null) {
      setFeedback({ status: 'invalid', text: 'Invalid Expression ❌' });
      addHistory(`${expressionText} = Invalid ❌`);
      return;
    }

    if (Math.abs(result - 24) < 1e-6) {
      setFeedback({ status: 'correct', text: '= 24 🎉 ✅' });
      addHistory(`${expressionText} = 24 ✅`);
    } else {
      const rounded = roundResult(result);
      setFeedback({ status: 'incorrect', text: `= ${rounded} ❌` });
      addHistory(`${expressionText} = ${rounded} ❌`);
    }
  };

  const handleGiveUp = (): void => {
    setFeedback(null);
    if (judgePoint24(cards)) {
      setGiveUpMessage('This deal is solvable — keep trying! 💪');
    } else {
      setGiveUpMessage('This deal was unsolvable — dealing a new one. 🔄');
      setCards(generateCards());
      setTokens([]);
    }
  };

  const previewText = feedback
    ? feedback.text
    : liveResult !== null
      ? `= ${roundResult(liveResult)}`
      : tokens.length > 0
        ? '= ?'
        : '';

  return (
    <div className="game24-body-container">
      <h1 className="title">
        24 Game
        <small>Use all 4 cards to make 24</small>
      </h1>

      <div className="cards-container" data-testid="cards-container">
        {cards.map((value, index) => (
          <button
            key={index}
            type="button"
            className="card"
            data-testid={`card-${index}`}
            disabled={usedIndices.has(index)}
            onClick={() => appendNumber(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="expr">
        <span className="expression-display" data-testid="expression-display">
          {expressionText}
        </span>
        <span className={`result result-${feedback?.status ?? 'preview'}`} data-testid="result">
          {previewText}
        </span>
      </div>

      <div className="bar">
        <button type="button" data-testid="btn-add" onClick={() => appendOperator('+')}>
          +
        </button>
        <button type="button" data-testid="btn-sub" onClick={() => appendOperator('-')}>
          −
        </button>
        <button type="button" data-testid="btn-mul" onClick={() => appendOperator('*')}>
          ×
        </button>
        <button type="button" data-testid="btn-div" onClick={() => appendOperator('/')}>
          ÷
        </button>
        <button type="button" data-testid="btn-lp" onClick={() => appendParen('(')}>
          (
        </button>
        <button type="button" data-testid="btn-rp" onClick={() => appendParen(')')}>
          )
        </button>
        <button type="button" data-testid="btn-undo" onClick={undo} disabled={tokens.length === 0}>
          Undo
        </button>
        <button type="button" data-testid="btn-clear" onClick={clearExpression} disabled={tokens.length === 0}>
          Clear
        </button>
      </div>

      <div className="bar">
        <button type="button" data-testid="btn-check" onClick={handleCheck}>
          ✅ Check
        </button>
        <button type="button" data-testid="btn-new" onClick={dealNewCards}>
          🆕 New
        </button>
        <button type="button" data-testid="btn-shuffle" onClick={shuffleCards}>
          🔀 Shuffle
        </button>
        <button type="button" data-testid="btn-giveup" onClick={handleGiveUp}>
          🏳️ Give Up
        </button>
      </div>

      {giveUpMessage && <p className="give-up-message">{giveUpMessage}</p>}

      <div className="history">
        <h4>History</h4>
        <ul className="history-container" data-testid="history-container">
          {history.map((line, index) => (
            <li key={index} data-testid={`history-item-${index}`}>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
