import { React, useState } from 'react';
import '../styles/SearchResults.css';

const SearchResults = ({ results, loading, darkMode, searchCategory }) => {
  const [failedImages, setFailedImages] = useState(new Set());
  const [failedVideos, setFailedVideos] = useState(new Set());

  const handleImageError = (resultId) => {
    setFailedImages(prev => new Set([...prev, resultId]));
  };

  const handleVideoThumbnailError = (resultId) => {
    setFailedVideos(prev => new Set([...prev, resultId]));
  };

  const handleImageClick = (result) => {
    // Directly open image in new tab without validation
    if (result.imageUrl) {
      const newWindow = window.open(result.imageUrl, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  };

  const handleVideoClick = (result) => {
    // Directly open video in new tab
    if (result.videoId) {
      const newWindow = window.open(`https://www.youtube.com/watch?v=${result.videoId}`, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    }
  };

  const renderImageResult = (result, index) => {
    if (failedImages.has(result.id)) return null;

    return (
      <div 
        key={index}
        className={`result-card result-card--image ${darkMode ? 'dark-mode' : ''}`}
        onClick={() => handleImageClick(result)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleImageClick(result)}
        aria-label={`View ${result.title}`}
      >
        <div className="result-card__image-wrapper">
          <img 
            src={result.thumbnail || result.imageUrl}
            alt={result.title}
            className="result-card__image"
            onError={() => handleImageError(result.id)}
            loading="lazy"
          />
          <div className="result-card__overlay">
            <button className="result-card__view-text">View Full Image</button>
          </div>
        </div>
        <div className="result-card__content">
          <h3 className="result-card__title">{result.title}</h3>
          {result.context && (
            <p className="result-card__source">
              {result.context}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderVideoResult = (result, index) => {
    if (failedVideos.has(result.id)) return null;

    return (
      <div 
        key={index}
        className={`result-card result-card--video ${darkMode ? 'dark-mode' : ''}`}
        onClick={() => handleVideoClick(result)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && handleVideoClick(result)}
        aria-label={`Play ${result.title}`}
      >
        <div className="result-card__video-wrapper">
          <img 
            src={result.thumbnail}
            alt={result.title}
            className="result-card__video-thumbnail"
            onError={() => handleVideoThumbnailError(result.id)}
            loading="lazy"
          />
          <div className="result-card__play-overlay">
            <button className="result-card__play-button">
              <i className="fas fa-play"></i>
              <span>Play on YouTube</span>
            </button>
          </div>
        </div>
        <div className="result-card__content">
          <h3 className="result-card__title">{result.title}</h3>
          <p className="result-card__description">{result.description}</p>
          <div className="result-card__meta">
            <span className="result-card__source">
              <i className="fab fa-youtube"></i> YouTube
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderNewsResult = (result, index) => (
    <article 
      key={index}
      className={`result-card result-card--news ${darkMode ? 'dark-mode' : ''}`}
      onClick={() => result.link && window.open(result.link, '_blank', 'noopener,noreferrer')}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && result.link && window.open(result.link, '_blank', 'noopener,noreferrer')}
    >
      <div className="result-card__content">
        {result.imageUrl && (
          <div className="result-card__news-image">
            <img 
              src={result.imageUrl}
              alt={result.title}
              className="result-card__thumbnail"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
              loading="lazy"
            />
          </div>
        )}
        <div className="result-card__news-text">
          <h3 className="result-card__title">{result.title}</h3>
          <p className="result-card__description">{result.description || result.snippet}</p>
          <div className="result-card__meta">
            {result.source && (
              <span className="result-card__source">{result.source}</span>
            )}
            {result.publishedDate && (
              <span className="result-card__date">
                {new Date(result.publishedDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );

  const renderDefaultResult = (result, index) => (
    <div 
      key={index}
      className={`result-card result-card--default ${darkMode ? 'dark-mode' : ''}`}
      onClick={() => result.link && window.open(result.link, '_blank', 'noopener,noreferrer')}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && result.link && window.open(result.link, '_blank', 'noopener,noreferrer')}
    >
      <div className="result-card__content">
        <h3 className="result-card__title">{result.title}</h3>
        <p className="result-card__url">{result.link}</p>
        <p className="result-card__description">{result.description || result.snippet}</p>
      </div>
    </div>
  );

  const renderResults = () => {
    if (loading) {
      return (
        <div className="search-loader">
          <div className="search-loader__spinner" />
        </div>
      );
    }

    const validResults = results.filter(result => {
      if (searchCategory === 'images') {
        return !failedImages.has(result.id);
      }
      if (searchCategory === 'videos') {
        return !failedVideos.has(result.id);
      }
      return true;
    });

    if (validResults.length === 0) {
      return (
        <div className="no-results">
          <i className="fas fa-search no-results__icon"></i>
          <p className="no-results__text">No results found. Try different keywords.</p>
        </div>
      );
    }

    return validResults.map((result, index) => {
      switch (searchCategory) {
        case 'images':
          return renderImageResult(result, index);
        case 'videos':
          return renderVideoResult(result, index);
        case 'news':
          return renderNewsResult(result, index);
        default:
          return renderDefaultResult(result, index);
      }
    });
  };

  return (
    <div className={`search-results search-results--${searchCategory}`}>
      {renderResults()}
    </div>
  );
};

export default SearchResults;