
import { motion } from 'framer-motion';
import { ArrowRight,  Sparkles, Brush } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 xs:pt-14 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-22">
      {/* Crystal Clear Background - No Blur */}
      <div className="absolute inset-0">
        {/* Background Image - Crystal Clear */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/1.png"
            alt="Art studio background"
            className="w-full h-full object-fill"
            onError={(e) => {
              // Fallback to gradient if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #1e1b4b, #7c3aed, #ec4899)';
              }
            }}
          />
        </div>
       
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Single floating art image - UNBLURRED, Crystal Clear */}
      <div className="absolute inset-0 hidden md:block">
        <motion.div
          className="absolute top-[20%] right-[8%] w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 z-10"
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 0.9, 1],
            scale: [0, 1.1, 0.95, 1],
            rotate: [0, -15, -10, -15],
            y: [0, -20, 0, -10, 0],
            x: [0, 8, 0, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          whileHover={{ 
            scale: 1.15, 
            rotate: -5,
            z: 50,
            transition: { duration: 0.4 }
          }}
        >
          <div className="relative group cursor-pointer">
            {/* Crystal clear image container */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
  
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating sparkle effect on hover */}
            <motion.div
              className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"
              animate={{
                scale: [0, 1.2, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Creative floating icons - Reduced and repositioned */}
      <div className="absolute inset-0 hidden lg:block">

        <motion.div
          className="absolute bottom-[25%] left-[15%] z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0.3, 0.6],
            scale: [0, 1.1, 0.9, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 6,
            delay: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.3,
            rotate: -180,
            transition: { duration: 0.3 }
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
            <Sparkles 
              size={24} 
              className="relative text-pink-400 drop-shadow-2xl lg:w-6 lg:h-6 xl:w-8 xl:h-8" 
            />
          </div>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-30 container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-4 xs:py-6 sm:py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Left side content - Full width on mobile, left aligned on desktop */}
          <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            {/* Decorative top element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center lg:justify-start mb-3 xs:mb-4 sm:mb-6 md:mb-8"
            >
              <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 bg-white/10 backdrop-blur-md rounded-full px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-3 md:py-4 border border-white/20">
                <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400" />
                <span className="font-script text-white text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Welcome to Creativity
                </span>
                <Sparkles className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-pink-400" />
              </div>
            </motion.div>

            {/* Hindi tagline */}
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-script text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-yellow-300 font-medium mb-1.5 xs:mb-2 sm:mb-3 md:mb-4 lg:mb-6 drop-shadow-2xl text-shadow-lg"
              style={{
                textShadow: '0 0 20px rgba(253, 224, 71, 0.5), 0 0 40px rgba(253, 224, 71, 0.3), 0 4px 8px rgba(0, 0, 0, 0.8)'
              }}
            >
              हर घर में छुपा है
            </motion.h2>
            
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight tracking-tight drop-shadow-2xl text-shadow-xl"
              
            >
              एक{' '}
              <span className="relative inline-block">
                <span className=" font-script italic">
                  कलाकार
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="font-serif text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl lg:max-w-3xl font-light drop-shadow-2xl text-shadow"
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
              }}
            >
              At{' '}
                Kalakar Art Academy ,
              <br className="hidden sm:block" />
              Discover the world of{' '}
                Sketching
              ,{' '}
              
                Drawing
              , and{' '}
              
                Painting
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start items-center sm:items-start mb-6 xs:mb-8 sm:mb-12 md:mb-16 lg:mb-20"
            >
              <motion.button
                className="group relative w-full sm:w-auto bg-gradient-to-r from-sky-300 via-blue-500 to-blue-800 text-white px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 xs:py-3 sm:py-4 md:py-5 rounded-full font-semibold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 hover:shadow-2xl transition-all duration-300 font-body overflow-hidden backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 0 30px rgba(147, 51, 234, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <span className="relative z-10">Explore Courses</span>
                <ArrowRight size={14} className="relative z-10 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
            </motion.div>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
