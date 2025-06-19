import React, { useState } from 'react';
import { Search, Sparkles, Camera, Eye, EyeOff, Loader2, ExternalLink, MessageCircle, Zap } from 'lucide-react';
import CharacterChatModal from './CharacterChatModal';

const SearchResults = ({ 
  results, 
  bestMatchImages, 
  imagePlaceholders, 
  showImageSearch, 
  onImageSearchToggle,
  isLoading = false // Add isLoading prop
}) => {
  const [selectedCharacterForChat, setSelectedCharacterForChat] = useState(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

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

  // Show loading state while searching - This is the priority check
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
            <div className="flex items-center justify-center gap-4 mb-6">
              {/* <button
                onClick={onImageSearchToggle}
                className={`flex items-center gap-3 px-6 py-3 border-2 rounded-2xl font-medium transition-all ${
                  showImageSearch 
                    ? 'bg-green-100 hover:bg-green-200 border-green-300 text-green-700' 
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {showImageSearch ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                Relevant Image Search
              </button> */}
            </div>
          </div>

          <div className="space-y-6">
            {results.map((character, index) => (
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

                {/* Chat Button */}
                <div className="mb-6">
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
                  <p className="text-slate-600 text-sm mt-2 ml-2">
                    ✨ Get life advice in {character.character_name}'s unique style
                  </p>
                </div>

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
            ))}
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