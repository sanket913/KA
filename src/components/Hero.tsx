
import { motion } from 'framer-motion';
import { ArrowRight,  Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 xs:pt-28 sm:pt-32 md:pt-36 lg:pt-40 xl:pt-44
">
      {/* Crystal Clear Background - No Blur */}
      <div className="absolute inset-0">
        {/* Background Image - Crystal Clear */}
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent sm:bg-none z-10"></div>
          <img
            src="/1.png"
            alt="Art studio background"
            className="w-full h-full object-cover object-[center_20%] sm:object-center"
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
      <div className="relative z-30 container mx-auto px-4 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-4 xs:py-6 sm:py-8 md:py-12 lg:py-16">
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
              className="flex justify-center lg:justify-start mb-4 sm:mb-6 md:mb-8"
            >
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-5 md:px-7 py-1.5 sm:py-2.5 md:py-3 border border-white/20 shadow-md">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1e3a8a]" />
                <span className="font-script text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Welcome to Creativity
                </span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1e3a8a]" />
              </div>
            </motion.div>


            {/* Hindi tagline */}
           <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-script text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center sm:text-left mb-3 sm:mb-4 md:mb-5 lg:mb-6 px-4 sm:px-0 leading-snug"
              style={{
                textShadow: `
                  1px 1px 3px rgba(0, 0, 0, 0.3),
                  0 0 8px rgba(0, 0, 0, 0.15)
                `
              }}
            >
              हर घर में छुपा है
            </motion.h2>






            
            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 leading-tight tracking-tight text-center sm:text-left px-2 sm:px-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            >
              एक{' '}
              <span className="relative inline-block">
                <span
                  className="font-script italic text-white drop-shadow-[0_2px_4px_rgba(30,58,138,0.6)]"
                >
                  कलाकार
                </span>
              </span>
            </motion.h1>



           <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-serif text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-100 mb-4 xs:mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed max-w-2xl lg:max-w-3xl font-light drop-shadow-lg text-center sm:text-left px-3 sm:px-0"
            style={{
              textShadow: `
                0 2px 8px rgba(0, 0, 0, 0.8),
                0 0 20px rgba(0, 0, 0, 0.6)
              `
            }}
          >
            At <span className="text-white font-semibold">Kalakar Art Academy</span>,<br className="hidden sm:block" />
            discover the world of <span className="italic text-white">Sketching</span>,{' '}
            <span className="italic text-white">Drawing</span>, and{' '}
            <span className="italic text-white">Painting</span>.
          </motion.p>


            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-6 justify-center lg:justify-start items-center sm:items-start mb-2 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10"
            >
              <motion.button
              className="group relative w-auto sm:w-auto bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#1e429f] text-white 
                  px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 
                  py-2 xs:py-2.5 sm:py-3 md:py-4 
                  rounded-full font-semibold 
                  text-sm xs:text-sm sm:text-base md:text-lg 
                  flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 
                  hover:shadow-xl transition-all duration-300 font-body 
                  overflow-hidden backdrop-blur-md border border-white/20"
                  onClick={() => {
                    document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
                  }}
                            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] via-[#1e3a8a] to-[#1e429f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <span className="relative z-10">Explore Courses</span>
              <ArrowRight
                size={16}
                className="relative z-10 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>


              
            </motion.div>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
