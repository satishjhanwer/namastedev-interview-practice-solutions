import { type JSX, useState } from 'react';
import './styles.css';

function toZigzag(input: string): string {
  if (!input.trim()) return '';

  return input
    .split(',')
    .map((part, index) => {
      const trimmed = part.trim();
      return index % 2 === 1 ? trimmed.split('').reverse().join('') : trimmed;
    })
    .join('');
}

export default function ArrayToZigzagStringConverter(): JSX.Element {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleSubmit = (): void => {
    setOutput(toZigzag(input));
  };

  return (
    <div className="array-to-zigzag-converter-body-container">
      <h1>Array To Zigzag String Converter</h1>
      <input
        type="text"
        placeholder="Enter strings like one,two,three"
        data-testid="input-box"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button data-testid="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <p data-testid="output-result">Output: {output}</p>
    </div>
  );
}
