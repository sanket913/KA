import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  category: string;
  image: string;
}

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Sketches & Drawings');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const categories = [
    { name: 'Sketches & Drawings', count: 6 },
    { name: 'Paintings', count: 5 },
    { name: 'Workshop', count: 4 }
  ];

  const artworks: Artwork[] = [
    {
      id: 1,
      title: 'Portrait Study in Charcoal',
      artist: 'Priya Sharma',
      category: 'Sketches & Drawings',
      image: '/gallery7.jpg',
    },
    {
      id: 2,
      title: 'Abstract Watercolor Landscape',
      artist: 'Vikram Patel',
      category: 'Sketches & Drawings',
      image: '/gallery8.jpg',
    },
    {
      id: 3,
      title: 'Still Life with Fruits',
      artist: 'Meera Kapoor',
      category: 'Sketches & Drawings',
      image: '/gallery9.jpg',
    },
    {
      id: 4,
      title: 'Urban Architecture Sketch',
      artist: 'Arjun Singh',
      category: 'Sketches & Drawings',
      image: '/gallery10.jpg',
    },
    {
      id: 5,
      title: 'Floral Mandala Workshop',
      artist: 'Kavya Reddy',
      category: 'Sketches & Drawings',
      image: '/gallery11.jpg',
    },
    {
      id: 6,
      title: 'Wildlife Portrait - Tiger',
      artist: 'Rohit Kumar',
      category: 'Sketches & Drawings',
      image: '/gallery12.jpg',
    },
    {
      id: 7,
      title: 'Sunset Seascape',
      artist: 'Anita Joshi',
      category: 'Sketches & Drawings',
      image: '/gallery13.jpg',
    },
    {
      id: 8,
      title: 'Mixed Media Workshop Creation',
      artist: 'Deepak Gupta',
      category: 'Paintings',
      image: '/gallery14.jpg',
    },
    {
      id: 9,
      title: 'Botanical Study',
      artist: 'Sneha Iyer',
      category: 'Paintings',
      image: '/gallery15.jpg',
    },
    {
      id: 10,
      title: 'Abstract Expressionism',
      artist: 'Karan Malhotra',
      category: 'Paintings',
      image: '/gallery16.jpg',
    },
    {
      id: 11,
      title: 'Figure Drawing Study',
      artist: 'Riya Gupta',
      category: 'Paintings',
      image: '/gallery17.jpg',
    },
    {
      id: 12,
      title: 'Workshop Collaborative Mural',
      artist: 'Workshop Group',
      category: 'Paintings',
      image: '/gallery18.jpg',
    },
    {
      id: 13,
      title: 'Pencil Portrait Mastery',
      artist: 'Amit Verma',
      category: 'Paintings',
      image: '/gallery19.jpg',
    },
    {
      id: 14,
      title: 'Watercolor Florals',
      artist: 'Nisha Patel',
      category: 'Paintings',
      image: '/gallery20.jpg',
    },
    {
      id: 15,
      title: 'Creative Workshop Collage',
      artist: 'Workshop Team',
      category: 'Workshop',
      image: '/gallery21.jpg',
    },
    {
      id: 16,
      title: 'Botanical Study',
      artist: 'Rahul Jain',
      category: 'Workshop',
      image: '/gallery22.jpg',
    },
    {
      id: 17,
      title: 'Abstract Expressionism',
      artist: 'Komal Jain',
      category: 'Workshop',
      image: '/gallery23.jpg',
    },
    {
      id: 18,
      title: 'Mixed Media Collage',
      artist: 'Rahul Jain',
      category: 'Workshop',
      image: '/gallery24.jpg',
    },
    {
      id: 19,
      title: 'Watercolor Landscapes',
      artist: 'Nisha Patel',
      category: 'Workshop',
      image: '/gallery25.jpg',
    },
    {
      id: 20,
      title: 'Creative Workshop',
      artist: 'Workshop Team',
      category: 'Workshop',
      image: '/gallery26.jpg',
    },
    {
      id: 21,
      title: 'Botanical Study',
      artist: 'Rahul Jain',
      category: 'Workshop',
      image: '/gallery27.jpg',
    },
    {
      id: 22,
      title: 'Abstract Expressionism',
      artist: 'Komal Jain',
      category: 'Workshop',
      image: '/gallery28.jpg',
    },
    {
      id: 23,
      title: 'Mixed Media Collage',
      artist: 'Rahul Jain',
      category: 'Workshop',
      image: '/gallery29.jpg',
    },
    {
      id: 24,
      title: 'Watercolor Landscapes',
      artist: 'Nisha Patel',
      category: 'Workshop',
      image: '/gallery30.jpg',
    }
  ];

  const filteredArtworks = artworks.filter(artwork => artwork.category === selectedCategory);

  const ArtworkCard = ({ artwork }: { artwork: Artwork }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
      whileHover={{ y: -3 }}
    >
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden">
        <motion.img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut" 
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20">

        {/* Category Filter */}
        <div className="bg-white py-6 md:py-8 border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start mb-4">
              <button
                onClick={() => window.location.href = '/'}
                className="flex items-center text-sm sm:text-base text-purple-600 hover:text-purple-800 transition font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                Browse by Category
              </h2>
              <p className="font-body text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Discover artworks organized by different mediums and techniques
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-body font-semibold text-xs sm:text-sm md:text-base transition-all whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="block sm:inline">{category.name}</span>
                  <span className="ml-1 text-xs opacity-75">({category.count})</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Current Category Info */}
          <motion.div 
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 md:mb-3">
              {selectedCategory}
            </h3>
            <p className="font-body text-gray-600 text-base md:text-lg">
              {selectedCategory === 'Sketches & Drawings' && 'Pencil, charcoal, and ink artworks showcasing various techniques and styles.'}
              {selectedCategory === 'Paintings' && 'Colorful expressions using watercolor, oil, acrylic, and mixed media.'}
              {selectedCategory === 'Workshop' && 'Special projects and collaborative works from our intensive workshops.'}
            </p>
          </motion.div>

          {/* Artworks Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filteredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <ArtworkCard artwork={artwork} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredArtworks.length === 0 && (
            <motion.div 
              className="text-center py-12 md:py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Tag size={28} className="md:w-8 md:h-8 text-purple-400" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-gray-800 mb-3 md:mb-4">No artworks found</h3>
              <p className="font-body text-gray-600 max-w-md mx-auto text-base md:text-lg">
                Try selecting a different category to discover amazing artworks.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GalleryPage;
