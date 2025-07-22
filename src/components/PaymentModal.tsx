import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CreditCard,  
  CheckCircle, 
  Download, 
  Calendar,
  User,
  Phone,
  Palette,
  Star,
  ExternalLink,
  AlertCircle,
  ArrowLeft,
  Save
} from 'lucide-react';
import { generateInvoicePDF } from '../utils/invoiceGenerator';
import { saveEnrollmentToDatabase, type EnrollmentData } from '../utils/enrollmentService';

interface Course {
  title: string;
  level: string;
  hindiName: string;
  fee: string;
  duration: string;
  sessions: string;
  technique: string;
  color: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
}

interface PaymentData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  studentName: string;
  email: string;
  phone: string;
  address: string;
  course: Course;
  amount: number;
  transactionId: string;
}

// Declare Razorpay type for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Helper function to generate unique enrollment ID
const generateEnrollmentId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ENR${timestamp.slice(-8)}${random}`;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, course }) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'processing' | 'success' | 'failed'>('details');
  const [paymentData, setPaymentData] = useState<PaymentData>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [enrollmentId, setEnrollmentId] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSavingToDatabase, setIsSavingToDatabase] = useState(false);
  const [failureReason, setFailureReason] = useState<string>('');
  const [databaseSaveStatus, setDatabaseSaveStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const generateTransactionId = () => {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const generateInvoiceNumber = () => {
    return 'INV' + Date.now().toString().slice(-8);
  };

  const redirectToCoursesPage = () => {
    // Scroll to courses section
    const coursesSection = document.querySelector('#courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Close modal
    resetModal();
  };

  const saveEnrollmentToMongoDB = async (razorpayResponse: any, invoice: InvoiceData, enrollmentId: string) => {
    try {
      setIsSavingToDatabase(true);
      setDatabaseSaveStatus('pending');

      // Prepare enrollment data for database
      const enrollmentData: EnrollmentData = {
        enrollmentId,
        studentInfo: {
          name: paymentData.name,
          email: paymentData.email,
          phone: paymentData.phone,
          address: paymentData.address
        },
        courseInfo: {
          title: course.title,
          level: course.level,
          hindiName: course.hindiName,
          fee: course.fee,
          duration: course.duration,
          sessions: course.sessions,
          technique: course.technique,
          color: course.color
        },
        paymentInfo: {
          amount: invoice.amount,
          transactionId: invoice.transactionId,
          razorpayPaymentId: razorpayResponse.razorpay_payment_id,
          razorpayOrderId: razorpayResponse.razorpay_order_id,
          razorpaySignature: razorpayResponse.razorpay_signature,
          paymentStatus: 'success',
          paymentDate: new Date()
        },
        invoiceInfo: {
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.date
        },
        enrollmentDate: new Date(),
        status: 'active'
      };

      console.log('💾 Saving enrollment to database...', enrollmentData);

      // Call the enrollment service to save to database
      const result = await saveEnrollmentToDatabase(enrollmentData);
      
      if (result.success) {
        console.log('✅ Enrollment saved to database successfully');
        setDatabaseSaveStatus('success');
        showDatabaseSuccessNotification(enrollmentId);
      } else {
        throw new Error(result.message);
      }
      
    } catch (error) {
      console.error('❌ Error saving enrollment to database:', error);
      setDatabaseSaveStatus('failed');
      showDatabaseErrorNotification();
    } finally {
      setIsSavingToDatabase(false);
    }
  };

  const showDatabaseSuccessNotification = (enrollmentId: string) => {
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
      <div style="font-size: 12px; opacity: 0.8;">
        Our team will contact you within 24 hours with class details.
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

  const showDatabaseErrorNotification = () => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, #ef4444, #dc2626);
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
        <div style="font-size: 24px;">⚠️</div>
        <div>
          <h4 style="margin: 0; font-size: 16px; font-weight: bold;">Database Save Failed</h4>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Payment successful, but enrollment not saved</p>
        </div>
      </div>
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 15px;">
        📞 Please contact us at +91 8866742028 with your payment details
      </div>
      <div style="font-size: 12px; opacity: 0.8;">
        Your payment was successful. We'll manually add your enrollment.
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
    }, 8000);
  };

  const initializeRazorpayPayment = () => {
    const amount = parseInt(course.fee.replace('₹', '').replace(',', ''));
    
    // Razorpay configuration
    const options = {
      key: 'rzp_test_deJclZWsYK2wrx', // Dummy test key - replace with your actual test key
      amount: amount * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'Kalakar Art Academy',
      description: `${course.title} - ${course.hindiName}`,
      image: '/logo.png', // Academy logo
      order_id: '', // Will be generated by backend in production
      handler: function (response: any) {
        // Payment successful
        handlePaymentSuccess(response);
      },
      prefill: {
        name: paymentData.name,
        email: paymentData.email,
        contact: paymentData.phone
      },
      notes: {
        course_title: course.title,
        course_level: course.level,
        course_duration: course.duration,
        student_address: paymentData.address
      },
      theme: {
        color: '#9333ea' // Purple theme matching academy colors
      },
      modal: {
        ondismiss: function() {
          console.log('Razorpay payment modal closed by user');
          setCurrentStep('details');
        }
      },
      retry: {
        enabled: true,
        max_count: 3
      },
      timeout: 300, // 5 minutes timeout
      remember_customer: false
    };

    // Create Razorpay instance and open
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      
      // Handle payment failure
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        handlePaymentFailure(response.error);
      });

      // Open Razorpay checkout
      rzp.open();
      setCurrentStep('processing');
    } else {
      alert('Razorpay SDK not loaded. Please refresh the page and try again.');
    }
  };

  const handlePaymentFailure = (error: any) => {
    console.log('💳 Payment Failed:', error);
    
    // Set failure reason based on error
    let reason = 'Payment was unsuccessful. Please try again.';
    
    if (error.code) {
      switch (error.code) {
        case 'BAD_REQUEST_ERROR':
          reason = 'Invalid payment details. Please check your information and try again.';
          break;
        case 'GATEWAY_ERROR':
          reason = 'Payment gateway error. Please try again in a few minutes.';
          break;
        case 'NETWORK_ERROR':
          reason = 'Network connection issue. Please check your internet and try again.';
          break;
        case 'SERVER_ERROR':
          reason = 'Server error occurred. Please try again later.';
          break;
        default:
          reason = error.description || 'Payment failed. Please try again.';
      }
    }
    
    setFailureReason(reason);
    setCurrentStep('failed');
    
    // Auto-redirect to courses page after 5 seconds
    setTimeout(() => {
      redirectToCoursesPage();
    }, 5000);
  };

  const handlePaymentSuccess = async (razorpayResponse: any) => {
    console.log('Razorpay payment successful:', razorpayResponse);
    
    // Generate enrollment ID
    const newEnrollmentId = generateEnrollmentId();
    setEnrollmentId(newEnrollmentId);
    
    // Generate invoice data
    const invoice: InvoiceData = {
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toLocaleDateString(),
      studentName: paymentData.name,
      email: paymentData.email,
      phone: paymentData.phone,
      address: paymentData.address,
      course: course,
      amount: parseInt(course.fee.replace('₹', '').replace(',', '')),
      transactionId: razorpayResponse.razorpay_payment_id || generateTransactionId()
    };
    
    setInvoiceData(invoice);
    setCurrentStep('success');

    // Save to MongoDB database
    await saveEnrollmentToMongoDB(razorpayResponse, invoice, newEnrollmentId);

    // Log payment details for backend integration
    console.log('💳 Payment Details for Backend:', {
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
      enrollment_id: newEnrollmentId,
      invoice: invoice
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!paymentData.name || !paymentData.email || !paymentData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    // Initialize Razorpay payment
    initializeRazorpayPayment();
  };

  const downloadInvoice = async () => {
    if (!invoiceData) return;
    
    setIsDownloading(true);
    try {
      await generateInvoicePDF(invoiceData);
      
      // Show success message
      showDownloadSuccessMessage(invoiceData.invoiceNumber);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating invoice PDF. Please try again.');
    }
    setIsDownloading(false);
  };

  const showDownloadSuccessMessage = (invoiceNumber: string) => {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      max-width: 400px;
      font-family: system-ui;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <div style="font-size: 24px;">📄</div>
        <div>
          <h4 style="margin: 0; font-size: 16px; font-weight: bold;">Invoice Downloaded!</h4>
          <p style="margin: 0; font-size: 14px; opacity: 0.9;">Invoice #${invoiceNumber}</p>
        </div>
      </div>
      <div style="font-size: 14px; opacity: 0.9; margin-bottom: 15px;">
        📁 Check your Downloads folder for the PDF file
      </div>
      <div style="font-size: 12px; opacity: 0.8;">
        Keep this invoice for your records and future reference.
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
    
    // Auto-remove after 5 seconds
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

  const resetModal = () => {
    setCurrentStep('details');
    setPaymentData({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setInvoiceData(null);
    setEnrollmentId('');
    setFailureReason('');
    setDatabaseSaveStatus('pending');
    onClose();
  };

  const retryPayment = () => {
    setCurrentStep('details');
    setFailureReason('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={currentStep === 'success' || currentStep === 'failed' ? undefined : resetModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${
                  currentStep === 'failed' ? 'from-red-500 to-red-600' : course.color
                } rounded-2xl flex items-center justify-center`}>
                  {currentStep === 'failed' ? (
                    <AlertCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Palette className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800">
                    {currentStep === 'details' && 'Course Enrollment'}
                    {currentStep === 'processing' && 'Processing Payment'}
                    {currentStep === 'success' && 'Payment Successful'}
                    {currentStep === 'failed' && 'Payment Failed'}
                  </h2>
                  <p className="text-gray-600 font-body">
                    {course.title} - {course.fee}
                  </p>
                </div>
              </div>
              {currentStep !== 'processing' && (
                <button
                  onClick={resetModal}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Student Details Form */}
          {currentStep === 'details' && (
            <div className="p-6">
              {/* Course Summary */}
              <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-6 mb-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold">{course.title}</h3>
                    <p className="font-script text-lg opacity-90">{course.hindiName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{course.fee}</div>
                    <div className="text-sm opacity-90">{course.duration}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{course.sessions}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>

              {/* Student Information Form */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h4 className="font-display text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={20} />
                    Student Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={paymentData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={paymentData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={paymentData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Address</label>
                      <input
                        type="text"
                        value={paymentData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Your address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>


                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className={`w-full bg-gradient-to-r ${course.color} text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink size={20} />
                  Pay {course.fee} Securely
                  <span className="text-sm opacity-90">(via Razorpay)</span>
                </motion.button>
              </form>
            </div>
          )}

          {/* Processing State */}
          {currentStep === 'processing' && (
            <div className="p-12 text-center">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <CreditCard className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-gray-800 mb-4">Redirecting to Razorpay</h3>
              <p className="text-gray-600 mb-6">Please complete your payment in the Razorpay window...</p>
              <div className="flex justify-center">
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-purple-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                If the payment window doesn't open, please check if popups are blocked
              </p>
            </div>
          )}

          {/* Payment Failed State */}
          {currentStep === 'failed' && (
            <div className="p-6">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <AlertCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-gray-800 mb-4">Payment Failed</h3>
                <p className="text-gray-600 text-lg mb-4">We couldn't process your payment</p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-red-700 text-sm">{failureReason}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.button
                  onClick={retryPayment}
                  className="flex items-center justify-center gap-3 bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard size={20} />
                  Try Again
                </motion.button>
                
                <motion.button
                  onClick={redirectToCoursesPage}
                  className="flex items-center justify-center gap-3 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={20} />
                  Back to Courses
                </motion.button>
              </div>

              {/* Auto-redirect notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p className="text-blue-700 text-sm">
                  You'll be automatically redirected to the courses page in 5 seconds...
                </p>
              </div>

              {/* Alternative Payment Methods */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h5 className="font-semibold text-gray-800 mb-2">Need Help?</h5>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Try using a different payment method</li>
                  <li>• Check your internet connection</li>
                  <li>• Contact us at +91 8866742028 for assistance</li>
                  <li>• You can also visit our academy for offline payment</li>
                </ul>
              </div>
            </div>
          )}

          {/* Success State */}
          {currentStep === 'success' && invoiceData && (
            <div className="p-6">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="font-display text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h3>
                <p className="text-gray-600 text-lg">Welcome to Kalakar Art Academy!</p>
                
                {/* Enrollment ID Display */}
                {enrollmentId && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Save className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800">Enrollment ID</span>
                    </div>
                    <p className="text-purple-700 font-mono text-lg font-bold">{enrollmentId}</p>
                    <p className="text-purple-600 text-sm mt-1">Keep this ID for future reference</p>
                  </div>
                )}
              </div>

              

              {/* Invoice Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="font-display text-xl font-bold text-gray-800 mb-4">Payment Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-semibold">{invoiceData.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Razorpay Payment ID:</span>
                    <span className="font-semibold text-sm">{invoiceData.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-semibold">{invoiceData.course.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-semibold text-green-600">₹{invoiceData.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{invoiceData.date}</span>
                  </div>
                </div>
              </div>

              {/* Download Invoice Button */}
              <div className="mb-6">
                <motion.button
                  onClick={downloadInvoice}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                  whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                >
                  <Download size={20} />
                  {isDownloading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Generating PDF...
                    </>
                  ) : (
                    'Download Invoice PDF'
                  )}
                </motion.button>
              </div>

              {/* Next Steps */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                <h5 className="font-semibold text-purple-800 mb-2">What's Next?</h5>
                <ul className="text-purple-700 text-sm space-y-1">
                  <li>• Our team will contact you within 24 hours</li>
                  <li>• You'll receive class schedule and material list</li>
                  <li>• Classes will begin as per the timeline</li>
                  <li>• Keep your enrollment ID and invoice for future reference</li>
                  <li>• Bring your creativity to every class!</li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Contact Information
                </h5>
                <div className="text-gray-600 text-sm space-y-1">
                  <p><strong>Phone:</strong> +91 8866742028</p>
                  <p><strong>Email:</strong> kalakarartacademy@gmail.com</p>
                  <p><strong>Address:</strong> Duplex Shop no.47, Near Entry Gate of Samanvay Samipya Complex, Harni-Sama Link Road, Vadodara, Gujarat 390022</p>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={resetModal}
                className="w-full bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;