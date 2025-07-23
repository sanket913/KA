
import { motion } from 'framer-motion';
import { 
  Palette, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Brush,
  Sparkles,
  Award,
  Users,
  Heart,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about', icon: Users },
    { name: 'Our Courses', href: '#courses', icon: Award },
    { name: 'Student Gallery', href: '#gallery', icon: Palette },
    { name: 'Contact Us', href: '#contact', icon: Phone },
  ];

  const courses = [
    { name: 'Art Foundations', level: 'Beginner', color: 'from-green-400 to-blue-500' },
    { name: 'Skill Building', level: 'Intermediate', color: 'from-purple-400 to-pink-500' },
    { name: 'Artistic Mastery', level: 'Advanced', color: 'from-orange-400 to-red-500' },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      color: 'from-blue-500 to-blue-600', 
      href: '#',
      name: 'Facebook'
    },
    { 
      icon: Instagram, 
      color: 'from-pink-500 to-purple-600', 
      href: '#',
      name: 'Instagram'
    },
    { 
      icon: Twitter, 
      color: 'from-blue-400 to-blue-500', 
      href: '#',
      name: 'Twitter'
    },
    { 
      icon: Youtube, 
      color: 'from-red-500 to-red-600', 
      href: '#',
      name: 'YouTube'
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 8866742028',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'kalakarartacademy@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Duplex Shop no.47, Near Entry Gate of Samanvay Samipya Complex, Harni-Sama Link Road, Vadodara, Gujarat 390022',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const academyHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ];

  const handleNavClick = (href: string) => {
    // Check if we're on gallery page
    const isGalleryPage = document.querySelector('[data-page="gallery"]');
    
    if (isGalleryPage) {
      // If on gallery page, navigate to home page with section
      window.location.href = `/${href}`;
    } else {
      // If on home page, scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartJourneyClick = () => {
    // Check if we're on gallery page
    const isGalleryPage = document.querySelector('[data-page="gallery"]');
    
    if (isGalleryPage) {
      // If on gallery page, navigate to home page courses section
      window.location.href = '/#courses';
    } else {
      // If on home page, scroll to courses section
      const coursesSection = document.querySelector('#courses');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Artistic Background Elements */}
      <div className="absolute inset-0">
        {/* Floating paint drops */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, ${
                ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#a8e6cf'][Math.floor(Math.random() * 5)]
              }, ${
                ['#ff3838', '#ffb347', '#2196f3', '#e91e63', '#4caf50'][Math.floor(Math.random() * 5)]
              })`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 lg:pt-20 pb-8">
          
          {/* Top Section - Logo and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            {/* CTA Button */}
            <motion.button
              className="group relative bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 text-white px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartJourneyClick}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-2">
                <Brush className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-body">Start Your Artistic Journey</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </motion.div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                Quick Links
              </h4>
              <div className="space-y-3 md:space-y-4">
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="group flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 w-full text-left"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <link.icon className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <span className="font-body text-sm md:text-base group-hover:text-purple-300 transition-colors">
                      {link.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Our Courses */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                Our Courses
              </h4>
              <div className="space-y-3 md:space-y-4">
                {courses.map((course, index) => (
                  <motion.button
                    key={course.name}
                    className="group cursor-pointer w-full text-left"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={handleStartJourneyClick}
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                      <div className={`w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r ${course.color} rounded-full`} />
                      <div className="flex-1">
                        <div className="font-body text-sm md:text-base text-white group-hover:text-purple-300 transition-colors">
                          {course.name}
                        </div>
                        <div className="font-body text-xs md:text-sm text-gray-400">
                          {course.level} Level
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                Contact Info
              </h4>
              <div className="space-y-4 md:space-y-5">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-body font-semibold text-white text-sm md:text-base mb-1">
                          {info.title}
                        </div>
                        <div className="font-body text-gray-300 text-xs md:text-sm leading-relaxed break-words">
                          {info.content}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Academy Hours & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Academy Hours */}
              <div>
                <h4 className="font-display text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  Academy Hours
                </h4>
                <div className="space-y-2 md:space-y-3">
                  {academyHours.map((schedule, index) => (
                    <motion.div
                      key={schedule.day}
                      className="flex justify-between items-center p-2 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="font-body text-gray-300 text-xs md:text-sm">
                        {schedule.day}
                      </span>
                      <span className="font-body text-white text-xs md:text-sm font-semibold">
                        {schedule.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-display text-lg md:text-xl font-bold mb-4 flex items-center">
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400 mr-2" />
                  Follow Us
                </h4>
                <p className="font-body text-gray-300 text-xs md:text-sm mb-4 leading-relaxed">
                  Stay updated with our latest events, workshops, and student showcases.
                </p>
                <div className="flex gap-3 md:gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <social.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 bg-black/20 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
              
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="font-body text-gray-400 text-sm md:text-base">
                  © 2025 <span className="text-purple-300 font-semibold">Kalakar Art Academy</span>. All rights reserved.
                </p>
                <p className="font-script text-xs md:text-sm text-gray-500 mt-1">
                  Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-400 inline mx-1" /> for artists
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
                  <motion.a
                    key={link}
                    href="#"
                    className="font-body text-gray-400 hover:text-purple-300 transition-colors text-sm md:text-base"
                    whileHover={{ y: -1 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
