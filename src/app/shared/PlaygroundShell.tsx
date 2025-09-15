import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const BASE_CSS = `
:host { color-scheme: light; }
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; }
.pg {
  padding: 16px;
  color: #0f172a;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
}
`;

export default function PlaygroundShell({ children, css }: PropsWithChildren<{ css?: string }>) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shadow, setShadow] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    setShadow(root);
  }, []);

  return (
    <div>
      <div ref={hostRef} />
      {shadow &&
        createPortal(
          <>
            <style>{BASE_CSS}</style>
            {css ? <style>{css}</style> : null}
            <div className="pg">{children}</div>
          </>,
          shadow as unknown as Element,
        )}
    </div>
  );
}
