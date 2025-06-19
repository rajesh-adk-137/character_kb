import React, { useState } from 'react';
// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';

// Import pages
import LandingPage from './pages/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage setCurrentPage={setCurrentPage} />;
      case 'main':
        return <MainPage />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      default:
        return <LandingPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;