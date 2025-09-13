import React, { useState, useMemo } from "react";
import { colorNameToHex } from "./colorData";
import "./styles.css";

function normalizeKey(s) {
  const collapsed = s.trim().replace(/\s+/g, " ");
  return collapsed.replace(/\s/g, "").toLowerCase();
}

function toFullHex(hex) {
  let h = hex.startsWith("#") ? hex.slice(1) : hex;
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return "#000000";
  return `#${h.toLowerCase()}`;
}

function prettifyName(key) {
  const prefixes = ["light", "dark", "medium"];
  for (const p of prefixes) {
    if (key.startsWith(p) && key.length > p.length) {
      return cap(p) + " " + cap(key.slice(p.length));
    }
  }
  return key;
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

const ColorExplorer = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null); // { name, hex }
  const [error, setError] = useState("");

  const normalized = useMemo(() => normalizeKey(input), [input]);

  function handleSearch() {
    if (!normalized) {
      setResult(null);
      setError("Please enter a color name.");
      return;
    }

    const hex = colorNameToHex(normalized);
    if (hex) {
      setResult({ name: prettifyName(normalized), hex: toFullHex(hex) });
      setError("");
    } else {
      setResult(null);
      setError("Sorry, I couldn't recognize that color.");
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="container">
      <h1>Color Explorer</h1>

      <div className="input-section">
        <input
          type="text"
          aria-label="Color name"
          data-testid="color-input"
          placeholder="Type a color name e.g. lavender"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button
          type="button"
          data-testid="search-button"
          onClick={handleSearch}
          aria-label="Search color"
        >
          🔍
        </button>
      </div>

      <div role="status" aria-live="polite" className="error-region">
        {error && (
          <p data-testid="error-msg" className="error">
            {error}
          </p>
        )}
      </div>

      {result && (
        <div className="color-box" data-testid="color-box">
          <div
            className="preview"
            data-testid="color-preview"
            aria-label={`Color preview for ${result.name}`}
            style={{ background: result.hex }}
          />
          <p data-testid="color-name">
            <strong>Name:</strong> {result.name}
          </p>
          <p data-testid="color-hex" aria-label="Hex code">
            <strong>Hex:</strong> {result.hex}
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorExplorer;