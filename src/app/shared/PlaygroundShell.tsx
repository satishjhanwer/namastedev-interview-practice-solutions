import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BASE_CSS from './playground-base.css?raw';

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
