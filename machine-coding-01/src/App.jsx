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

    return (
        <div>
            <h1>Product Explorer</h1>
            <Searchbar search={search} setSearch={setSearch} />
            <div className="filters-container">
                <Category category={category} setCategory={setCategory} />
                <Sortby sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <div className="product-grid">
                {productsData
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
                    })
                    .map((product) => (
                        <Productcard key={product.id} {...product} />
                    ))}
            </div>
        </div>
    );
}
