import { type JSX, useState } from 'react';
import './styles.css';

function toAcronym(text: string): string {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function AcronymGenerator(): JSX.Element {
  const [phrase, setPhrase] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleGenerate = (): void => {
    setResult(toAcronym(phrase));
  };

  return (
    <div className="acronym-generator-body-container">
      <h1>Acronym Generator</h1>
      <p>An acronym is formed by taking the first letter of each word in a phrase and converting them to uppercase.</p>

      <div className="acronym-generator-controls">
        <input
          data-testid="input"
          type="text"
          placeholder="Enter a phrase..."
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <button data-testid="generate-button" onClick={handleGenerate}>
          Generate
        </button>
        <p data-testid="result">Result : {result}</p>
      </div>
    </div>
  );
}
