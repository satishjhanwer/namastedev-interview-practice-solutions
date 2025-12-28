import { type JSX, useState } from 'react';
import './styles.css';

export default function ProgressBar(): JSX.Element {
  const [progress, setProgress] = useState<number>(0);

  const clamp = (value: number): number => Math.min(100, Math.max(0, value));

  const handleIncrement = (): void => {
    setProgress((prev) => clamp(prev + 10));
  };

  const handleDecrement = (): void => {
    setProgress((prev) => clamp(prev - 10));
  };

  const getBarColor = (): string => {
    if (progress < 40) return 'red';
    if (progress < 80) return 'orange';
    return 'green';
  };

  return (
    <div className="progress-wrapper">
      <h2>Progress Bar</h2>

      <div className="progress-container">
        <div
          id="testBgColor"
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: getBarColor(),
          }}
        >
          {`${progress}%`}
        </div>
      </div>

      <div className="controls">
        <button onClick={handleDecrement}>-10%</button>
        <button onClick={handleIncrement}>+10%</button>
      </div>
    </div>
  );
}
