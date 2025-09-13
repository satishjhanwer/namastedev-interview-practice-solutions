import { useState } from 'react';

function generateId() {
  return crypto.randomUUID();
}

function ChipsInput() {
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      const inputText = inputValue.trim();
      if (!inputText) return;

      const item = {
        id: generateId(),
        title: inputText,
      };
      setChips((prev) => [...prev, item]);
      setInputValue('');
    }
  };

  const handleDeleteChip = (id) => {
    const filteredChips = chips.filter((chip) => chip.id !== id);
    setChips(filteredChips);
  };

  return (
    <div className="chips-container">
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        className="chips-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleOnKeyDown}
      />
      <div className="chip-list">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            <span>{chip.title}</span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteChip(chip.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChipsInput;
