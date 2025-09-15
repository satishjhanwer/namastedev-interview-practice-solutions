import { type JSX, useMemo, useState } from 'react';
import recipesData from './recipesData';

const RATING_OPTIONS = [4.0, 4.3, 4.5, 4.7, 4.9];

const RecipeFilterApp = (): JSX.Element => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(4.0);

  const filtered = useMemo(() => {
    return recipesData.filter((r) => r.rating >= minRating);
  }, [minRating]);

  const averageRating = useMemo(() => {
    if (filtered.length === 0) {
      return 0;
    }
    const sum = filtered.reduce((acc, r) => acc + r.rating, 0);
    return sum / filtered.length;
  }, [filtered]);

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
  };

  return (
    <div className="recipe-app">
      <header className="header">
        <h1>🍽️ Recipe Explorer</h1>

        <div className="controls">
          <label htmlFor="ratingFilter" className="label">
            Filter by Rating:
          </label>
          <select id="ratingFilter" value={minRating} onChange={(e) => setMinRating(parseFloat(e.target.value))} className="select">
            {RATING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt.toFixed(1)}+
              </option>
            ))}
          </select>

          <div className="cart">Cart Items: {cartCount}</div>
          <div className="avg">Average Rating: {averageRating.toFixed(2)}</div>
        </div>
      </header>

      <main className="grid">
        {filtered.map((r) => (
          <article key={r.id} className="card">
            <img src={r.image} alt={r.name} className="thumb" loading="lazy" />
            <div className="content">
              <h3 className="title">{r.name}</h3>
              <p className="meta">
                <span className="badge">{r.cuisine}</span>
                <span className="rating">{r.rating.toFixed(1)}</span>
                <span className="reviews">({r.reviewCount} reviews)</span>
              </p>
              <button className="btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </article>
        ))}

        {filtered.length === 0 && <div className="empty">No recipes found for this rating.</div>}
      </main>
    </div>
  );
};

export default RecipeFilterApp;
