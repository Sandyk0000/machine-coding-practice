export default function Productcard({ id, name, category, price, isWishlisted, onToggleWishlist }) {
    return (
        <div className="product-card">
            <img src='https://placehold.co/600x400' alt={name} />
            <div className="product-card-header">
                <h3>{name}</h3>
                <button
                    className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => onToggleWishlist(id)}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-label="Toggle wishlist"
                >
                    {isWishlisted ? '❤️' : '🤍'}
                </button>
            </div>
            <p>{category}</p>
            <b>{price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</b>
        </div>
    );
}