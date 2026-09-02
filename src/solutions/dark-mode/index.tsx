import { type JSX, useState } from 'react';
import './styles.css';

export default function DarkModeToggle(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`dark-mode-body-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Dark Mode Toggle</h1>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <span className="mode-text">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    </div>
  );
}
