import { type JSX, useRef } from 'react';
import './styles.css';

export default function InputFocus(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = (): void => {
    inputRef.current?.focus();
  };

  return (
    <div className="focus-input-body-container">
      <input ref={inputRef} type="text" placeholder="Type here" className="focus-input-field" />
      <button onClick={handleFocus} className="focus-input-button">
        Focus Input
      </button>
    </div>
  );
}
