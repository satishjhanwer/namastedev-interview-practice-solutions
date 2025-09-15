import { useCallback, useMemo, useRef, useState } from 'react';

type Chip = { id: string; title: string };

const norm = (s: string): string => {
  return s.trim().replace(/\s+/g, ' ');
};

const generateId = (): string => {
  return crypto.randomUUID();
};

const DEFAULT_DATA: Chip[] = [
  { id: generateId(), title: 'react' },
  { id: generateId(), title: 'frontend' },
];

export default function ChipInputDemo() {
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chips, setChips] = useState<Chip[]>(DEFAULT_DATA);

  const existing = useMemo(() => new Set(chips.map((c) => c.title.toLowerCase())), [chips]);

  const addChip = useCallback(
    (raw: string) => {
      const label = norm(raw);
      if (!label) return;
      if (existing.has(label.toLowerCase())) return;
      setChips((xs) => [...xs, { id: generateId(), title: label }]);
    },
    [existing],
  );

  const removeChip = (id: string) => {
    setChips((xs) => xs.filter((c) => c.id !== id));
    inputRef.current?.focus();
  };

  const commitFromValue = () => {
    if (!value.trim()) return;
    addChip(value);
    setValue('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      e.preventDefault();
      commitFromValue();
    } else if (e.key === 'Backspace' && value === '' && chips.length) {
      setChips((xs) => xs.slice(0, -1));
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const t = e.clipboardData.getData('text');
    if (!t) return;
    e.preventDefault();
    t.split(/[,\n]/).forEach(addChip);
  };

  return (
    <div className="chips-container">
      <label htmlFor="chip-input" style={{ display: 'block', marginBottom: 8 }}>
        Chips Input (press Enter/Comma to add):
      </label>

      <div className="ci-wrap" role="group" aria-label="Chip input" onClick={() => inputRef.current?.focus()}>
        {chips.map((c) => (
          <span key={c.id} className="chip" data-testid="chipinput-chip">
            {c.title}
            <button
              type="button"
              className="delete-btn"
              data-testid="chipinput-remove"
              aria-label={`Remove ${c.title}`}
              onClick={() => removeChip(c.id)}
            >
              x
            </button>
          </span>
        ))}

        <input
          value={value}
          ref={inputRef}
          id="chip-input"
          onPaste={onPaste}
          onKeyDown={onKeyDown}
          className="chips-input"
          data-testid="chipinput-input"
          placeholder="Type and press Enter…"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <p style={{ color: '#9fb0c5', marginTop: 10 }}>
        <strong>{chips.length}</strong> chip{chips.length === 1 ? '' : 's'}: {chips.map((c) => c.title).join(', ') || '—'}
      </p>
    </div>
  );
}
