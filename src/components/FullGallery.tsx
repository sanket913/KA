import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Grid, List, Search, Heart, Share2, Download, Eye, Calendar, User, Tag } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  category: string;
  technique: string;
  date: string;
  image: string;
  description: string;
  likes: number;
  views: number;
  tags: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface FullGalleryProps {
  onClose: () => void;
}

const FullGallery: React.FC<FullGalleryProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const categories = ['All', 'Sketches & Drawings', 'Paintings', 'Workshop Creations', 'Digital Art', 'Mixed Media'];

  const artworks: Artwork[] = [
    {
      id: 1,
      title: 'Portrait Study in Charcoal',
      artist: 'Priya Sharma',
      category: 'Sketches & Drawings',
      technique: 'Charcoal',
      date: '2024-12-15',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
      description: 'A detailed portrait study exploring light and shadow techniques using charcoal on textured paper.',
      likes: 45,
      views: 234,
      tags: ['portrait', 'charcoal', 'realistic'],
      level: 'Intermediate'
    },
    {
      id: 2,
      title: 'Abstract Watercolor Landscape',
      artist: 'Vikram Patel',
      category: 'Paintings',
      technique: 'Watercolor',
      date: '2024-12-10',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
      description: 'An abstract interpretation of a mountain landscape using flowing watercolor techniques.',
      likes: 67,
      views: 456,
      tags: ['landscape', 'watercolor', 'abstract'],
      level: 'Advanced'
    },
    {
      id: 3,
      title: 'Still Life with Fruits',
      artist: 'Meera Kapoor',
      category: 'Paintings',
      technique: 'Oil on Canvas',
      date: '2024-12-08',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
      description: 'A classical still life composition featuring seasonal fruits with dramatic lighting.',
      likes: 52,
      views: 312,
      tags: ['still-life', 'oil-painting', 'classical'],
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'Urban Sketch Series',
      artist: 'Arjun Singh',
      category: 'Sketches & Drawings',
      technique: 'Ink and Pen',
      date: '2024-12-05',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
      description: 'Quick urban sketches capturing the essence of city life and architecture.',
      likes: 38,
      views: 189,
      tags: ['urban', 'ink', 'architecture'],
      level: 'Beginner'
    },
    {
      id: 5,
      title: 'Floral Mandala',
      artist: 'Kavya Reddy',
      category: 'Workshop Creations',
      technique: 'Colored Pencils',
      date: '2024-12-03',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
      description: 'Intricate mandala design inspired by traditional Indian patterns and floral motifs.',
      likes: 73,
      views: 521,
      tags: ['mandala', 'floral', 'traditional'],
      level: 'Advanced'
    },
    {
      id: 6,
      title: 'Animal Portrait - Tiger',
      artist: 'Rohit Kumar',
      category: 'Sketches & Drawings',
      technique: 'Graphite',
      date: '2024-11-28',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
      description: 'Detailed wildlife portrait showcasing texture and expression techniques.',
      likes: 89,
      views: 678,
      tags: ['wildlife', 'graphite', 'portrait'],
      level: 'Advanced'
    },
    {
      id: 7,
      title: 'Sunset Seascape',
      artist: 'Anita Joshi',
      category: 'Paintings',
      technique: 'Acrylic',
      date: '2024-11-25',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
      description: 'Vibrant seascape capturing the golden hour with bold acrylic techniques.',
      likes: 61,
      views: 398,
      tags: ['seascape', 'acrylic', 'sunset'],
      level: 'Intermediate'
    },
    {
      id: 8,
      title: 'Abstract Composition',
      artist: 'Deepak Gupta',
      category: 'Mixed Media',
      technique: 'Mixed Media',
      date: '2024-11-20',
      image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
      description: 'Experimental piece combining various materials and techniques for textural depth.',
      likes: 44,
      views: 267,
      tags: ['abstract', 'experimental', 'texture'],
      level: 'Advanced'
    },
    {
      id: 9,
      title: 'Botanical Study',
      artist: 'Sneha Iyer',
      category: 'Sketches & Drawings',
      technique: 'Watercolor Pencils',
      date: '2024-11-18',
      image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
      description: 'Scientific botanical illustration with precise detail and natural coloring.',
      likes: 56,
      views: 334,
      tags: ['botanical', 'scientific', 'nature'],
      level: 'Intermediate'
    }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'All' || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ArtworkCard = ({ artwork }: { artwork: Artwork }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedArtwork(artwork)}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Heart size={16} className="text-red-500" />
          </button>
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Share2 size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Level badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            artwork.level === 'Beginner' ? 'bg-green-500 text-white' :
            artwork.level === 'Intermediate' ? 'bg-yellow-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            {artwork.level}
          </span>
        </div>

        {/* Stats overlay */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Heart size={14} />
                <span>{artwork.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{artwork.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {artwork.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <User size={14} />
          <span className="font-body text-sm">{artwork.artist}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 mb-3">
          <Tag size={14} />
          <span className="font-body text-sm">{artwork.technique}</span>
        </div>
        <p className="font-serif text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {artwork.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {artwork.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const ArtworkModal = ({ artwork }: { artwork: Artwork }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedArtwork(null)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-96 object-cover rounded-t-3xl"
          />
          <button
            onClick={() => setSelectedArtwork(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">{artwork.title}</h2>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-body">{artwork.artist}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="font-body">{new Date(artwork.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors">
                <Heart size={18} className="text-red-500" />
              </button>
              <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Share2 size={18} className="text-blue-500" />
              </button>
              <button className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                <Download size={18} className="text-green-500" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="font-display font-semibold text-gray-800 mb-2">Category</h4>
              <p className="font-body text-gray-600">{artwork.category}</p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-gray-800 mb-2">Technique</h4>
              <p className="font-body text-gray-600">{artwork.technique}</p>
            </div>
            <div>
              <h4 className="font-display font-semibold text-gray-800 mb-2">Level</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                artwork.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                artwork.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {artwork.level}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-display font-semibold text-gray-800 mb-3">Description</h4>
            <p className="font-serif text-gray-600 leading-relaxed">{artwork.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-display font-semibold text-gray-800 mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {artwork.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Heart size={18} className="text-red-500" />
                <span className="font-body">{artwork.likes} likes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Eye size={18} />
                <span className="font-body">{artwork.views} views</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-body">Back to Home</span>
              </button>
              <div className="hidden sm:block w-px h-6 bg-gray-300" />
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-800">
                Art Gallery
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-body"
                />
              </div>
              
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-6">
          <p className="font-serif text-lg text-gray-600 max-w-3xl">
            Explore our students' creative journey through various art forms and achievements. 
            Each piece represents dedication, learning, and artistic growth at Kalakar Art Academy.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={18} className="text-gray-500 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-body text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Category Display */}
      <div className="container mx-auto px-4 xs:px-6 sm:px-8 lg:px-12 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
              {selectedCategory === 'All' ? 'All Artworks' : selectedCategory}
            </h2>
            <p className="font-body text-gray-600">
              {selectedCategory === 'Sketches & Drawings' && 'Pencil, charcoal, and ink artworks showcasing various techniques and styles.'}
              {selectedCategory === 'Paintings' && 'Colorful expressions using watercolor, oil, acrylic, and mixed media.'}
              {selectedCategory === 'Workshop Creations' && 'Special projects and collaborative works from our intensive workshops.'}
              {selectedCategory === 'All' && `Showing ${filteredArtworks.length} artworks from our talented students.`}
            </p>
          </div>
          <div className="text-right">
            <p className="font-body text-sm text-gray-500">
              {filteredArtworks.length} {filteredArtworks.length === 1 ? 'artwork' : 'artworks'}
            </p>
          </div>
        </div>

        {/* Artworks Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">No artworks found</h3>
            <p className="font-body text-gray-600">
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}
      </div>

      {/* Artwork Modal */}
      <AnimatePresence>
        {selectedArtwork && <ArtworkModal artwork={selectedArtwork} />}
      </AnimatePresence>
    </div>
  );
};

export default FullGallery;