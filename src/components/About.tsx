
import { motion } from 'framer-motion';
import { Users, Award, Clock, Palette } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Users,
      title: 'Expert Instructors',
      description: 'Learn from professional artists with years of teaching experience',
    },
    {
      icon: Award,
      title: 'Small Class Sizes',
      description: 'Personalized attention with maximum 10 students per class',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Morning, evening and weekend classes to suit your availability',
    },
  ];

  return (
    <section id="about" className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">
            About <span className="font-script text-purple-600 italic">Kalakar</span> Art Academy
          </h2>
          <p className="font-script text-base xs:text-lg sm:text-xl md:text-2xl text-purple-600 font-semibold mb-3 xs:mb-4 sm:mb-6">
            Where Creativity Comes to Life
          </p>
          <p className="font-serif text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-5xl mx-auto px-2 xs:px-4 sm:px-0 leading-relaxed font-light">
            Founded in 2025, Kalakar Art Academy is dedicated to nurturing artistic talent 
            through structured learning, creative exploration, and supportive mentorship.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12 items-center mb-8 xs:mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="w-full h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl xs:rounded-2xl overflow-hidden">
                <img
                  src="/gallery25.jpg"
                  alt="Art studio at Kalakar Academy"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 xs:-bottom-3 xs:-right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-yellow-400 rounded-xl xs:rounded-2xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Palette size={20} className="xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 px-2 xs:px-0"
          >
            <h3 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 xs:mb-4 sm:mb-6">Our Philosophy</h3>
            <p className="font-serif text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 mb-4 xs:mb-6 sm:mb-8 leading-relaxed font-light">
              At <span className="font-script text-purple-600 font-semibold">Kalakar</span>, we believe everyone has an artist within. Our mission is to provide 
              a nurturing environment where students of all ages and skill levels can discover 
              and develop their artistic abilities. Through structured learning and creative 
              freedom, we help students build confidence and express their unique vision.
            </p>
          </motion.div>
        </div>

        {/* Features Grid - Now 3 columns, responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl xs:rounded-2xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl xs:rounded-2xl flex items-center justify-center mb-3 xs:mb-4 sm:mb-6">
                <feature.icon size={20} className="xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h4 className="font-display text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">{feature.title}</h4>
              <p className="font-body text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;