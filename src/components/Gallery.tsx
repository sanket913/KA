import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface GalleryProps {
  onNavigateToGallery: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onNavigateToGallery }) => {
  const artworks = [
    {
      title: 'Abstract Watercolor',
      image: '/gallery1.jpeg',
    },
    {
      title: 'Oil Landscape',
      image: '/gallery2.jpg',
    },
    {
      title: 'Charcoal Portrait',
      image: '/gallery3.jpg',
    },
    {
      title: 'Acrylic Still Life',
      image: '/gallery4.jpg',
    },
    {
      title: 'Mixed Media Composition',
      image: '/gallery5.jpg',
    },
    {
      title: 'Ink Illustration',
      image: '/gallery6.jpg',
    },
  ];

  return (
    <section id="gallery" className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">
            Art Gallery
          </h2>
          <p className="font-script text-base xs:text-lg sm:text-xl md:text-2xl text-purple-600 font-semibold mb-3 xs:mb-4 sm:mb-6">
            Inspiring Student Artwork
          </p>
          <p className="font-serif text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-5xl mx-auto px-2 xs:px-4 sm:px-0 leading-relaxed font-light">
            Browse through the gallery showcasing the incredible work created by our talented students. 
            These pieces demonstrate the diverse styles and techniques taught at Kalakar Art Academy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-6 xs:mb-8 sm:mb-12">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-xl xs:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-36 xs:h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ExternalLink size={20} className="xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                </div>
              </div>
              <div className="p-3 xs:p-4 sm:p-6">
                <h3 className="font-display text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 xs:mb-2">{artwork.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={onNavigateToGallery}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full font-semibold text-sm xs:text-base sm:text-lg md:text-xl hover:shadow-lg transition-all font-body"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Gallery
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;