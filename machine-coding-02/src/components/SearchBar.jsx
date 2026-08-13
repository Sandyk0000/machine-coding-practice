export default function Searchbar({ search, setSearch, onSearchClick }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearchClick();
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for news, topics, or keywords..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button
                        type="button"
                        className="clear-search-btn"
                        onClick={() => setSearch("")}
                        title="Clear search"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    );
}