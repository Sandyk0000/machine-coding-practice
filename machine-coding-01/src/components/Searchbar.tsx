export default function Searchbar({ search, setSearch }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="button">Search</button>
        </div>
    );
}