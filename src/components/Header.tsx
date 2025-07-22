import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette, Brush, Sparkles, Award, Users, Phone, Home } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Sample course for header CTA
  const sampleCourse = {
    title: 'Art Foundation Course',
    level: 'Beginner',
    hindiName: 'नए कलाकार',
    fee: '₹5,000',
    duration: '2 months',
    sessions: '16 sessions',
    technique: 'Mixed Media',
    color: 'from-purple-600 to-pink-600'
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect current page based on URL or page content
  useEffect(() => {
    const detectCurrentPage = () => {
      const path = window.location.pathname;
      const hasGalleryComponent = document.querySelector('[data-page="gallery"]');
      
      if (hasGalleryComponent || path.includes('gallery')) {
        setCurrentPage('gallery');
      } else {
        setCurrentPage('home');
      }
    };

    detectCurrentPage();
    
    // Listen for navigation changes
    window.addEventListener('popstate', detectCurrentPage);
    return () => window.removeEventListener('popstate', detectCurrentPage);
  }, []);

  const navItems = [
    { 
      name: 'Home', 
      href: '#home',
      icon: Home,
      color: 'from-purple-500 to-pink-500',
      description: 'Welcome to creativity'
    },
    { 
      name: 'About', 
      href: '#about',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      description: 'Our artistic journey'
    },
    { 
      name: 'Courses', 
      href: '#courses',
      icon: Award,
      color: 'from-green-500 to-emerald-500',
      description: 'Learn & create'
    },
    { 
      name: 'Gallery', 
      href: '#gallery',
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      description: 'Student masterpieces'
    },
    { 
      name: 'Contact', 
      href: '#contact',
      icon: Phone,
      color: 'from-indigo-500 to-purple-500',
      description: 'Get in touch'
    },
  ];

  const handleNavClick = (href: string, itemName: string) => {
    setIsMenuOpen(false);

    if (itemName === 'Home') {
      // Always go to home page
      window.location.href = '/';
      return;
    }

    if (itemName === 'Gallery') {
      // If we're already on gallery page, scroll to top
      if (currentPage === 'gallery') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to gallery page (this will be handled by App.tsx)
        const event = new CustomEvent('navigateToGallery');
        window.dispatchEvent(event);
      }
      return;
    }

    // For other sections (About, Courses, Contact)
    if (currentPage === 'gallery') {
      // If we're on gallery page, go back to home first then scroll to section
      window.location.href = `/${href}`;
    } else {
      // If we're on home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback: reload page and scroll to section
        window.location.href = `/${href}`;
      }
    }
  };

  const handleEnrollClick = () => {
    setIsMenuOpen(false);
    
    if (currentPage === 'gallery') {
      // If on gallery page, go to home page courses section
      window.location.href = '/#courses';
    } else {
      // If on home page, scroll to courses or open payment modal
      const coursesSection = document.querySelector('#courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        setIsPaymentModalOpen(true);
      }
    }
  };

  const handleLogoClick = () => {
    if (currentPage === 'gallery') {
      // Navigate back to home page
      window.location.href = '/';
    } else {
      // Scroll to top of home page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-purple-100' 
            : 'bg-white/90 backdrop-blur-lg shadow-md'
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 lg:h-22">
            
            {/* Logo */}
            <motion.div 
              className="cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogoClick}
            >
              <img
                src="/logo.png"
                alt="Kalakar Art Academy"
                className="
                  h-8 w-auto
                  xs:h-9
                  sm:h-10 
                  md:h-12 
                  lg:h-14 
                  xl:h-16 
                  2xl:h-18
                  object-contain 
                  transition-all duration-300
                  hover:opacity-90
                  max-w-none
                "
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              
              {/* Fallback icon */}
              <div 
                className="
                  h-8 w-8
                  xs:h-9 xs:w-9
                  sm:h-10 sm:w-10
                  md:h-12 md:w-12
                  lg:h-14 lg:w-14
                  xl:h-16 xl:w-16
                  2xl:h-18 2xl:w-18
                  bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 
                  rounded-xl
                  flex items-center justify-center 
                  cursor-pointer
                "
                style={{ display: 'none' }}
              >
                <Palette className="
                  w-4 h-4 
                  xs:w-5 xs:h-5 
                  sm:w-6 sm:h-6 
                  md:w-7 md:h-7 
                  lg:w-8 lg:h-8 
                  xl:w-9 xl:h-9 
                  2xl:w-10 2xl:h-10
                  text-white
                " />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.href, item.name)}
                    className="relative px-3 xl:px-4 py-2 xl:py-2.5 rounded-xl font-body font-medium text-sm xl:text-base text-gray-700 hover:text-white transition-all duration-300 overflow-hidden group cursor-pointer"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
                      initial={false}
                    />
                    
                    {/* Icon and text */}
                    <div className="relative flex items-center space-x-1.5 cursor-pointer">
                      <item.icon size={16} className="group-hover:scale-110 transition-transform duration-300" />
                      <span>{item.name}</span>
                    </div>
                    
                    {/* Hover tooltip */}
                    <motion.div
                      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                      initial={{ y: 5 }}
                      whileHover={{ y: 0 }}
                    >
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                    </motion.div>
                  </motion.button>
                </motion.div>
              ))}
              
              {/* CTA Button */}
              <motion.button
                onClick={handleEnrollClick}
                className="relative ml-2 xl:ml-4 px-4 xl:px-6 py-2 xl:py-2.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500
 text-white font-semibold text-sm xl:text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
                
                <div className="relative flex items-center space-x-1.5 cursor-pointer">
                  <Brush size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-body">Enroll Now</span>
                  <Sparkles size={14} className="group-hover:scale-125 transition-transform duration-300" />
                </div>
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} className="text-purple-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} className="text-purple-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-16 sm:top-18 md:top-20 lg:top-22 left-3 right-3 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-100 z-50 lg:hidden overflow-hidden"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="p-4 sm:p-6">
                
                {/* Mobile nav items */}
                <div className="space-y-2 sm:space-y-3">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href, item.name)}
                      className="w-full flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${item.color} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={16} className="sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left cursor-pointer">
                        <div className="font-body font-semibold text-sm sm:text-base text-gray-800 group-hover:text-purple-600 transition-colors">
                          {item.name}
                        </div>
                        <div className="font-body text-xs sm:text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                {/* Mobile CTA */}
                <motion.button 
                  onClick={handleEnrollClick}
                  className="w-full mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500
 text-white font-semibold text-sm sm:text-base rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Brush size={18} />
                  <span className="font-body">Start Your Journey</span>
                  <Sparkles size={16} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        course={sampleCourse}
      />
    </>
  );
};

export default Header;