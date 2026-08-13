import { useState, useEffect } from 'react';
import Newscard from './components/Newscard';
import Searchbar from './components/SearchBar';

export default function App() {

  const categoryList = ['General',
    'Business',
    'Technology',
    'Sports',
    'Entertainment',
    'Science',
    'Health']

  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const PAGE_SIZE = 9;

  /* =========================================================================
   * APPROACH 1: Debounced Search (Active)
   * Automatically triggers API call 1000ms after user stops typing
   * ========================================================================= */
  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
    async function fetchArticleData() {
      setLoading(true);
      setError(null);
      try {
        const url = debouncedSearch.trim() !== ""
          ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(debouncedSearch.trim())}&lang=en&country=us&max=${PAGE_SIZE}&page=${page}&apikey=${apiKey}`
          : `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=${PAGE_SIZE}&page=${page}&apikey=${apiKey}`;

        const response = await fetch(url, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const articleData = await response.json();
        setArticles(articleData.articles || []);
        setTotalArticles(articleData.totalArticles || 0);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        console.error('Error fetching news:', err);
        setError('Unable to fetch live news (API limit reached or network error).');
      } finally {
        setLoading(false);
      }
    }
    fetchArticleData();
    return () => {
      controller.abort();
    };
  }, [category, page, debouncedSearch]);

  /* =========================================================================
   * APPROACH 2: Button-Click Search (Older Implementation Reference)
   * Un-comment to use button-click search instead of debounced live search:
   *
   * const [query, setQuery] = useState("");
   *
   * const handleSearchClick = () => {
   *   setQuery(search);
   *   setPage(1);
   * };
   *
   * useEffect(() => {
   *   const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
   *   async function fetchArticleData() {
   *     setLoading(true);
   *     setError(null);
   *     try {
   *       const url = query.trim() !== ""
   *         ? `https://gnews.io/api/v4/search?q=${encodeURIComponent(query.trim())}&lang=en&country=us&max=${PAGE_SIZE}&page=${page}&apikey=${apiKey}`
   *         : `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=${PAGE_SIZE}&page=${page}&apikey=${apiKey}`;
   *       const response = await fetch(url);
   *       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
   *       const articleData = await response.json();
   *       setArticles(articleData.articles || []);
   *       setTotalArticles(articleData.totalArticles || 0);
   *     } catch (err) {
   *       setError('Unable to fetch live news.');
   *     } finally {
   *       setLoading(false);
   *     }
   *   }
   *   fetchArticleData();
   * }, [category, page, query]);
   * ========================================================================= */

  const totalPages = Math.ceil(totalArticles / PAGE_SIZE);

  return (
    <div className="app-container">
      <header className="app-header">
        <span className="badge">LIVE FEED</span>
        <h1>Top Headlines</h1>
        <p className="app-subtitle">Discover trending stories and breaking updates from around the globe</p>
      </header>

      <Searchbar search={search} setSearch={setSearch} onSearchClick={() => { }} />

      <div className="categories-container">
        {categoryList.map((item) => {
          const value = item.toLowerCase();
          const isActive = category === value && debouncedSearch.trim() === "";
          return (
            <button
              key={item}
              className={`category-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setCategory(value);
                setSearch("");
                setDebouncedSearch("");
                setPage(1);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="news-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="news-card shimmer-card">
              <div className="news-image-wrapper shimmer"></div>
              <div className="news-content">
                <div className="shimmer-line shimmer-date"></div>
                <div className="shimmer-line shimmer-title"></div>
                <div className="shimmer-line shimmer-title short"></div>
                <div className="shimmer-line shimmer-text"></div>
                <div className="shimmer-line shimmer-text"></div>
                <div className="shimmer-line shimmer-text short"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && articles.length === 0 && (
        <div className="status-container error-box">
          <p>{error}</p>
        </div>
      )}

      {!loading && articles.length > 0 && (
        <div className="news-grid">
          {articles.map((article, index) => (
            <Newscard key={article.url || index} {...article} />
          ))}
        </div>
      )}

      <div className="pagination-container">
        <button
          className="page-btn"
          disabled={page <= 1 || loading}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          &larr; Previous
        </button>
        <span className="page-number">Page {page} {totalPages > 0 ? `of ${totalPages}` : ''}</span>
        <button
          className="page-btn"
          disabled={articles.length < PAGE_SIZE || (totalPages > 0 && page >= totalPages) || loading}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}