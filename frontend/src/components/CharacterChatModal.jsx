import React, { useState, useEffect } from 'react';
import { X, Send, MessageCircle, Sparkles, User, Bot, Loader2 } from 'lucide-react';

const CharacterChatModal = ({ isOpen, onClose, character }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        // Restore scrolling
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Function to sanitize text for SQL safety
  const sanitizeForSQL = (text) => {
    if (!text) return '';
    // Replace single quotes with two single quotes (SQL escape method)
    // Also handle other potential problematic characters
    return text
      .replace(/'/g, "''")  // Escape single quotes
      .replace(/\\/g, "\\\\") // Escape backslashes
      .trim(); // Remove leading/trailing whitespace
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);

    try {
      // Sanitize all inputs before sending to API
      const sanitizedPayload = {
        character_name: sanitizeForSQL(character.character_name),
        character_description: sanitizeForSQL(character.description),
        question: sanitizeForSQL(messageToSend)
      };

      console.log('Sending sanitized payload:', sanitizedPayload); // Debug log

      const response = await fetch('http://localhost:8000/character_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: Failed to get response from character`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || "I received your message but couldn't generate a response.",
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error); // Debug log
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `I'm having trouble responding right now. ${error.message?.includes('HTTP') ? 'Please check if the server is running.' : 'Please try rephrasing your question.'}`,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedMessage = (message) => {
    setCurrentMessage(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Chat with {character.character_name}</h2>
                <p className="text-blue-100">Ask for life advice in their unique style</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Character Info */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <p className="text-slate-700 font-medium">
              "{character.character_name}" from {character.genre} ({character.media_type})
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                Start Your Conversation
              </h3>
              <p className="text-slate-500">
                Ask {character.character_name} for advice on life, relationships, career, or anything else!
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <button
                  onClick={() => handleSuggestedMessage("I am feeling overwhelmed with work. Any advice?")}
                  className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left text-slate-600 hover:text-blue-600 transition-all"
                >
                  💼 "I am feeling overwhelmed with work. Any advice?"
                </button>
                <button
                  onClick={() => handleSuggestedMessage("How do I build more confidence in myself?")}
                  className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left text-slate-600 hover:text-blue-600 transition-all"
                >
                  💪 "How do I build more confidence in myself?"
                </button>
                <button
                  onClick={() => handleSuggestedMessage("I am nervous about starting something new. What should I do?")}
                  className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left text-slate-600 hover:text-blue-600 transition-all"
                >
                  🌟 "I am nervous about starting something new. What should I do?"
                </button>
                <button
                  onClick={() => handleSuggestedMessage("How do I deal with difficult people?")}
                  className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left text-slate-600 hover:text-blue-600 transition-all"
                >
                  🤔 "How do I deal with difficult people?"
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-purple-500 text-white'
              }`}>
                {message.type === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
              </div>
              <div className={`max-w-[70%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-md' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-slate-400 mt-1 px-2">
                  {message.type === 'user' ? 'You' : character.character_name} • {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
                  <p className="text-slate-600">{character.character_name} is thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-200">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask ${character.character_name} for advice...`}
                className="w-full p-4 pr-12 border-2 border-slate-200 focus:border-blue-500 focus:outline-none rounded-2xl resize-none"
                rows="2"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="absolute right-3 bottom-3 w-8 h-8 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-all disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-slate-500">
              Press Enter to send, Shift+Enter for new line
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="h-3 w-3" />
              Powered by AI Character Advisor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterChatModal;