import Productcard from "./components/Productcard";
import Searchbar from "./components/Searchbar";
import productsData from "./sample-data.json";
import { useState } from 'react';

export default function App() {
    const [search, setSearch] = useState("");

    return (
        <div>
            <h1>Product Explorer</h1>
            <Searchbar search={search} setSearch={setSearch} />
            <div className="product-grid">
                {productsData
                    .filter((product) =>
                        product.name.toLowerCase().includes(search.toLowerCase().trim())
                    )
                    .map((product) => (
                        <Productcard key={product.id} {...product} />
                    ))}
            </div>
        </div>
    );
}
