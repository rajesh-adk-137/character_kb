import React, { useState, useEffect } from 'react';
import { Brain, Database, Zap, Users, Server, Code, Package, Cpu, Sparkles, Camera, Eye, Image, Target, Globe, Search, ArrowRight, MessageCircle, Bot, Heart, Lightbulb, Users2, Mic } from 'lucide-react';

const AboutPage = ({ setCurrentPage }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Set visibility for animations
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Semantic Search",
      description: "Advanced natural language processing understands context and meaning, not just keywords. Describe characters naturally and get perfect matches with relevance scoring.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Character Insights & Analysis",
      description: "AI-powered psychological profiling analyzes personality traits, emotional patterns, and core characteristics. Get concise personality tags and structured emotional profiles highlighting confidence, optimism, wit, and more.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Interactive Character Chat",
      description: "Engage in authentic conversations with discovered characters using MindsDB's Agent framework. Get personalized advice, creative insights, and unique perspectives.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Relevant Image Discovery",
      description: "Intelligent image search automatically finds high-quality character images from across the web based on character profiles which can be furthur explored on a click of a button.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const techStack = [
    {
      icon: <Server className="h-7 w-7" />,
      title: "FastAPI Backend",
      description: "High-performance Python web framework with robust API endpoints, automatic validation, and async support for real-time interactions.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Database className="h-7 w-7" />,
      title: "MindsDB Integration",
      description: "AI-powered database layer with semantic search capabilities and Agent framework for intelligent conversational AI interactions.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Code className="h-7 w-7" />,
      title: "React + Tailwind",
      description: "Modern frontend with React for dynamic UI, Tailwind CSS for responsive styling, and real-time chat components.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Package className="h-7 w-7" />,
      title: "Docker Deployment",
      description: "Containerized architecture ensuring consistent performance, easy scalability, and seamless chat service integration.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const chatFeatures = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "MindsDB Agent Framework",
      description: "Leverages MindsDB's cutting-edge Agent technology for contextual character conversations"
    },
    {
      icon: <Users2 className="h-6 w-6" />,
      title: "Personality Modeling",
      description: "Each character maintains consistent personality traits, speech patterns, and behavioral responses"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Life Guidance",
      description: "Get authentic advice on relationships, career challenges, and personal growth from character perspectives"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Creative Insights",
      description: "Discover new perspectives and creative solutions through character-specific wisdom and experiences"
    }
  ];

  const insightFeatures = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Personality Tags",
      description: "AI generates concise trait tags that capture the essence of each character's core personality"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Emotional Profile",
      description: "Structured analysis of confidence, optimism, wit, and other emotional dimensions using natural language understanding"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Unique UI interface",
      description: "Visually engaging design with smooth animations and gradient styling that presents insights in an intuitive and aesthetically pleasing layout"
    }
  ];

  const datasetFeatures = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "CharacterCodex Dataset",
      description: "Curated collection of 10,000+ character descriptions from diverse media sources"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Custom Curation",
      description: "Dataset specifically tailored for semantic search optimization and conversational AI training"
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI Processing",
      description: "Advanced preprocessing for enhanced character matching, relevance scoring, and personality modeling"
    }
  ];

  const imageCapabilities = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Visual Discovery",
      description: "Instantly fetches crisp, high-resolution images from the web based on character profiles."
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Source-Aware Previews",
      description: "Click on any displayed image to visit its original source, giving you full context and credibility."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Quick Media Shortcuts",
      description: "Instantly explore related Google, Wikipedia, and video search results with a single tap."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Characters Available" },
    { number: "20+", label: "Media Types" },
    { number: "AI Powered", label: "Insights & Chat" }
  ];

  const handleNavigateToMain = () => {
    console.log('Button clicked, setCurrentPage:', setCurrentPage);
    if (setCurrentPage) {
      setCurrentPage('main');
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 relative overflow-hidden">

      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About CharacterKB
            </h1>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              AI-powered character discovery, psychological insights, and conversation through cutting-edge technology
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white/80 backdrop-blur-xl border-2 border-blue-300 rounded-3xl p-6 max-w-4xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-extrabold mb-1 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="container mx-auto px-4 py-12 overflow-hidden">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
              Why Choose CharacterKB?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl border-2 border-blue-200 rounded-3xl p-6 shadow-xl hover:scale-102 transition-all duration-300"
              >
                <div className={`text-white p-3 rounded-2xl mb-4 bg-gradient-to-r ${feature.color} w-fit`}>
                  {feature.icon}
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        

        {/* Chat Feature Deep Dive */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-xl border-2 border-purple-200 rounded-3xl p-8 max-w-6xl mx-auto shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-2 bg-purple-100/80 border-2 border-purple-300 rounded-full px-4 py-2 mb-4">
                <MessageCircle className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-700 font-semibold">CONVERSATIONAL AI</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-4">
                Interactive Character Conversations
              </h2>
              <p className="text-purple-600 text-lg max-w-3xl mx-auto font-medium">
                Powered by MindsDB's Agent framework for authentic, contextual character interactions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chatFeatures.map((feature, index) => (
                <div key={index} className="bg-white/80 border-2 border-purple-200 rounded-xl p-5 hover:bg-white/90 transition-all duration-300">
                  <div className="text-purple-500 mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-2">{feature.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Technical Implementation */}
            <div className="mt-8 bg-white/60 border border-purple-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-purple-600" />
                Technical Implementation
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our chat system utilizes <strong>MindsDB's Agent framework</strong>, a cutting-edge conversational AI technology that enables 
                contextual, personality-driven conversations. Each character is modeled with unique personality traits, speech patterns, 
                and knowledge bases, ensuring authentic interactions that maintain character consistency across conversations.
              </p>
            </div>
          </div>
        </div>


        {/* Character Insights Deep Dive */}
<div className="container mx-auto px-4 py-12">
  <div className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-xl border-2 border-indigo-200 rounded-3xl p-8 max-w-6xl mx-auto shadow-xl">
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center gap-2 bg-indigo-100/80 border-2 border-indigo-300 rounded-full px-4 py-2 mb-4">
        <Eye className="h-4 w-4 text-indigo-600" />
        <span className="text-sm text-indigo-700 font-semibold">CHARACTER INSIGHTS</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-4">
        AI-Powered Psychological Analysis
      </h2>
      <p className="text-indigo-600 text-lg max-w-3xl mx-auto font-medium">
        Unlock deeper understanding with advanced personality profiling and emotional analysis
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insightFeatures.map((feature, index) => (
        <div key={index} className="bg-white/80 border-2 border-indigo-200 rounded-xl p-5 hover:bg-white/90 transition-all duration-300">
          <div className="text-indigo-500 mb-3">
            {feature.icon}
          </div>
          <h4 className="font-bold text-slate-800 text-sm mb-2">{feature.title}</h4>
          <p className="text-slate-600 text-xs leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>

    {/* Technical Implementation */}
    <div className="mt-8 bg-white/60 border border-indigo-200 rounded-2xl p-6">
      <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Cpu className="h-5 w-5 text-indigo-600" />
        Technical Implementation
      </h4>
      <p className="text-slate-600 text-sm leading-relaxed">
        The <strong>Character Insights</strong> feature leverages advanced natural language understanding to analyze and interpret 
        psychological profiles of characters in our database. The AI system generates concise personality tags that capture core traits, 
        alongside structured emotional profiles highlighting confidence, optimism, wit, and other key dimensions. This creates a rich, 
        analytical perspective that makes character exploration more insightful, meaningful, and engaging than traditional search methods.
      </p>
    </div>
  </div>
</div>


        {/* Tech Stack */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
              Technical Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl border-2 border-blue-200 rounded-3xl p-5 shadow-xl hover:scale-102 transition-all duration-300"
              >
                <div className={`text-white p-2 rounded-2xl mb-3 bg-gradient-to-r ${tech.color} w-fit`}>
                  {tech.icon}
                </div>
                <h3 className="text-slate-800 font-bold text-base mb-2">{tech.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dataset & Image Features Combined */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Dataset Information */}
            <div className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-xl border-2 border-indigo-200 rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 bg-indigo-100/80 border-2 border-indigo-300 rounded-full px-3 py-1 mb-3">
                  <Database className="h-3 w-3 text-indigo-600" />
                  <span className="text-xs text-indigo-700 font-semibold">DATA SOURCE</span>
                </div>
                <h3 className="text-xl font-extrabold text-indigo-700 mb-2">
                  CharacterCodex Dataset
                </h3>
                <p className="text-indigo-600 text-xs font-medium mb-4">
                  10,000+ character descriptions curated for AI-powered semantic search and conversation.
                </p>
              </div>

              <div className="space-y-3">
                {datasetFeatures.map((info, index) => (
                  <div key={index} className="bg-white/80 border border-indigo-200 rounded-xl p-3">
                    <div className="flex items-center gap-2">
                      <div className="text-indigo-500">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">{info.title}</h4>
                        <p className="text-slate-600 text-xs">{info.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* AI Image Features */}
            <div className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-xl border-2 border-indigo-200 rounded-3xl p-6 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 bg-indigo-100/80 border-2 border-indigo-300 rounded-full px-3 py-1 mb-3">
                  <Camera className="h-3 w-3 text-indigo-600" />
                  <span className="text-xs text-indigo-700 font-semibold">IMAGE SUGGESTIONS</span>
                </div>
                <h3 className="text-xl font-extrabold text-indigo-700 mb-2">
                  Relevant Image Search
                </h3>
                <p className="text-indigo-600 text-xs font-medium mb-4">
                  Fetches high-resolution images from the web using smart quality-based filtering.
                </p>
              </div>

  <div className="space-y-3">
    {imageCapabilities.map((feature, index) => (
      <div key={index} className="bg-white/80 border border-indigo-200 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <div className="text-indigo-500">
            {feature.icon}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-xs">{feature.title}</h4>
            <p className="text-slate-600 text-xs">{feature.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

          </div>
        </div>

        {/* Mission Statement */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-xl border-2 border-indigo-200 rounded-3xl p-8 max-w-4xl mx-auto shadow-xl">
            <div className="text-center">
              <Sparkles className="h-8 w-8 text-indigo-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
                Our Mission
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
                To bridge the gap between human creativity and character discovery through intelligent AI technology. 
                CharacterKB transforms character exploration into an intuitive, analytical, and conversational experience that 
                enables meaningful connections with fictional personalities for guidance, inspiration, and creative exploration through 
                deep psychological insights and authentic interactions.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
              Ready to Experience{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Character Discovery, Insights & Chat?
              </span>
            </h2>
            <p className="text-slate-700 text-sm max-w-xl mx-auto font-medium mb-6">
              Join thousands of users discovering, analyzing, and conversing with amazing characters using AI-powered technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleNavigateToMain}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Search className="h-4 w-4" />
                Try CharacterKB Now
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <a
                href="https://quira.sh/quests/creator/details?questId=19"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-xl border-2 border-blue-300 text-blue-700 font-semibold px-6 py-3 rounded-2xl hover:bg-blue-100 transition-colors duration-300"
              >
                Support the Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;