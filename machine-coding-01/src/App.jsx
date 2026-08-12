import Category from "./components/Category";
import Productcard from "./components/Productcard";
import Searchbar from "./components/Searchbar";
import Sortby from "./components/Sortby";
import productsData from "./sample-data.json";
import { useState } from 'react';

export default function App() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Relevance");
    const [wishlisted, setWishlisted] = useState([]);

    const toggleWishlist = (productId) => {
        setWishlisted((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const filteredProducts = productsData
        .filter(
            (product) =>
                (category === "All" || product.category === category) &&
                product.name.toLowerCase().includes(search.toLowerCase().trim())
        )
        .sort((a, b) => {
            if (sortBy === "PriceLowHigh") {
                return a.price - b.price;
            }
            if (sortBy === "PriceHighLow") {
                return b.price - a.price;
            }
            return a.id - b.id;
        });

    return (
        <div>
            <h1>Product Explorer</h1>
            <Searchbar search={search} setSearch={setSearch} />
            <div className="filters-container">
                <Category category={category} setCategory={setCategory} />
                <Sortby sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-results">
                    <h2>No products found</h2>
                    <p>Try adjusting your search or category filter to find what you're looking for.</p>
                </div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <Productcard
                            key={product.id}
                            {...product}
                            isWishlisted={wishlisted.includes(product.id)}
                            onToggleWishlist={toggleWishlist}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
