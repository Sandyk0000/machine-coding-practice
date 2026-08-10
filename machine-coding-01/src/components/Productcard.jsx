export default function Productcard({ name, category, price }) {
    return (
        <div className="product-card">
            <img src='https://placehold.co/600x400' alt={name} />
            <h3>{name}</h3>
            <p>{category}</p>
            <b>{price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</b>
        </div>
    )
}