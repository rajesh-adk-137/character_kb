import React from 'react';
import { Brain, Github, ExternalLink, Heart, Database, Sparkles, Zap, Trophy, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 border-t border-slate-700/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-2xl shadow-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  CharacterKB
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                  <span className="text-xs text-slate-400 font-medium">AI Character Discovery</span>
                </div>
              </div>
            </div>
            
            <p className="text-slate-300 text-base max-w-lg leading-relaxed mb-6">
              Transform your character searches with AI-powered semantic understanding. 
              Discover characters from your favorite shows, movies, and anime using advanced 
              AI semantic search technology.
            </p>
            
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-4 hover:bg-slate-700/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="text-slate-200 font-semibold text-sm">Powered by MindsDB</span>
              </div>
              <p className="text-slate-400 text-xs">
                Built with MindsDB Knowledge Bases for intelligent character discovery
              </p>
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Book className="h-5 w-5 text-blue-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://docs.mindsdb.com/mindsdb_sql/knowledge-bases#how-knowledge-bases-work" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-300 text-sm"
                >
                  <div className="bg-slate-700/50 p-1.5 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Database className="h-3 w-3" />
                  </div>
                  <span>MindsDB Knowledge Bases</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.kaggle.com/datasets/rajesh137/charactercodex" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-all duration-300 text-sm"
                >
                  <div className="bg-slate-700/50 p-1.5 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <Database className="h-3 w-3" />
                  </div>
                  <span>CharacterCodex Dataset</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="group flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-all duration-300 text-sm"
                >
                  <div className="bg-slate-700/50 p-1.5 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                    <Sparkles className="h-3 w-3" />
                  </div>
                  <span>API Documentation</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="group flex items-center gap-2 text-slate-300 hover:text-indigo-400 transition-all duration-300 text-sm"
                >
                  <div className="bg-slate-700/50 p-1.5 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                    <Heart className="h-3 w-3" />
                  </div>
                  <span>Support & Feedback</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Github className="h-5 w-5 text-blue-400" />
              Connect
            </h3>
            <div className="space-y-4">
              <a 
                href="https://github.com/rajesh-adk-137" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl p-4 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-slate-600 transition-colors duration-300">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold text-sm">GitHub</div>
                    <div className="text-slate-400 text-xs">@rajesh-adk-137</div>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-500 ml-auto group-hover:text-slate-300 transition-colors duration-300" />
                </div>
              </a>

              <a 
                href="https://quira.sh/quests/creator/submissions?questId=19" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 rounded-xl p-4 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 block"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-slate-600 transition-colors duration-300">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-slate-200 font-semibold text-sm">Quira Quest</div>
                    <div className="text-slate-400 text-xs">Support this project</div>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-500 ml-auto group-hover:text-slate-300 transition-colors duration-300" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                <span>for character discovery enthusiasts</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-slate-500 text-xs">
                © 2025 CharacterKB • AI-Powered Character Discovery
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/60 through-indigo-500/60 to-transparent"></div>
    </footer>
  );
};

export default Footer;