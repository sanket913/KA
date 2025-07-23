import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Beginner Course Student',
      content: 'Kalakar Art Academy transformed my relationship with art. As an absolute beginner, I was nervous about starting, but the instructors were incredibly supportive and helped me discover talents I didn\'t know I had.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg', // Young woman with artistic background
    },
    {
      name: 'Sanket Prajapati',
      role: 'Software Developer',
      content: 'The classes at Kalakar pushed me beyond my comfort zone and helped me develop my unique style. The small class size ensures everyone gets personalized attention and feedback. Highly recommended!',
      rating: 5,
      image: '/t1.jpg', // Young man/boy with creative look
    },
    {
      name: 'Meera Kapoor',
      role: 'Weekend Workshop Participant',
      content: 'As a busy professional, I appreciate the flexible schedule options. The weekend workshops are perfect for my lifestyle, and I\'ve seen tremendous improvement in my sketching skills in just a few months.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', // Professional woman
    },
  ];

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">
            Testimonials
          </h2>
          <p className="font-script text-base xs:text-lg sm:text-xl md:text-2xl text-purple-600 font-semibold mb-3 xs:mb-4 sm:mb-6">
            What Our Students Say
          </p>
          <p className="font-serif text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-5xl mx-auto px-2 xs:px-4 sm:px-0 leading-relaxed font-light">
            Hear from our community of artists about their experiences at Kalakar Art Academy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-800 to-blue-900 p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl xs:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-3 xs:mb-4 sm:mb-6">
                <Quote size={20} className="xs:w-6 xs:h-6 sm:w-8 sm:h-8 text-purple-400 mr-2 xs:mr-3 sm:mr-4" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <p className="font-serif text-xs xs:text-sm sm:text-base md:text-lg  text-white mb-3 xs:mb-4 sm:mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center">
                <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden mr-2 xs:mr-3 sm:mr-4 shadow-lg">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient background if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #9333ea, #ec4899)';
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-lg">${testimonial.name.charAt(0)}</div>`;
                      }
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-xs xs:text-sm sm:text-base md:text-lg">{testimonial.name}</h4>
                  <p className="font-body text-sky-300 text-xs sm:text-sm md:text-base">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
