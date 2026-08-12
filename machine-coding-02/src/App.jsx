import { useState, useEffect } from 'react';
import Newscard from './components/Newscard';

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=2de8bd8147b500f6571735a444e98e3f`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setError('Unable to fetch live news (API limit reached or network error).');
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <span className="badge">LIVE FEED</span>
        <h1>Top Headlines</h1>
        <p className="app-subtitle">Discover trending stories and breaking updates from around the globe</p>
      </header>

      {loading && (
        <div className="status-container">
          <div className="spinner"></div>
          <p>Loading news stories...</p>
        </div>
      )}

      {error && articles.length === 0 && (
        <div className="status-container error-box">
          <p>{error}</p>
        </div>
      )}

      {!loading && (
        <div className="news-grid">
          {articles.map((article, index) => (
            <Newscard key={article.url || index} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}