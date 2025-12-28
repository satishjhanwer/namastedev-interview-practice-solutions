import { useState, useRef, useEffect, type JSX, ChangeEvent } from 'react';
import './styles.css';

export default function EvenOrOddChecker(): JSX.Element {
  const timeoutRef = useRef<number | null>(null);
  const [value, setValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCheck = (): void => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setResult('');
    setLoading(true);

    const trimmedValue = value.trim();

    timeoutRef.current = window.setTimeout(() => {
      if (trimmedValue === '' || Number.isNaN(Number(trimmedValue))) {
        setResult('Please enter a valid number.');
        setLoading(false);
        return;
      }

      const num = Number(trimmedValue);

      if (!Number.isFinite(num)) {
        setResult('Please enter a valid number.');
        setLoading(false);
        return;
      }

      const isEven = num % 2 === 0;
      setResult(`The number ${trimmedValue} is ${isEven ? 'even' : 'odd'}.`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="even-odd-body-container">
      <div className="even-odd-container">
        <h1 className="title">Even or Odd Checker</h1>

        <input
          type="text"
          value={value}
          className="number-input"
          data-testid="number-input"
          placeholder="Enter a number"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />

        <button onClick={handleCheck} className="check-button" data-testid="check-button">
          Check
        </button>

        <div className="result-area">
          {loading && (
            <div data-testid="loading" className="loading">
              Checking...
            </div>
          )}

          {!loading && result && (
            <div data-testid="result" className="result">
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
