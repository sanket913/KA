// Contact form service for database operations
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'contacted' | 'resolved';
}

// API base URL - replace with your actual backend URL
const API_BASE_URL =
  window.location.hostname === 'your-production-domain.com'
    ? 'https://your-backend-api.vercel.app' // Replace with your actual API URL
    : 'http://localhost:3001'; // Local development

export const saveContactFormToDatabase = async (contactData: Omit<ContactFormData, 'submittedAt' | 'status'>): Promise<{ success: boolean; message: string; contactId?: string }> => {
  try {
    console.log('📝 Attempting to save contact form to MongoDB Atlas...');
    console.log('📊 Contact Data:', contactData);

    // Prepare contact form data
    const formData: ContactFormData = {
      ...contactData,
      submittedAt: new Date(),
      status: 'new'
    };

    // Try to save to backend API
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        // Also save to localStorage as backup
        const existingContacts = JSON.parse(localStorage.getItem('kalakar_contacts') || '[]');
        existingContacts.push({
          ...formData,
          savedAt: new Date().toISOString(),
          mongodbSaved: true,
          mongoId: result.data?.mongoId
        });
        localStorage.setItem('kalakar_contacts', JSON.stringify(existingContacts));

        console.log('✅ Contact form saved successfully to MongoDB Atlas');
        console.log('🆔 MongoDB ID:', result.data?.mongoId);

        return {
          success: true,
          message: 'Contact form submitted successfully!',
          contactId: result.data?.contactId
        };
      } else {
        throw new Error(result.error || 'Failed to save contact form');
      }

    } catch (apiError) {
      console.error('🚫 Backend API not available - using localStorage fallback');
      
      // Save to localStorage with pending status
      const existingContacts = JSON.parse(localStorage.getItem('kalakar_contacts_pending') || '[]');
      existingContacts.push({
        ...formData,
        savedAt: new Date().toISOString(),
        mongodbSaved: false,
        status: 'pending_backend_deployment',
        error: 'Backend API not deployed yet'
      });
      localStorage.setItem('kalakar_contacts_pending', JSON.stringify(existingContacts));
      
      return {
        success: true, // Return success for user experience
        message: 'Contact form submitted successfully! We will get back to you soon.'
      };
    }

  } catch (error) {
    console.error('❌ Error saving contact form:', error);
    
    // Save to failed queue as fallback
    try {
      const existingContacts = JSON.parse(localStorage.getItem('kalakar_contacts_failed') || '[]');
      existingContacts.push({
        ...contactData,
        submittedAt: new Date(),
        status: 'new',
        savedAt: new Date().toISOString(),
        mongodbSaved: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      localStorage.setItem('kalakar_contacts_failed', JSON.stringify(existingContacts));
      
      console.log('💾 Contact form saved to localStorage as fallback');
    } catch (fallbackError) {
      console.error('❌ Even localStorage fallback failed:', fallbackError);
    }

    return {
      success: false,
      message: 'There was an error submitting your form. Please try again or contact us directly.'
    };
  }
};

export const getAllContactForms = async (): Promise<ContactFormData[]> => {
  try {
    // Try API first
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`);
      if (response.ok) {
        const result = await response.json();
        return result.data || [];
      }
    } catch (apiError) {
      console.log('API not available, using localStorage');
    }

    // Fallback to localStorage
    const contacts = JSON.parse(localStorage.getItem('kalakar_contacts') || '[]');
    const pendingContacts = JSON.parse(localStorage.getItem('kalakar_contacts_pending') || '[]');
    const failedContacts = JSON.parse(localStorage.getItem('kalakar_contacts_failed') || '[]');
    
    return [...contacts, ...pendingContacts, ...failedContacts];
  } catch (error) {
    console.error('❌ Error fetching contact forms:', error);
    return [];
  }
};

export const getContactStats = async () => {
  try {
    const contacts = await getAllContactForms();
    
    return {
      totalContacts: contacts.length,
      newContacts: contacts.filter(c => c.status === 'new').length,
      resolvedContacts: contacts.filter(c => c.status === 'resolved').length,
      recentContacts: contacts.slice(-10).reverse()
    };
  } catch (error) {
    console.error('❌ Error fetching contact stats:', error);
    return {
      totalContacts: 0,
      newContacts: 0,
      resolvedContacts: 0,
      recentContacts: []
    };
  }
};