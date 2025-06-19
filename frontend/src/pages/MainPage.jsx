import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Filter, X, Loader2, Eye, EyeOff, Zap, ArrowRight, Brain, Image as ImageIcon } from 'lucide-react';
import SearchResults from '../components/SearchResults';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [selectedMediaType, setSelectedMediaType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [bestMatchImages, setBestMatchImages] = useState([]);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [imagePlaceholders, setImagePlaceholders] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const mediaTypes = [
    'Mythology', 'Video Games', 'Movies', 'Television Shows', 
    'Novels', 'Manga', 'Magazines', 'Anime', 'Blogs', 'Plays',
    'Board Games', 'Graphic Novels', 'Biographies', 'Comic Books',
    'Scientific Papers', 'Documentaries', 'Online Articles', 
    'Newspapers', 'Urban Legends', 'Short Stories'
  ];

  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

  const FALLBACK_IMAGE = 'https://via.placeholder.com/300x300?text=Character+Image';

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVisible(true);
  }, []);

  // Preload image function to check if image can be loaded
  const preloadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ url, success: true });
      img.onerror = () => resolve({ url, success: false });
      img.src = url;
      
      // Set a timeout to avoid hanging on slow-loading images
      setTimeout(() => resolve({ url, success: false }), 5000);
    });
  };

  const fetchBestMatchImages = async (character) => {
    if (!showImageSearch) {
      setImagePlaceholders([]);
      return;
    }
    
    try {
      const searchQuery = `${character.character_name} from ${character.genre}`;
      let candidateImages = [];

      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(searchQuery)}&searchType=image&num=8&safe=active&imgSize=large&imgType=photo`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            candidateImages = data.items.map((item, index) => ({
              url: item.link,
              thumbnail: item.link,
              title: item.title || `${character.character_name} - Image ${index + 1}`,
              source: item.image?.contextLink || `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`
            }));
          }
        }
      } catch (apiError) {
        console.log('Google Custom Search API failed:', apiError);
      }

      // Preload all candidate images to check which ones work
      let validImages = [];
      if (candidateImages.length > 0) {
        const preloadPromises = candidateImages.map(img => preloadImage(img.url));
        const preloadResults = await Promise.all(preloadPromises);
        
        // Filter out failed images and keep only successful ones
        validImages = candidateImages.filter((img, index) => {
          const preloadResult = preloadResults[index];
          return preloadResult.success;
        });
        
        // Take only the first 4 valid images
        validImages = validImages.slice(0, 4);
      }

      // If we don't have enough valid images, use fallback
      while (validImages.length < 4) {
        validImages.push({
          url: FALLBACK_IMAGE,
          thumbnail: FALLBACK_IMAGE,
          title: `${character.character_name} - Default Image`,
          source: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`
        });
      }

      setBestMatchImages(validImages);
    } catch (err) {
      console.error('Error fetching images:', err);
      setBestMatchImages([
        {
          url: FALLBACK_IMAGE,
          thumbnail: FALLBACK_IMAGE,
          title: `${character.character_name} - Default Image`,
          source: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`
        },
        {
          url: FALLBACK_IMAGE,
          thumbnail: FALLBACK_IMAGE,
          title: `${character.character_name} - Default Image`,
          source: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`
        },
        {
          url: FALLBACK_IMAGE,
          thumbnail: FALLBACK_IMAGE,
          title: `${character.character_name} - Default Image`,
          source: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`
        },
        {
          url: FALLBACK_IMAGE,
          thumbnail: FALLBACK_IMAGE,
          title: `${character.character_name} - Default Image`,
          source: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`
        }
      ]);
    } finally {
      setImagePlaceholders([]);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a character description');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);
    setResults([]); // Clear previous results immediately
    setBestMatchImages([]);
    if (showImageSearch) {
      setImagePlaceholders([1, 2, 3, 4]); // Initialize 4 placeholders for images
    }

    try {
      const requestBody = {
        query: query.trim(),
        ...(selectedMediaType && { media_type: selectedMediaType })
      };

      const response = await fetch('http://localhost:8000/character_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No matching characters found. Try a different description or remove filters.');
        }
        throw new Error('Search failed. Please try again.');
      }

      const data = await response.json();
      setResults(data);
      
      if (data.length > 0 && showImageSearch) {
        fetchBestMatchImages(data[0]);
      } else {
        setImagePlaceholders([]);
      }
    } catch (err) {
      setError(err.message);
      setResults([]);
      setImagePlaceholders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilter = () => {
    setSelectedMediaType('');
    setShowFilters(false);
  };

  const handleImageSearchToggle = () => {
    setShowImageSearch(!showImageSearch);
    if (!showImageSearch && results.length > 0) {
      setImagePlaceholders([1, 2, 3, 4]);
      fetchBestMatchImages(results[0]);
    } else if (showImageSearch) {
      setBestMatchImages([]);
      setImagePlaceholders([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-400/10 via-transparent to-transparent"></div>
        
        {/* Animated floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-400/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Logo with enhanced styling */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-xl border-2 border-blue-300 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <Zap className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                CharacterKB
              </h1>
            </div>
          </div>

          {/* Enhanced value proposition */}
          <div className="max-w-4xl mx-auto mb-8">
            {/* <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-6 leading-tight">
              AI-Powered Character Discovery & Chat
              <span className="inline-block ml-2">
                <Brain className="h-8 w-8 text-purple-500 animate-pulse" />
              </span>
            </h2> */}
            
            {/* Enhanced info card */}
            <div className="bg-gradient-to-r from-purple-100/80 to-pink-100/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
                <p className="text-purple-700 font-bold text-lg">
                  Discover characters with natural language, then chat with them!
                </p>
                <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
              </div>
              <p className="text-purple-600 text-sm">
                Ask life questions and get advice in their unique, fictional style! 🤖
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            {/* Glow effect behind search card */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-xl border-2 border-blue-300 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300">
              {/* Search Input with enhanced styling */}
              <div className="relative mb-8 group">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
                  <Search className="h-6 w-6 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe any character... e.g., 'a cowardly character that goes on adventures with his grandpa'"
                  className="w-full pl-16 pr-6 py-6 bg-gradient-to-r from-slate-50 to-blue-50/50 border-2 border-slate-200 hover:border-blue-300 rounded-2xl text-slate-800 text-lg placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-inner"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Enhanced Filter Controls */}
              <div className="flex flex-wrap items-center gap-5 mb-10">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border-2 border-slate-200 hover:border-slate-400 rounded-2xl text-slate-700 font-semibold transition-all duration-300 hover:scale-100 shadow-lg"
              >
                <Filter className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Filter Media
                {selectedMediaType && (
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-200">
                    {selectedMediaType}
                  </span>
                )}
              </button>

                <button
                onClick={handleImageSearchToggle}
                className={`group flex items-center gap-3 px-8 py-4 border-2 rounded-2xl font-semibold transition-all duration-300 hover:scale-100 shadow-lg ${
                  showImageSearch 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 border-green-300 hover:border-green-400 text-green-700' 
                    : 'bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border-slate-200 hover:border-slate-400 text-slate-700'
                }`}
              >
                {showImageSearch ? (
                  <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <EyeOff className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                )}
                Relevant Image Search
              </button>

                {selectedMediaType && (
                <button
                  onClick={clearFilter}
                  className="group flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200 border-2 border-red-200 hover:border-red-400 rounded-2xl text-red-700 font-semibold transition-all duration-300 hover:scale-100 shadow-lg"
                >
                  <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  Clear Filter
                </button>
                )}
              </div>

              {/* Enhanced Filter Grid */}
              {showFilters && (
                <div className="mb-8 p-8 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-2xl border-2 border-slate-200 backdrop-blur-sm">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {mediaTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedMediaType(selectedMediaType === type ? '' : type);
                          setShowFilters(false);
                        }}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${
                          selectedMediaType === type
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-2 border-blue-400 shadow-xl'
                            : 'bg-white/90 text-slate-600 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Search Button */}
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="group w-full py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:scale-100 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Discovering Characters...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
                    <span>Find Character</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Error Section */}
        {error && (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-2xl p-8 text-center shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-2">
                <X className="h-6 w-6 text-red-600" />
                <p className="text-red-700 font-bold text-lg">Search Error</p>
              </div>
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </div>
        )}

        {/* Results Section - Now properly passes isLoading prop */}
        {hasSearched && (
          <SearchResults
            results={results}
            bestMatchImages={bestMatchImages}
            imagePlaceholders={imagePlaceholders}
            showImageSearch={showImageSearch}
            onImageSearchToggle={handleImageSearchToggle}
            isLoading={loading} // Fixed: Now properly passing the loading state
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;