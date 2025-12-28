import { useState, type JSX } from "react";

export default function CounterUsingReact(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = (): void => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = (): void => {
    setCount((prev) => prev - 1);
  };

  const handleReset = (): void => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h1>React Counter App</h1>
      <h2>Counter: {count}</h2>

      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};