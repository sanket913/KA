import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Award, ArrowRight, Users, Star, Palette, Brush, Heart, CheckCircle } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Courses = () => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('Kids');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const ageGroups = [
    {
      name: 'Kids',
      ageRange: '5-12 years',
      icon: Heart,
      color: 'from-green-400 to-blue-500',
      description: 'Fun and creative art exploration for young minds'
    },
    {
      name: 'Teens',
      ageRange: '13-17 years',
      icon: Star,
      color: 'from-purple-400 to-pink-500',
      description: 'Skill development and artistic expression for teenagers'
    },
    {
      name: 'Adults',
      ageRange: '18+ years',
      icon: Award,
      color: 'from-orange-400 to-red-500',
      description: 'Professional art training and personal enrichment'
    }
  ];

  const coursesData = {
    Kids: [
      {
        level: 'Level 1: Creative Foundations',
        hindiName: 'नए कलाकार',
        title: 'Little Artists Program',
        description: 'Introduction to colors, shapes, and basic drawing through fun activities, storytelling, and imaginative play. Perfect for developing creativity and fine motor skills.',
        duration: '1 month',
        sessions: '8 sessions',
        classSize: '6-8 kids',
        fee: '₹2,500',
        features: [
          'Art supplies included',
          'Take-home projects',
          'Progress certificate',
          'Parent showcase event'
        ],
        color: 'from-green-400 to-blue-500',
        image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        highlights: ['Fun & Play-based', 'Safe Materials', 'Small Groups'],
        technique: 'Mixed Media'
      },
      {
        level: 'Level 2: Skill Builders',
        hindiName: 'उभरते कलाकार',
        title: 'Young Creators Workshop',
        description: 'Building on basics with structured drawing, painting techniques, and craft projects. Introduces different mediums like watercolors, crayons, and clay.',
        duration: '1.5 months',
        sessions: '12 sessions',
        classSize: '6-8 kids',
        fee: '₹3,500',
        features: [
          'Multiple art mediums',
          'Skill development focus',
          'Individual portfolio',
          'Monthly progress review'
        ],
        color: 'from-cyan-400 to-teal-500',
        image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
        highlights: ['Structured Learning', 'Portfolio Building', 'Creative Growth'],
        technique: 'Watercolor & Clay'
      },
      {
        level: 'Level 3: Advanced Explorers',
        hindiName: 'प्रख्यात कलाकार',
        title: 'Junior Artist Academy',
        description: 'Advanced techniques in drawing, painting, and mixed media. Introduction to art history and famous artists through engaging activities and projects.',
        duration: '2 months',
        sessions: '16 sessions',
        classSize: '6-8 kids',
        fee: '₹4,500',
        features: [
          'Advanced techniques',
          'Art history introduction',
          'Exhibition participation',
          'Achievement certificate'
        ],
        color: 'from-indigo-400 to-purple-500',
        image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        highlights: ['Advanced Skills', 'Art History', 'Exhibition Ready'],
        technique: 'Mixed Media'
      }
    ],
    Teens: [
      {
        level: 'Level 1: Foundation Skills',
        hindiName: 'नए कलाकार',
        title: 'Teen Art Foundations',
        description: 'Comprehensive introduction to drawing fundamentals, color theory, and basic painting techniques. Focus on building confidence and artistic vocabulary.',
        duration: '1.5 months',
        sessions: '12 sessions',
        classSize: '8-10 teens',
        fee: '₹4,000',
        features: [
          'Drawing fundamentals',
          'Color theory basics',
          'Sketchbook included',
          'Peer feedback sessions'
        ],
        color: 'from-purple-400 to-pink-500',
        image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
        highlights: ['Skill Building', 'Confidence Boost', 'Peer Learning'],
        technique: 'Pencil & Charcoal'
      },
      {
        level: 'Level 2: Technique Mastery',
        hindiName: 'उभरते कलाकार',
        title: 'Intermediate Art Studio',
        description: 'Advanced drawing, painting, and mixed media techniques. Exploration of different styles and development of personal artistic voice.',
        duration: '2 months',
        sessions: '16 sessions',
        classSize: '8-10 teens',
        fee: '₹5,500',
        features: [
          'Multiple mediums',
          'Style exploration',
          'Personal projects',
          'Technique workshops'
        ],
        color: 'from-pink-400 to-rose-500',
        image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        highlights: ['Style Development', 'Personal Voice', 'Advanced Skills'],
        technique: 'Acrylic & Oil'
      },
      {
        level: 'Level 3: Portfolio Preparation',
        hindiName: 'प्रख्यात कलाकार',
        title: 'Pre-College Art Program',
        description: 'Portfolio development for college applications, advanced techniques, and professional presentation skills. Includes career guidance in art fields.',
        duration: '3 months',
        sessions: '24 sessions',
        classSize: '6-8 teens',
        fee: '₹8,000',
        features: [
          'Portfolio development',
          'College prep guidance',
          'Professional presentation',
          'Career counseling'
        ],
        color: 'from-violet-400 to-purple-600',
        image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
        highlights: ['College Ready', 'Portfolio Focus', 'Career Guidance'],
        technique: 'Professional Media'
      }
    ],
    Adults: [
      {
        level: 'Level 1: Art Foundations',
        hindiName: 'नए कलाकार',
        title: 'Beginner Adult Program',
        description: 'Perfect for adults starting their artistic journey. Covers basic drawing, painting fundamentals, and stress-relief through art in a supportive environment.',
        duration: '2 months',
        sessions: '16 sessions',
        classSize: '8-10 adults',
        fee: '₹6,000',
        features: [
          'Beginner-friendly approach',
          'Stress relief focus',
          'Flexible scheduling',
          'Adult learning methods'
        ],
        color: 'from-orange-400 to-red-500',
        image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        highlights: ['Beginner Friendly', 'Stress Relief', 'Flexible Schedule'],
        technique: 'Watercolor & Pencil'
      },
      {
        level: 'Level 2: Skill Development',
        hindiName: 'उभरते कलाकार',
        title: 'Intermediate Art Workshop',
        description: 'Advanced techniques in various mediums, perspective drawing, and realistic rendering. Focus on developing technical skills and artistic confidence.',
        duration: '2.5 months',
        sessions: '20 sessions',
        classSize: '8-10 adults',
        fee: '₹7,500',
        features: [
          'Advanced techniques',
          'Multiple mediums',
          'Technical skill focus',
          'Individual guidance'
        ],
        color: 'from-red-400 to-pink-500',
        image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg',
        highlights: ['Technical Skills', 'Multiple Mediums', 'Personal Growth'],
        technique: 'Oil & Acrylic'
      },
      {
        level: 'Level 3: Professional Mastery',
        hindiName: 'प्रख्यात कलाकार',
        title: 'Advanced Art Mastery',
        description: 'Professional-level training including advanced painting, figure drawing, and business aspects of art. Preparation for exhibitions and art sales.',
        duration: '3 months',
        sessions: '24 sessions',
        classSize: '6-8 adults',
        fee: '₹10,000',
        features: [
          'Professional techniques',
          'Business guidance',
          'Exhibition preparation',
          'Networking opportunities'
        ],
        color: 'from-amber-400 to-orange-600',
        image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
        highlights: ['Professional Level', 'Business Skills', 'Exhibition Ready'],
        technique: 'Professional Media'
      }
    ]
  };

  const currentCourses = coursesData[selectedAgeGroup as keyof typeof coursesData];
  const currentAgeGroup = ageGroups.find(group => group.name === selectedAgeGroup);

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course);
    setIsPaymentModalOpen(true);
  };

  return (
    <section id="courses" className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">
            Our Courses
          </h2>
          <p className="font-script text-base xs:text-lg sm:text-xl md:text-2xl text-purple-600 font-semibold mb-3 xs:mb-4 sm:mb-6">
            Tailored Learning for Every Age
          </p>
          <p className="font-serif text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover the perfect art program designed specifically for your age group and skill level. 
            From playful exploration to professional mastery.
          </p>
        </motion.div>

        {/* Age Group Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 xs:gap-4 sm:gap-6 mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          {ageGroups.map((group, index) => (
            <motion.button
              key={group.name}
              onClick={() => setSelectedAgeGroup(group.name)}
              className={`group relative w-full sm:w-auto px-4 xs:px-6 sm:px-8 md:px-10 py-3 xs:py-4 sm:py-5 md:py-6 rounded-2xl xs:rounded-3xl font-bold text-sm xs:text-base sm:text-lg md:text-xl transition-all duration-300 overflow-hidden ${
                selectedAgeGroup === group.name
                  ? 'text-white shadow-2xl transform scale-105'
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200 hover:scale-105'
              }`}
              whileHover={{ scale: selectedAgeGroup === group.name ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Animated background for active state */}
              {selectedAgeGroup === group.name && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${group.color}`}
                  layoutId="activeBackground"
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
              )}
              
              <div className="relative flex flex-col sm:flex-row items-center gap-2 xs:gap-3">
                <group.icon size={20} className="xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                <div className="text-center sm:text-left">
                  <div className="font-display font-bold">{group.name}</div>
                  <div className="text-xs xs:text-sm opacity-80">{group.ageRange}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Age Group Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAgeGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          >
            <div className={`inline-flex items-center gap-3 xs:gap-4 px-4 xs:px-6 sm:px-8 py-2 xs:py-3 sm:py-4 bg-gradient-to-r ${currentAgeGroup?.color} rounded-full text-white mb-3 xs:mb-4 sm:mb-6`}>
              {currentAgeGroup?.icon && <currentAgeGroup.icon size={20} className="xs:w-6 xs:h-6" />}
              <span className="font-display font-bold text-sm xs:text-base sm:text-lg md:text-xl">
                {selectedAgeGroup} Program ({currentAgeGroup?.ageRange})
              </span>
            </div>
            <p className="font-serif text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {currentAgeGroup?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAgeGroup}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-10"
          >
            {currentCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group bg-white rounded-2xl xs:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Course Image Header with Enhanced Overlay */}
                <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 overflow-hidden">
                  {/* Base gradient overlay - always visible */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-85 z-10`}></div>
                  
                  {/* Enhanced dark overlay for better text visibility */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500 z-20"></div>
                  
                  {/* Background image */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Text content with enhanced visibility */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 xs:p-4 z-30">
                    <div className="text-xs xs:text-sm font-semibold opacity-95 mb-1 xs:mb-2 text-center text-shadow-lg">
                      {course.level}
                    </div>
                    
                    {/* Hindi Name - Enhanced with better contrast */}
                    <div className="font-script text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-yellow-200 mb-1 xs:mb-2 text-center drop-shadow-2xl text-shadow-lg">
                      {course.hindiName}
                    </div>
                    
                    <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-center leading-tight text-shadow-lg">
                      {course.title}
                    </h3>
                  </div>
                  
                  {/* Price Badge with enhanced visibility */}
                  <div className="absolute top-3 xs:top-4 right-3 xs:right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 xs:px-3 py-1 xs:py-1.5 z-30 shadow-lg">
                    <span className="font-bold text-gray-800 text-xs xs:text-sm sm:text-base">
                      {course.fee}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-4 xs:p-5 sm:p-6 md:p-8">
                  {/* Hindi Name Display in Content */}
                  <div className="text-center mb-3 xs:mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r ${course.color} rounded-full text-white text-xs xs:text-sm font-semibold`}>
                      <Brush size={14} className="xs:w-4 xs:h-4" />
                      <span className="font-script">{course.hindiName}</span>
                    </div>
                  </div>

                  <p className="font-serif text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 mb-4 xs:mb-5 sm:mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6">
                    <div className="flex items-center gap-1.5 xs:gap-2 text-purple-600">
                      <Clock size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-base">
                          {course.duration}
                        </div>
                        <div className="text-xs opacity-75">{course.sessions}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 xs:gap-2 text-green-600">
                      <Users size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                      <div>
                        <div className="font-semibold text-xs xs:text-sm sm:text-base">
                          Small Class
                        </div>
                        <div className="text-xs opacity-75">{course.classSize}</div>
                      </div>
                    </div>
                  </div>

                  {/* Course Highlights */}
                  <div className="mb-4 xs:mb-5 sm:mb-6">
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 mb-3 xs:mb-4">
                      {course.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className={`px-2 xs:px-3 py-1 bg-gradient-to-r ${course.color} text-white rounded-full text-xs xs:text-sm font-medium`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Course Features */}
                  <div className="mb-4 xs:mb-5 sm:mb-6">
                    <h4 className="font-display font-semibold text-gray-800 mb-2 xs:mb-3 text-sm xs:text-base">
                      What's Included:
                    </h4>
                    <div className="space-y-1.5 xs:space-y-2">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 xs:gap-3">
                          <CheckCircle size={14} className="xs:w-4 xs:h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 text-xs xs:text-sm sm:text-base">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enroll Button */}
                  <motion.button
                    onClick={() => handleEnrollClick(course)}
                    className={`w-full bg-gradient-to-r ${course.color} text-white py-2.5 xs:py-3 sm:py-4 rounded-xl xs:rounded-2xl font-semibold flex items-center justify-center gap-1.5 xs:gap-2 hover:shadow-lg transition-all text-xs xs:text-sm sm:text-base md:text-lg group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Palette size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
                    <span>Enroll Now</span>
                    <ArrowRight size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Additional Information */}
       
      </div>

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      )}
    </section>
  );
};

export default Courses;