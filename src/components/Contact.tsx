import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, CheckCircle, AlertCircle, Send, Loader } from 'lucide-react';
import { saveContactFormToDatabase } from '../utils/contactService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('📝 Submitting contact form...', formData);
      
      const result = await saveContactFormToDatabase(formData);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: '',
          message: '',
        });

        // Show success notification
        showSuccessNotification(formData.name);
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
          setSubmitMessage('');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error('❌ Error submitting contact form:', error);
      setSubmitStatus('error');
      setSubmitMessage('There was an error submitting your form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccessNotification = (name: string) => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10001;
      max-width: 400px;
      font-family: system-ui;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <div style="font-size: 24px;">📝</div>
        <div>
          <h4 style="margin: 0; font-size: 16px; font-weight: bold;">Message Sent Successfully!</h4>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Thank you, ${name}!</p>
        </div>
      </div>
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 15px;">
        🎯 Your message has been saved to our database
      </div>
      <div style="font-size: 12px; opacity: 0.8;">
        We'll get back to you within 24 hours.
      </div>
      <button onclick="this.parentElement.remove()" style="
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
      ">×</button>
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
          if (notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-2 xs:mb-3 sm:mb-4">
            Contact Us
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-purple-600 font-semibold mb-3 xs:mb-4">
            Get In Touch
          </p>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-5xl mx-auto px-2 xs:px-4 sm:px-0 leading-relaxed">
            Have questions about our courses or want to enroll? Reach out to us and our team will be happy to assist you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl xs:rounded-3xl shadow-lg order-2 lg:order-1"
          >
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 xs:mb-4 sm:mb-6">Send Us a Message</h3>
          

            <form onSubmit={handleSubmit} className="space-y-3 xs:space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs xs:text-sm sm:text-base"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs xs:text-sm sm:text-base"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs xs:text-sm sm:text-base"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Interested In</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-xs xs:text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  <option value="">Select a course</option>
                  <option value="kids-foundation">Kids Foundation Course</option>
                  <option value="kids-advanced">Kids Advanced Course</option>
                  <option value="teens-foundation">Teens Foundation Course</option>
                  <option value="teens-portfolio">Teens Portfolio Preparation</option>
                  <option value="adults-beginner">Adults Beginner Course</option>
                  <option value="adults-advanced">Adults Advanced Course</option>
                  <option value="workshops">Special Workshops</option>
                  <option value="general-inquiry">General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5 xs:mb-2 text-xs xs:text-sm sm:text-base">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your artistic interests or any questions you have..."
                  rows={4}
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-xs xs:text-sm sm:text-base"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h5 className="font-semibold text-green-800">Message Sent Successfully!</h5>
                      <p className="text-green-700 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <h5 className="font-semibold text-red-800">Error Sending Message</h5>
                      <p className="text-red-700 text-sm">{submitMessage}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 text-white py-2.5 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl font-semibold hover:shadow-lg transition-all text-xs xs:text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 xs:space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <div className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl xs:rounded-3xl shadow-lg">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 xs:mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 rounded-lg xs:rounded-xl flex items-center justify-center">
                    <Phone size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-xs xs:text-sm sm:text-base">Phone</h4>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base">+91 8866742028</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 rounded-lg xs:rounded-xl flex items-center justify-center">
                    <Mail size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-xs xs:text-sm sm:text-base">Email</h4>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base break-all">kalakarartacademy@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500 rounded-lg xs:rounded-xl flex items-center justify-center">
                    <MapPin size={16} className="xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-xs xs:text-sm sm:text-base">Location</h4>
                    <p className="text-gray-600 text-xs xs:text-sm sm:text-base">
                      Duplex Shop no.47,<br />
                      Near Entry Gate of Samanvay Samipya Complex<br />
                      Harni-Sama Link Road<br />
                      Vadodara, Gujarat 390022<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl xs:rounded-3xl shadow-lg">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 xs:mb-4 sm:mb-6">Academy Hours</h3>
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                  <Clock size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="text-gray-600 text-xs xs:text-sm sm:text-base">Monday - Friday: 9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                  <Clock size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="text-gray-600 text-xs xs:text-sm sm:text-base">Saturday: 10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                  <Clock size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span className="text-gray-600 text-xs xs:text-sm sm:text-base">Sunday: Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-2xl xs:rounded-3xl shadow-lg">
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 xs:mb-4 sm:mb-6">Follow Us</h3>
              <p className="text-gray-600 mb-3 xs:mb-4 sm:mb-6 text-xs xs:text-sm sm:text-base leading-relaxed">
                Stay updated with our latest events, workshops, and student showcases by following us on social media.
              </p>
              <div className="flex gap-2 xs:gap-3 sm:gap-4">
                {[
                  { icon: Facebook, color: 'from-blue-500 to-blue-600' },
                  { icon: Instagram, color: 'from-pink-500 to-purple-600' },
                  { icon: Twitter, color: 'from-blue-400 to-blue-500' },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${social.color} rounded-lg xs:rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={14} className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
