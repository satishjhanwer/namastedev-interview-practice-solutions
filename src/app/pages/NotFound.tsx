import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>404 - Not found</h2>
      <p>Try going back to the home page.</p>
      <Link className="btn" to="/">
        ← Home
      </Link>
    </div>
  );
}
