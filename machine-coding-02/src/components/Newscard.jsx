export default function Newscard({ title, description, decription, image, url, publishedAt, source }) {
    const articleDescription = description || decription;
    const formattedDate = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : '';

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card"
        >
            <div className="news-image-wrapper">
                <img
                    src={image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80'}
                    alt={title || 'News article'}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80';
                    }}
                />
                {source?.name && <span className="news-source-badge">{source.name}</span>}
            </div>
            <div className="news-content">
                {formattedDate && <span className="news-date">{formattedDate}</span>}
                <h3 className="news-title">{title}</h3>
                {articleDescription && <p className="news-description">{articleDescription}</p>}
                <div className="news-footer">
                    <span className="read-more">
                        Read Story
                        <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>
        </a>
    );
}