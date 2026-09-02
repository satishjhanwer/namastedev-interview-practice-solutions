import { type JSX, useState } from 'react';
import './styles.css';

function isValidUrl(value: string): boolean {
  if (!value) return false;
  if (/\s/.test(value)) return false;
  if (!/^https?:\/\//.test(value)) return false;

  try {
    const url = new URL(value);
    const hostname = url.hostname;
    return hostname === 'localhost' || hostname.includes('.');
  } catch {
    return false;
  }
}

export default function UrlValidator(): JSX.Element {
  const [value, setValue] = useState<string>('');

  const valid = isValidUrl(value);

  return (
    <div className="url-validator-body-container">
      <h1>URL Validator</h1>
      <input data-testid="url-input" type="text" placeholder="Enter a URL..." value={value} onChange={(e) => setValue(e.target.value)} />
      <div data-testid="result" className={valid ? 'url-validator-valid' : 'url-validator-invalid'}>
        {valid ? 'Valid URL' : 'Invalid URL'}
      </div>
    </div>
  );
}
