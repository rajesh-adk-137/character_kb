import React, { useState } from 'react';
import { Menu, X, Brain, Github, Code } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'main', label: 'Search' },
    { id: 'about', label: 'About' }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rajesh-adk-137/',
      icon: Github,
      hoverColor: 'hover:text-purple-400',
      bgHover: 'hover:bg-purple-500/10'
    },
    {
      name: 'Dev.to',
      url: 'https://dev.to/rajesh-adk-137',
      icon: Code,
      hoverColor: 'hover:text-emerald-400',
      bgHover: 'hover:bg-emerald-500/10'
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-xl border-b border-gray-700/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => setCurrentPage('landing')}>
            <div className="relative p-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Brain className="h-8 w-8 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all duration-300">
              CharacterKB
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-baseline space-x-12">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative text-lg font-semibold tracking-wide transition-all duration-300 group ${
                    currentPage === item.id
                      ? 'text-emerald-300'
                      : 'text-gray-200 hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                  {/* Active underline */}
                  {currentPage === item.id && (
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse"></span>
                  )}
                  {/* Hover underline */}
                  {currentPage !== item.id && (
                    <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:shadow-md group-hover:shadow-emerald-400/30"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative p-2.5 rounded-full bg-slate-800/50 text-gray-300 transition-all duration-300 group ${link.hoverColor} ${link.bgHover} hover:scale-110 hover:shadow-lg hover:shadow-current/20`}
                  title={link.name}
                >
                  <IconComponent className="h-5 w-5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-200 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transform transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-slate-900/95 backdrop-blur-xl border-t border-gray-700/30 px-4 pt-6 pb-8 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left px-5 py-3 text-lg font-semibold transition-all duration-300 relative group ${
                currentPage === item.id
                  ? 'text-emerald-300'
                  : 'text-gray-200 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg'
              }`}
            >
              {item.label}
              {/* Active mobile underline */}
              {currentPage === item.id && (
                <span className="absolute -bottom-0.5 left-5 w-12 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse"></span>
              )}
              {/* Hover mobile underline */}
              {currentPage !== item.id && (
                <span className="absolute -bottom-0.5 left-8 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-300 group-hover:w-8 group-hover:shadow-md group-hover:shadow-emerald-400/30"></span>
              )}
            </button>
          ))}
          
          {/* Mobile Social Links */}
          <div className="pt-4 border-t border-gray-700/30">
            <div className="flex items-center justify-center space-x-6">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative p-3 rounded-full bg-slate-800/50 text-gray-300 transition-all duration-300 group ${link.hoverColor} ${link.bgHover} hover:scale-110 hover:shadow-lg hover:shadow-current/20`}
                    title={link.name}
                  >
                    <IconComponent className="h-6 w-6" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;