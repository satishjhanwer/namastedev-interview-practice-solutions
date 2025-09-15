import { useState, type JSX } from 'react';

const DEFAULT_LIMIT = 100;

const text = `React is a popular JavaScript library developed by Facebook for
building user interfaces, especially single-page applications. It allows
developers to create reusable UI components that efficiently update and 
render as data changes. One of its core features is the virtual DOM, which
enables fast UI updates by diffing and batching changes.`;

export default function ReadMore(): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const limit = DEFAULT_LIMIT;

  const display = expanded ? text : text.length > limit ? text.slice(0, limit) + '...' : text;

  const toggleExpanded = () => {
    setExpanded((prev: boolean) => !prev);
  };

  return (
    <div className="readmore-container">
      <h1 className="title">Read More Toggle</h1>
      <p className="readmore-text" data-testid="readmore-text">
        {display}
      </p>
      <button className="readmore-button" data-testid="readmore-button" onClick={toggleExpanded}>
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
}
