import React, { useState } from 'react';
import { Search, Sparkles, Camera, Eye, EyeOff, Loader2, ExternalLink, MessageCircle, Zap, Brain, X } from 'lucide-react';
import CharacterChatModal from './CharacterChatModal';

const SearchResults = ({ 
  results, 
  bestMatchImages, 
  imagePlaceholders, 
  showImageSearch, 
  onImageSearchToggle,
  isLoading = false
}) => {
  const [selectedCharacterForChat, setSelectedCharacterForChat] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [characterInsights, setCharacterInsights] = useState({});
  const [loadingInsights, setLoadingInsights] = useState({});
  const [showInsights, setShowInsights] = useState({}); // New state to control visibility

  const getOnlineSearchResults = (character) => {
    const searchQuery = `"${character.character_name}" from ${character.genre} (${character.media_type})`;
    return [
      {
        title: `Images`,
        url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`,
        description: `Visual references`,
        icon: '🖼️'
      },
      {
        title: `Videos`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
        description: `Video content`,
        icon: '🎬'
      },
      {
        title: `Google Search`,
        url: `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
        description: `General search results`,
        icon: '🔍'
      },
      {
        title: `Wikipedia`,
        url: `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(character.character_name)}`,
        description: `Encyclopedia information`,
        icon: '📚'
      }
    ];
  };

  const formatResult = (character, index) => {
    if (index === 0) {
      return `Your character is most likely "${character.character_name}" from ${character.genre}`;
    } else {
      return `"${character.character_name}" from ${character.genre}`;
    }
  };

  const handleChatWithCharacter = (character) => {
    setSelectedCharacterForChat(character);
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedCharacterForChat(null);
  };

  const handleGetCharacterInsights = async (character, index) => {
    const characterKey = `${character.character_name}_${index}`;
    
    // If insights already exist, just toggle visibility
    if (characterInsights[characterKey]) {
      setShowInsights(prev => ({
        ...prev,
        [characterKey]: !prev[characterKey]
      }));
      return;
    }

    // Otherwise, fetch insights
    setLoadingInsights(prev => ({ ...prev, [characterKey]: true }));
    
    try {
      const response = await fetch('http://localhost:8000/character_insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character_name: character.character_name,
          character_description: character.description
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get character insights');
      }

      const data = await response.json();
      
      setCharacterInsights(prev => ({
        ...prev,
        [characterKey]: data.response
      }));

      // Show insights after fetching
      setShowInsights(prev => ({
        ...prev,
        [characterKey]: true
      }));
      
    } catch (error) {
      console.error('Error fetching character insights:', error);
      setCharacterInsights(prev => ({
        ...prev,
        [characterKey]: 'Error loading insights. Please try again.'
      }));
      setShowInsights(prev => ({
        ...prev,
        [characterKey]: true
      }));
    } finally {
      setLoadingInsights(prev => ({ ...prev, [characterKey]: false }));
    }
  };

  const handleCloseInsights = (character, index) => {
    const characterKey = `${character.character_name}_${index}`;
    setShowInsights(prev => ({
      ...prev,
      [characterKey]: false
    }));
  };

  const parseInsights = (insightsText) => {
    if (!insightsText) return { tags: [], emotionalProfile: [] };
    
    const lines = insightsText.split('\n');
    let tags = [];
    let emotionalProfile = [];
    
    lines.forEach(line => {
      if (line.startsWith('tags:')) {
        tags = line.replace('tags:', '').trim().split(',').map(tag => tag.trim());
      } else if (line.startsWith('emotional_profile:')) {
        const profileText = line.replace('emotional_profile:', '').trim();
        // Parse emotional profile items (e.g., "bravery: 9/10, empathy: 8/10")
        emotionalProfile = profileText.split(',').map(item => {
          const trimmed = item.trim();
          const [trait, score] = trimmed.split(':').map(s => s.trim());
          return { trait, score };
        });
      }
    });
    
    return { tags, emotionalProfile };
  };

  // Show loading state while searching
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-3xl p-12">
          <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-6 animate-spin" />
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Searching Characters...</h3>
          <p className="text-slate-600 text-lg">
            Finding the perfect matches for your description
          </p>
        </div>
      </div>
    );
  }

  // Show no results only after search is complete AND no results found
  if (!isLoading && results.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-3xl p-12">
          <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-800 mb-4">No Characters Found</h3>
          <p className="text-slate-600 text-lg">
            Try adjusting your description or removing filters to get better results.
          </p>
        </div>
      </div>
    );
  }

  // Show results only when not loading and results exist
  if (!isLoading && results.length > 0) {
    return (
      <>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              🎯 Search Results
            </h2>
          </div>

          <div className="space-y-6">
            {results.map((character, index) => {
              const characterKey = `${character.character_name}_${index}`;
              const insights = characterInsights[characterKey];
              const isLoadingInsight = loadingInsights[characterKey];
              const isInsightsVisible = showInsights[characterKey];
              const parsedInsights = parseInsights(insights);

              return (
                <div
                  key={index}
                  className={`backdrop-blur-xl border-2 rounded-3xl p-8 transition-all hover:scale-[1.0] hover:shadow-xl ${
                    index === 0 
                      ? 'border-blue-300 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 shadow-2xl' 
                      : 'border-slate-200 bg-white/80 hover:bg-white/90'
                  }`}
                >
                  {index === 0 && (
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="h-6 w-6 text-blue-500" />
                      <span className="text-blue-600 font-bold text-lg">🏆 BEST MATCH</span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <p className={`font-bold mb-3 ${
                      index === 0 ? 'text-blue-700 text-2xl' : 'text-slate-800 text-xl'
                    }`}>
                      {formatResult(character, index)}
                    </p>
                    <div className="flex items-center gap-6 text-sm mb-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                        {character.media_type}
                      </span>
                      <span className="text-slate-600">
                        Match: {(character.relevance * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                    {character.description}
                  </p>

                  {/* Action Buttons Row */}
                  <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleChatWithCharacter(character)}
                      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-102 ${
                        index === 0
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                      }`}
                    >
                      <MessageCircle className="h-6 w-6" />
                      💬 Chat with {character.character_name}
                      <Zap className="h-5 w-5 ml-2" />
                    </button>
                    

                    {/* Character Insights Button */}
                    <button
                      onClick={() => handleGetCharacterInsights(character, index)}
                      disabled={isLoadingInsight}
                      className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-102 ${
                        isLoadingInsight ? 'opacity-75 cursor-not-allowed' : ''
                      } ${
                        index === 0
                          ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-2 border-teal-400'
                          : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-2 border-emerald-400'
                      }`}
                    >
                      {isLoadingInsight ? (
                        <>
                          <Loader2 className="h-6 w-6 animate-spin" />
                          Loading Insights...
                        </>
                      ) : (
                        <>
                          <Brain className="h-6 w-6" />
                          🧠 {insights ? (isInsightsVisible ? 'Hide' : 'Show') + ' Character Insights' : 'Get Character Insights'}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Character Insights Display - Now with close button and conditional visibility */}
                  {insights && isInsightsVisible && (
                    <div className={`mb-6 p-6 rounded-2xl border-2 shadow-lg ${
                      index === 0 
                        ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-300' 
                        : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300'
                    }`}>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${
                            index === 0 ? 'bg-teal-100' : 'bg-emerald-100'
                          }`}>
                            <Brain className={`h-6 w-6 ${
                              index === 0 ? 'text-teal-600' : 'text-emerald-600'
                            }`} />
                          </div>
                          <h3 className={`font-bold text-xl ${
                            index === 0 ? 'text-teal-700' : 'text-emerald-700'
                          }`}>
                            🧠 Character Insights
                          </h3>
                        </div>
                        <button
                          onClick={() => handleCloseInsights(character, index)}
                          className={`p-2 rounded-full hover:bg-white/50 transition-colors ${
                            index === 0 ? 'text-teal-600 hover:text-teal-700' : 'text-emerald-600 hover:text-emerald-700'
                          }`}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      {/* Tags Section */}
                      {parsedInsights.tags.length > 0 && (
                        <div className="mb-5">
                          <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <span className="text-lg">🏷️</span>
                            Personality Tags
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {parsedInsights.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex} 
                                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all hover:scale-105 ${
                                  index === 0 
                                    ? 'bg-teal-100 text-teal-700 border-teal-300 hover:bg-teal-200' 
                                    : 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Emotional Profile Section - Now with styled bars */}
                      {parsedInsights.emotionalProfile.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            Emotional Profile
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {parsedInsights.emotionalProfile.map((item, profileIndex) => {
                              if (!item.trait || !item.score) return null;
                              
                              // Extract numeric value from score (e.g., "9/10" -> 9)
                              const numericScore = item.score.includes('/') 
                                ? parseInt(item.score.split('/')[0]) 
                                : parseInt(item.score);
                              const percentage = (numericScore / 10) * 100;
                              
                              return (
                                <div key={profileIndex} className="bg-white/70 p-4 rounded-xl border border-slate-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium text-slate-700 capitalize">
                                      {item.trait}
                                    </span>
                                    <span className={`font-bold text-sm ${
                                      index === 0 ? 'text-teal-600' : 'text-emerald-600'
                                    }`}>
                                      {item.score}
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-1000 ${
                                        index === 0 
                                          ? 'bg-gradient-to-r from-teal-400 to-cyan-500' 
                                          : 'bg-gradient-to-r from-emerald-400 to-green-500'
                                      }`}
                                      style={{ width: `${Math.min(percentage, 100)}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feature descriptions - Only show when insights are not visible */}
                  {!isInsightsVisible && (
                    <div className="text-slate-600 text-sm mb-6">
                      <p className="mb-1">✨ Get life advice in {character.character_name}'s unique style</p>
                      {!insights && <p>🧠 Discover deeper personality insights and emotional patterns</p>}
                    </div>
                  )}

                  {/* Images and Search Results for Best Match */}
                  {index === 0 && (
                    <div className="mb-6">
                      {showImageSearch ? (
                        <>
                          <div className="flex items-center gap-3 mb-6">
                            <Camera className="h-6 w-6 text-blue-500" />
                            <span className="text-blue-600 font-bold text-lg">🖼️ Relevant Images</span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {imagePlaceholders.length > 0 ? (
                              imagePlaceholders.map((_, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="relative bg-slate-100 rounded-2xl overflow-hidden border-2 border-slate-200 h-32 flex items-center justify-center"
                                >
                                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                </div>
                              ))
                            ) : (
                              bestMatchImages.map((image, imgIndex) => (
                                <a
                                  key={imgIndex}
                                  href={image.source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group relative bg-slate-100 rounded-2xl overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-all hover:scale-101 h-32"
                                >
                                  <div className="w-full h-full overflow-hidden">
                                    <img
                                      src={image.url}
                                      alt={image.title}
                                      loading="lazy"
                                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <ExternalLink className="h-6 w-6 text-white" />
                                  </div>
                                </a>
                              ))
                            )}
                          </div>
                        </>
                      ) : null}

                      <div className="flex items-center gap-3 mb-4">
                        <Search className="h-5 w-5 text-purple-500" />
                        <span className="text-purple-600 font-bold">🌐 Search Online</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getOnlineSearchResults(character).map((result, resultIndex) => (
                          <a
                            key={resultIndex}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 p-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-purple-400 rounded-2xl transition-all group h-32 justify-center"
                          >
                            <div className="text-2xl">{result.icon}</div>
                            <div className="text-center">
                              <p className="text-slate-800 font-semibold text-sm">{result.title}</p>
                              <p className="text-slate-600 text-xs">{result.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-purple-500 group-hover:text-purple-600" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Results for Other Matches */}
                  {index > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Search className="h-5 w-5 text-purple-500" />
                        <span className="text-purple-600 font-bold">🌐 Search Online</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {getOnlineSearchResults(character).map((result, resultIndex) => (
                          <a
                            key={resultIndex}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-3 p-4 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-purple-400 rounded-2xl transition-all group h-32 justify-center"
                          >
                            <div className="text-2xl">{result.icon}</div>
                            <div className="text-center">
                              <p className="text-slate-800 font-semibold text-sm">{result.title}</p>
                              <p className="text-slate-600 text-xs">{result.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-purple-500 group-hover:text-purple-600" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Modal */}
        {selectedCharacterForChat && (
          <CharacterChatModal
            isOpen={isChatModalOpen}
            onClose={closeChatModal}
            character={selectedCharacterForChat}
          />
        )}
      </>
    );
  }

  // Fallback return - should not happen in normal flow
  return null;
};

export default SearchResults;