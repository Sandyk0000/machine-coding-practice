export default function Sortby({ sortBy, setSortBy }) {
    return (
        <>
            <label htmlFor='sortBy'>Sort By: </label>
            <select
                id='sortBy'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="Relevance">Relevance</option>
                <option value="PriceLowHigh">Price: Low to High</option>
                <option value="PriceHighLow">Price: High to Low</option>
            </select>
        </>
    );
}