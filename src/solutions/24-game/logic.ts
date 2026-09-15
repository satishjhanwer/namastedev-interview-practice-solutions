export type Token =
  | { type: 'number'; value: number; cardIndex: number }
  | { type: 'op'; value: '+' | '-' | '*' | '/' }
  | { type: 'paren'; value: '(' | ')' };

type OpToken = Extract<Token, { type: 'op' }>;

function isOpToken(token: Token | undefined, values: OpToken['value'][]): token is OpToken {
  return !!token && token.type === 'op' && (values as string[]).includes(token.value);
}

export function generateCards(): number[] {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);
}

export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function judgePoint24(numbers: number[]): boolean {
  if (numbers.length === 1) {
    return Math.abs(numbers[0] - 24) < 1e-6;
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i === j) continue;

      const rest = numbers.filter((_, idx) => idx !== i && idx !== j);
      const a = numbers[i];
      const b = numbers[j];
      const candidates = [a + b, a - b, a * b];
      if (b !== 0) candidates.push(a / b);

      for (const candidate of candidates) {
        if (judgePoint24([...rest, candidate])) return true;
      }
    }
  }

  return false;
}

export function evaluateTokens(tokens: Token[]): number | null {
  let pos = 0;
  const peek = (): Token | undefined => tokens[pos];
  const consume = (): Token => tokens[pos++];

  const parseFactor = (): number => {
    const tok = peek();
    if (!tok) throw new Error('Unexpected end of expression');

    if (tok.type === 'paren' && tok.value === '(') {
      consume();
      const value = parseExpression();
      const closing = peek();
      if (!closing || closing.type !== 'paren' || closing.value !== ')') {
        throw new Error('Missing closing parenthesis');
      }
      consume();
      return value;
    }

    if (tok.type === 'number') {
      consume();
      return tok.value;
    }

    throw new Error('Unexpected token');
  };

  const parseTerm = (): number => {
    let value = parseFactor();
    while (isOpToken(peek(), ['*', '/'])) {
      const op = consume() as OpToken;
      const rhs = parseFactor();
      if (op.value === '*') {
        value *= rhs;
      } else {
        if (rhs === 0) throw new Error('Division by zero');
        value /= rhs;
      }
    }
    return value;
  };

  const parseExpression = (): number => {
    let value = parseTerm();
    while (isOpToken(peek(), ['+', '-'])) {
      const op = consume() as OpToken;
      const rhs = parseTerm();
      value = op.value === '+' ? value + rhs : value - rhs;
    }
    return value;
  };

  if (tokens.length === 0) return null;

  try {
    const result = parseExpression();
    return pos === tokens.length ? result : null;
  } catch {
    return null;
  }
}

export function formatExpression(tokens: Token[]): string {
  return tokens.map((t) => t.value).join('');
}

export function roundResult(value: number): number {
  return Math.round(value * 1000) / 1000;
}
