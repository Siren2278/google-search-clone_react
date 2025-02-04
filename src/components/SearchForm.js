import React from 'react';
import '../styles/SearchForm.css';

const SearchForm = ({ 
  query, 
  setQuery, 
  handleSearch, 
  darkMode,
  searchCategory,
  setSearchCategory 
}) => {
  const handleCategoryClick = (category, e) => {
    e.preventDefault();
    
    // Update URL with new category
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('category', category);
    
    // If there's a query, update URL and trigger search
    if (query) {
      searchParams.set('q', query);
      window.history.pushState(
        {}, 
        '', 
        `${window.location.pathname}?${searchParams.toString()}`
      );
      handleSearch(e);
    } else {
      // Just update URL if no query
      window.history.pushState(
        {}, 
        '', 
        `${window.location.pathname}?${searchParams.toString()}`
      );
    }
    
    setSearchCategory(category);
  };

  return (
    <div className={`search-card ${darkMode ? 'dark-mode' : ''}`}>
      <div className="search-card__body">
        <form onSubmit={handleSearch}>
          <div className="search-input-group">
            <span className="search-input-group__icon">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your search query..."
            />
          </div>

          <ul className="search-categories">
            <li className="search-categories__item">
              <a 
                className={`search-categories__link ${searchCategory === 'all' ? 'active' : ''}`}
                href="#all"
                onClick={(e) => handleCategoryClick('all', e)}
              >
                <i className="fas fa-globe"></i>All
              </a>
            </li>
            <li className="search-categories__item">
              <a 
                className={`search-categories__link ${searchCategory === 'images' ? 'active' : ''}`}
                href="#images"
                onClick={(e) => handleCategoryClick('images', e)}
              >
                <i className="fas fa-image"></i>Images
              </a>
            </li>
            <li className="search-categories__item">
              <a 
                className={`search-categories__link ${searchCategory === 'videos' ? 'active' : ''}`}
                href="#videos"
                onClick={(e) => handleCategoryClick('videos', e)}
              >
                <i className="fas fa-video"></i>Videos
              </a>
            </li>
            <li className="search-categories__item">
              <a 
                className={`search-categories__link ${searchCategory === 'news' ? 'active' : ''}`}
                href="#news"
                onClick={(e) => handleCategoryClick('news', e)}
              >
                <i className="fas fa-newspaper"></i>News
              </a>
            </li>
          </ul>

          <div className="search-buttons">
            <button type="submit" className="btn btn-search">
              Search
            </button>
            <button type="button" className="btn btn-lucky">
              I'm Feeling Lucky
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;