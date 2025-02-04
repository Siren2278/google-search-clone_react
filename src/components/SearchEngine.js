/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import '../styles/SearchEngine.css';
import Footer from './Footer';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  
  // Google Custom Search API configuration
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = process.env.REACT_APP_SEARCH_ENGINE_ID;
  const BASE_URL = 'https://www.googleapis.com/customsearch/v1';
  
  // Initialize with URL parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlQuery = searchParams.get('q') || '';
    const urlCategory = searchParams.get('category') || 'all';

    if (urlQuery) {
      setQuery(urlQuery);
      setSearchCategory(urlCategory);
      performSearch(urlQuery, urlCategory);
    }
  }, []);

  const extractYouTubeVideoId = (url) => {
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
      /^([^"&?\/\s]{11})$/i
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const transformSearchResults = (items = [], category) => {
    return items
      .map(item => {
        switch (category) {
          case 'images':
            const imageUrl = item.link;
            const thumbnailUrl = item.image?.thumbnailLink;
            if (!imageUrl) return null;
            return {
              id: item.link,
              title: item.title,
              imageUrl: imageUrl,
              thumbnail: thumbnailUrl || imageUrl,
              context: item.image?.contextLink,
              width: item.image?.width,
              height: item.image?.height
            };
  
          case 'videos':
            const videoId = extractYouTubeVideoId(item.link);
            if (!videoId) return null;
            return {
              id: videoId,
              title: item.title,
              videoId: videoId,
              thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              description: item.snippet,
              embedUrl: `https://www.youtube.com/embed/${videoId}`
            };
  
          case 'news':
            return {
              id: item.cacheId || item.link,
              title: item.title,
              link: item.link,
              snippet: item.snippet,
              publishedDate: item.pagemap?.newsarticle?.[0]?.datepublished,
              source: item.pagemap?.metatags?.[0]?.['og:site_name'],
              thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src
            };
  
          default:
            return {
              id: item.cacheId || item.link,
              title: item.title,
              link: item.link,
              snippet: item.snippet,
              thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src
            };
        }
      })
      .filter(Boolean);
  };

  const performSearch = async (searchQuery, category) => {
    setLoading(true);
    setError(null);
    
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      setLoading(false);
      return;
    }
    
    try {
      let searchParams = new URLSearchParams({
        key: API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: searchQuery,
        num: 10 // Number of results
      });

      // specific parameters based on category
      switch (category) {
        case 'images':
          searchParams.append('searchType', 'image');
          searchParams.append('imgSize', 'large');
          break;
        case 'videos':
          searchParams.append('q', `${searchQuery} site:youtube.com`);
          break;
        case 'news':
          searchParams.append('dateRestrict', 'd7');
          searchParams.append('sort', 'date');
          break;
        default:
          break;
      }
      
      const endpoint = `${BASE_URL}?${searchParams.toString()}`;
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Search failed');
      }
      
      const transformedResults = transformSearchResults(data.items, category);
      setResults(transformedResults);
      
    } catch (error) {
      console.error('Search failed:', error);
      setError(error.message || 'Failed to perform search. Please try again later.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Update URL with query and category
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('q', query);
    searchParams.set('category', searchCategory);
    
    // Update browser history
    window.history.pushState(
      {}, 
      '', 
      `${window.location.pathname}?${searchParams.toString()}`
    );

    // Perform the search
    performSearch(query, searchCategory);
  };

  return (
    <div className={`search-engine ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="search-engine__main">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <SearchForm 
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                loading={loading}
                darkMode={darkMode}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
              />

              {error && (
                <div className={`alert alert-danger mt-3 ${darkMode ? 'bg-dark text-light' : ''}`}>
                  {error}
                </div>
              )}
              <SearchResults 
                results={results}
                loading={loading}
                darkMode={darkMode}
                searchCategory={searchCategory}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default SearchEngine;