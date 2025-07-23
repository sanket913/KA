import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Courses from './components/Courses';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalleryPage from './components/GalleryPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');

  // Listen for navigation events
  useEffect(() => {
    const handleNavigateToGallery = () => {
      setCurrentPage('gallery');
    };

    const handleNavigateToHome = () => {
      setCurrentPage('home');
    };

    // Listen for custom navigation events
    window.addEventListener('navigateToGallery', handleNavigateToGallery);
    window.addEventListener('navigateToHome', handleNavigateToHome);

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('gallery')) {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Check initial URL
    const initialPath = window.location.pathname;
    if (initialPath.includes('gallery')) {
      setCurrentPage('gallery');
    }

    return () => {
      window.removeEventListener('navigateToGallery', handleNavigateToGallery);
      window.removeEventListener('navigateToHome', handleNavigateToHome);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Update URL when page changes
  useEffect(() => {
    if (currentPage === 'gallery') {
      window.history.pushState({}, '', '/gallery');
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [currentPage]);

  if (currentPage === 'gallery') {
    return (
      <div data-page="gallery">
        <GalleryPage />
      </div>
    );
  }

   return (
    <div className="min-h-screen bg-white overflow-x-hidden max-w-full">
      <Header />
      <main className="overflow-x-hidden max-w-full">
        <Hero />
        <About />
        <Courses />
        <Gallery onNavigateToGallery={() => setCurrentPage('gallery')} />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
