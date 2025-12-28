import { useState, type JSX } from 'react';
import './styles.css';

export default function LeapYear(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [yearInput, setYearInput] = useState<string>('');

  const isLeapYear = (year: number): boolean => {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  };

  const handleCheck = (): void => {
    const trimmed = yearInput.trim();
    setResult('');
    setError('');

    if (trimmed === '') {
      setError('Please enter a year');
      return;
    }

    if (!/^[-]?\d+$/.test(trimmed)) {
      setError('Please enter a year');
      return;
    }

    const year = parseInt(trimmed, 10);
    const leap = isLeapYear(year);

    setResult(`${year} is ${leap ? 'a Leap Year' : 'not a Leap Year'}`);
  };

  return (
    <div className="leap-year-body">
      <div className="container">
        <h1>Leap Year Checker</h1>

        <label data-testid="label-date">Enter a year:</label>

        <input type="text" value={yearInput} data-testid="year-input" onChange={(e) => setYearInput(e.target.value)} />

        <button data-testid="check-btn" onClick={handleCheck}>
          Check
        </button>

        {result && (
          <div data-testid="result" className="result">
            {result}
          </div>
        )}

        {error && (
          <div data-testid="error-msg" className="error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
