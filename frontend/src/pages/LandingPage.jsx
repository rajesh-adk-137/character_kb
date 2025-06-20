import React, { useState, useEffect } from 'react';
import { Search, Brain, Sparkles, ArrowRight, Zap, Image, MessageCircle, Star, Users, Globe, Rocket, BookOpen, Film, Gamepad2, Tv, Scroll, Bot, Heart, Lightbulb, Target, Eye } from 'lucide-react';
import spongebob from '../assets/spongebob.gif';
import oggy from '../assets/oggy.gif';

const LandingPage = ({ setCurrentPage }) => {
  const [currentExample, setCurrentExample] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const examples = [
    "A genius physicist who loves trains and has specific routines",
    "Billionaire who becomes a symbol of fear for criminals",
    "A pirate captain with a straw hat who can stretch like rubber",
    "A sarcastic robot who loves beer and bending things",
    "A cowardly teenager who goes on adventures with his grandpa",
    "A spiky-haired ninja who dreams of becoming a village leader"
  ];

  const features = [
    { 
      icon: Brain, 
      title: "AI-Powered Character Discovery", 
      desc: "Describe any character idea in natural language and instantly get the best match along with the top 5 closest results using MindsDB's semantic search.",
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: Eye, 
      title: "Character Insights & Analysis", 
      desc: "Dive deeper with AI-powered psychological profiling that analyzes personality traits, emotional patterns, and core characteristics with structured insights and personality tags.",
      color: "from-orange-500 to-red-500" 
    },
    { 
      icon: MessageCircle, 
      title: "Interactive Character Chat", 
      desc: "Dive into conversations with discovered characters in their unique voices. Just click 'Chat' to get personalized advice or fun interactions no setup needed.",
      color: "from-purple-500 to-pink-500" 
    },
    { 
      icon: Image, 
      title: "Smart Image Suggestions", 
      desc: "See visual representations of your matched character with curated image results pulled from the web using intelligent search automatically and seamlessly.",
      color: "from-green-500 to-emerald-500" 
    }
  ];

  const chatFeatures = [
    { 
      icon: Bot, 
      title: "Authentic Style", 
      desc: "Each character responds with their unique voice, mannerisms, and wisdom"
    },
    { 
      icon: Heart, 
      title: "Life Advice", 
      desc: "Get guidance on relationships, career, personal growth, and life challenges"
    },
    { 
      icon: Lightbulb, 
      title: "Creative Insights", 
      desc: "Discover new perspectives through the lens of your favorite characters"
    }
  ];

  const insightFeatures = [
    { 
      icon: Target, 
      title: "Personality Tags", 
      desc: "Get concise trait tags that capture the essence of each character's core personality"
    },
    { 
      icon: Brain, 
      title: "Emotional Profile", 
      desc: "Explore structured analysis of confidence, optimism, wit, and other emotional dimensions"
    },
    { 
      icon: Eye, 
      title: "Psychological Depth", 
      desc: "Understand the deeper motivations and behavioral patterns that drive each character"
    }
  ];

  const mediaTypes = [
    { icon: Film, name: "Movies", count: "2000+" },
    { icon: Tv, name: "TV Shows", count: "1500+" },
    { icon: BookOpen, name: "Novels", count: "1200+" },
    { icon: Gamepad2, name: "Games", count: "800+" },
    { icon: Scroll, name: "Anime", count: "900+" },
    { icon: Star, name: "Mythology", count: "500+" }
  ];

  useEffect(() => {
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartSearching = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setCurrentPage('main');
    }, 100);
  };

  const handleLearnMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setCurrentPage('about');
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-400/10 via-transparent to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Character Images */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Oggy */}
        <div className="absolute left-[61.5%] bottom-[28.9%] opacity-80 hover:opacity-100 transition-all duration-500 pointer-events-auto group">
          <img 
            src={oggy}
            alt="Oggy" 
            className="w-22 h-auto lg:w-32 drop-shadow-2xl hover:scale-105 hover:-rotate-1 rounded-2xl transition-all duration-500"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(236, 72, 153, 0.4))' }}
          />
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4 lg:px-8 py-8">
        {/* Hero Section */}
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border-2 border-blue-300 rounded-2xl p-4 shadow-xl">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CharacterKB
              </h1>
            </div>
          </div>

          {/* Main Value Prop */}
          <div className="px-4 lg:px-16 mb-8">
            <h2 className="text-2xl md:text-2xl lg:text-4xl font-bold text-slate-700 mb-6 leading-tight">
              Discover, Analyze & Chat with Any Character 
              <span className="inline-block ml-2">
                <Sparkles className="h-8 w-8 text-yellow-500 animate-bounce" />
              </span>
            </h2>

            <p className="text-slate-500 text-lg md:text-lg max-w-4xl mx-auto mb-10 mt-10 font-medium opacity-90 leading-relaxed">
              Transform character discovery with AI-powered semantic understanding, deep psychological insights, then engage in meaningful conversations. 
              Get life advice, creative insights, and unique perspectives from <strong className="text-blue-500 ">10,000+ characters.</strong> 
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button
              onClick={handleStartSearching}
              className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:scale-105 flex items-center gap-3 text-lg"
            >
              <Search className="h-6 w-6" />
              <span>Start Discovering</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={handleLearnMore}
              className="bg-white/90 backdrop-blur-xl border-2 border-blue-300 hover:border-blue-500 text-blue-700 font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:scale-105 text-lg"
            >
              Learn More
            </button>
          </div>

        {/* Dynamic Search Example */}
      <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-300 rounded-2xl p-8 mb-10 max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <Search className="h-6 w-6 text-blue-600" />
          <span className="text-blue-700 font-semibold text-lg">Try natural language search:</span>
        </div>
        <div className="text-slate-800 font-mono text-lg md:text-xl mb-4 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
          "{examples[currentExample]}"
        </div>
        <div className="flex justify-center gap-1 mb-6">
          {examples.map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentExample ? 'bg-blue-500' : 'bg-blue-200'}`}
            />
          ))}
        </div>

        {/* Three Demo Boxes */}
        <div className="space-y-4">
          

          {/* Character Insights Preview */}
          <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2 ">
              <Eye className="h-5 w-5 text-green-600" />
              <span className="text-green-700 font-semibold">Get deep character insights!</span>
            </div>
            <p className="text-slate-600 text-sm ">
              Get concise trait tags and emotional profile that capture the essence of each character's core personality.
            </p>
          </div>

          {/* Chat Preview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-5 w-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">Then chat with them!</span>
            </div>
            <p className="text-slate-600 text-sm">
              "Hey Luffy, I'm feeling stuck in my career. How do you stay motivated to chase your dreams?"
            </p>
          </div>
        </div>
      </div>
    </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/80 backdrop-blur-xl border-2 border-blue-300 rounded-2xl p-8 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-102 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-slate-800 font-bold text-xl mb-4">{feature.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Character Insights Section */}
        <div className="mb-16">
          {/* <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Unlock <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Character Insights</span>
            </h3>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Go beyond surface-level discovery with AI-powered psychological profiling that reveals the deeper essence of every character
            </p>
          </div> */}
          
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {insightFeatures.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl border-2 border-orange-300 rounded-xl p-6 text-center hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-slate-800 font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div> */}

          {/* Insights Preview */}
          {/* <div className="bg-gradient-to-r from-orange-50/80 to-red-50/80 backdrop-blur-xl border-2 border-orange-200 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl"> */}
            {/* <div className="flex items-center gap-3 mb-6">
              <Eye className="h-6 w-6 text-orange-600" />
              <span className="text-orange-700 font-semibold text-lg">Character Insights Preview:</span>
            </div> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 rounded-xl p-4">
                <h5 className="font-bold text-slate-800 mb-3">Personality Tags</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Adventurous</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Optimistic</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Determined</span>
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-4">
                <h5 className="font-bold text-slate-800 mb-3">Emotional Profile</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Confidence</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-4/5 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Wit</span>
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/5 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>

        {/* Chat Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Have <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Meaningful Conversations</span>
            </h3>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
             Discover your character and their personality, then dive into real, authentic conversations!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {chatFeatures.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl border-2 border-purple-300 rounded-xl p-6 text-center hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-slate-800 font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Types Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-800 text-center mb-8">
            Filter from <span className="text-blue-600">20+ Media Types</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {mediaTypes.map((type, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-xl border-2 border-blue-300 rounded-xl p-4 text-center hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                <type.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-slate-800 font-semibold text-sm">{type.name}</div>
                <div className="text-blue-600 text-xs">{type.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-300 rounded-2xl p-10 max-w-4xl mx-auto mb-16 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <div className="text-slate-600 font-medium">Characters</div>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                20+
              </div>
              <div className="text-slate-600 font-medium">Media Types</div>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent mb-2">
                AI
              </div>
              <div className="text-slate-600 font-medium">Powered</div>
            </div>
            <div>
              <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                Insights
              </div>
              <div className="text-slate-600 font-medium">Ready</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-xl border-2 border-blue-200 rounded-3xl p-12 max-w-4xl mx-auto shadow-xl">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Ready to discover, analyze & chat with characters?
          </h3>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
            Start exploring with our AI-powered semantic search, unlock deep character insights, then engage in meaningful conversations. No signup required.
          </p>
          <button
            onClick={handleStartSearching}
            className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-12 py-6 rounded-xl transition-all duration-300 hover:scale-105 text-xl flex items-center gap-4 mx-auto shadow-xl"
          >
            <Rocket className="h-6 w-6" />
            Try It Now
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;