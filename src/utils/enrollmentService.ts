// Frontend service to communicate with backend API for MongoDB operations
export interface EnrollmentData {
  enrollmentId: string;
  studentInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  courseInfo: {
    title: string;
    level: string;
    hindiName: string;
    fee: string;
    duration: string;
    sessions: string;
    technique: string;
    color: string;
  };
  paymentInfo: {
    amount: number;
    transactionId: string;
    razorpayPaymentId: string;
    razorpayOrderId?: string;
    razorpaySignature?: string;
    paymentStatus: 'success' | 'failed' | 'pending';
    paymentDate: Date;
  };
  invoiceInfo: {
    invoiceNumber: string;
    invoiceDate: string;
  };
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'cancelled';
}

// IMPORTANT: Replace this with your actual backend API URL once deployed
const API_BASE_URL = (import.meta.env.MODE === 'production')
  ? 'https://ka-1-bdzy.onrender.com' // Replace with your actual API URL
  : 'http://localhost:3001'; // Local development

export const saveEnrollmentToDatabase = async (enrollmentData: EnrollmentData): Promise<{ success: boolean; message: string; enrollmentId?: string }> => {
  try {
    console.log('🚀 Attempting to save enrollment to MongoDB Atlas...');
    console.log('📊 Enrollment Data:', enrollmentData);
    console.log('🌐 API URL:', `${API_BASE_URL}/api/enrollment`);

    // REAL API CALL TO BACKEND
    const response = await fetch(`${API_BASE_URL}/api/enrollment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(enrollmentData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      // Also save to localStorage as backup
      const existingEnrollments = JSON.parse(localStorage.getItem('kalakar_enrollments') || '[]');
      existingEnrollments.push({
        ...enrollmentData,
        savedAt: new Date().toISOString(),
        mongodbSaved: true,
        mongoId: result.data?.mongoId
      });
      localStorage.setItem('kalakar_enrollments', JSON.stringify(existingEnrollments));

      console.log('✅ Enrollment saved successfully to MongoDB Atlas');
      console.log('🆔 MongoDB ID:', result.data?.mongoId);
      console.log('📊 Total enrollments:', existingEnrollments.length);

      return {
        success: true,
        message: 'Enrollment saved successfully to MongoDB Atlas',
        enrollmentId: enrollmentData.enrollmentId
      };
    } else {
      throw new Error(result.error || 'Failed to save enrollment');
    }

  } catch (error) {
    console.error('❌ Error saving enrollment to MongoDB:', error);
    
    // Check if it's a network/API error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('🚫 Backend API not available - using localStorage fallback');
      
      // Save to localStorage with pending status
      const existingEnrollments = JSON.parse(localStorage.getItem('kalakar_enrollments_pending') || '[]');
      existingEnrollments.push({
        ...enrollmentData,
        savedAt: new Date().toISOString(),
        mongodbSaved: false,
        status: 'pending_backend_deployment',
        error: 'Backend API not deployed yet'
      });
      localStorage.setItem('kalakar_enrollments_pending', JSON.stringify(existingEnrollments));
      
      return {
        success: false,
        message: 'Backend API not deployed yet. Data saved locally for when API is available.'
      };
    }
    
    // Other errors - save to failed queue
    try {
      const existingEnrollments = JSON.parse(localStorage.getItem('kalakar_enrollments_failed') || '[]');
      existingEnrollments.push({
        ...enrollmentData,
        savedAt: new Date().toISOString(),
        mongodbSaved: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      localStorage.setItem('kalakar_enrollments_failed', JSON.stringify(existingEnrollments));
      
      console.log('💾 Enrollment saved to localStorage as fallback');
    } catch (fallbackError) {
      console.error('❌ Even localStorage fallback failed:', fallbackError);
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to save enrollment data'
    };
  }
};

export const getEnrollmentsByEmail = async (email: string): Promise<EnrollmentData[]> => {
  try {
    // Try to get from API first
    try {
      const response = await fetch(`${API_BASE_URL}/api/enrollments?email=${encodeURIComponent(email)}`);
      if (response.ok) {
        const result = await response.json();
        return result.data || [];
      }
    } catch (apiError) {
      console.log('API not available, using localStorage');
    }

    // Fallback to localStorage
    const enrollments = JSON.parse(localStorage.getItem('kalakar_enrollments') || '[]');
    return enrollments.filter((enrollment: EnrollmentData) => 
      enrollment.studentInfo.email.toLowerCase() === email.toLowerCase()
    );
  } catch (error) {
    console.error('❌ Error fetching enrollments:', error);
    return [];
  }
};

export const getAllEnrollments = async (): Promise<EnrollmentData[]> => {
  try {
    // Try API first
    try {
      const response = await fetch(`${API_BASE_URL}/api/enrollments`);
      if (response.ok) {
        const result = await response.json();
        return result.data || [];
      }
    } catch (apiError) {
      console.log('API not available, using localStorage');
    }

    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('kalakar_enrollments') || '[]');
  } catch (error) {
    console.error('❌ Error fetching all enrollments:', error);
    return [];
  }
};

export const getEnrollmentStats = async () => {
  try {
    const enrollments = await getAllEnrollments();
    const totalRevenue = enrollments
      .filter(e => e.paymentInfo.paymentStatus === 'success')
      .reduce((sum, e) => sum + e.paymentInfo.amount, 0);

    return {
      totalEnrollments: enrollments.length,
      activeEnrollments: enrollments.filter(e => e.status === 'active').length,
      totalRevenue,
      recentEnrollments: enrollments.slice(-10).reverse()
    };
  } catch (error) {
    console.error('❌ Error fetching enrollment stats:', error);
    return {
      totalEnrollments: 0,
      activeEnrollments: 0,
      totalRevenue: 0,
      recentEnrollments: []
    };
  }
};

// Utility function to check if backend API is available
export const checkBackendStatus = async (): Promise<{ available: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    
    if (response.ok) {
      return { available: true, message: 'Backend API is available' };
    } else {
      return { available: false, message: 'Backend API returned error' };
    }
  } catch (error) {
    return { 
      available: false, 
      message: 'Backend API not deployed or not accessible' 
    };
  }
};

// Function to manually retry failed enrollments when backend becomes available
export const retryFailedEnrollments = async (): Promise<{ success: number; failed: number }> => {
  try {
    const failedEnrollments = JSON.parse(localStorage.getItem('kalakar_enrollments_failed') || '[]');
    const pendingEnrollments = JSON.parse(localStorage.getItem('kalakar_enrollments_pending') || '[]');
    const allPendingEnrollments = [...failedEnrollments, ...pendingEnrollments];
    
    let successCount = 0;
    let failedCount = 0;

    for (const enrollment of allPendingEnrollments) {
      try {
        const result = await saveEnrollmentToDatabase(enrollment);
        if (result.success) {
          successCount++;
        } else {
          failedCount++;
        }
      } catch (error) {
        failedCount++;
      }
    }

    // Clear processed enrollments
    if (successCount > 0) {
      localStorage.removeItem('kalakar_enrollments_pending');
      const remainingFailed = allPendingEnrollments.slice(successCount);
      localStorage.setItem('kalakar_enrollments_failed', JSON.stringify(remainingFailed));
    }

    return { success: successCount, failed: failedCount };
  } catch (error) {
    console.error('❌ Error retrying failed enrollments:', error);
    return { success: 0, failed: 0 };
  }
};
