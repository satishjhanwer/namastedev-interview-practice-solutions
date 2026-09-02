import { type JSX } from 'react';
import './styles.css';

export default function HolyGrail(): JSX.Element {
  return (
    <div className="holy-grail-body-container">
      <header>Header</header>
      <div className="columns">
        <nav>Navigation</nav>
        <main>Main</main>
        <aside>Sidebar</aside>
      </div>
      <footer>Footer</footer>
    </div>
  );
}
