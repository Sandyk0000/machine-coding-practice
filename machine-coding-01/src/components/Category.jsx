import productsData from "../sample-data.json";

export default function Category({ category, setCategory }) {
    const set = new Set();
    productsData.forEach((product) => set.add(product.category))
    let categories = []
    for (const item of set) {
        categories.push(item)
    }
    return (
        <>
            <label htmlFor='categories'>Choose Category</label>
            <select id='categories'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option key='All' value="All">All</option>
                {categories.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </>
    )
}