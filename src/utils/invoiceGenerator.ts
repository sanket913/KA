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

// Function to convert image to base64
const getImageAsBase64 = async (imagePath: string): Promise<string> => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return '';
  }
};

// Optimized HTML Template for Single Page Invoice with Balanced Horizontal Logo
const getInvoiceHTML = (data: InvoiceData, logoBase64: string): string => {
  // Ensure amount is a valid number
  const amount = typeof data.amount === 'number' ? data.amount : parseInt(data.course.fee.replace(/[₹,]/g, ''));
  const formattedAmount = amount.toLocaleString('en-IN');
  
  console.log('💰 Invoice Amount Debug:', {
    originalAmount: data.amount,
    processedAmount: amount,
    formattedAmount: formattedAmount,
    courseFee: data.course.fee
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kalakar Art Academy - Invoice</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            color: #333; 
            background: white; 
            font-size: 12px;
            line-height: 1.3;
        }
        .invoice-container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white;
            height: 1050px; /* Fixed height for A4 */
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #9333ea, #ec4899);
            color: white;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .header-content {
            flex: 1;
        }
        .header h1 { 
            font-size: 22px; 
            margin-bottom: 3px; 
            font-weight: bold;
        }
        .header p { 
            font-size: 11px; 
            opacity: 0.9; 
        }
        .logo-container {
            width: 140px; /* Reduced from 180px to 140px for balanced horizontal logo */
            height: 60px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 20px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            padding: 5px;
        }
        .logo-image {
            width: 130px; /* Reduced from 170px to 130px for balanced horizontal logo */
            height: 50px;
            object-fit: contain; /* This will maintain aspect ratio */
            border-radius: 8px;
        }
        .logo-fallback {
            font-size: 24px;
            color: white;
        }
        
        .invoice-info {
            display: flex;
            justify-content: space-between;
            padding: 15px 20px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
        }
        .invoice-details h2 { color: #9333ea; font-size: 20px; margin-bottom: 5px; }
        .invoice-meta { text-align: right; }
        .invoice-meta div { margin-bottom: 3px; font-size: 11px; }
        .status-paid {
            background: #10b981;
            color: white;
            padding: 3px 10px;
            border-radius: 15px;
            font-weight: bold;
            display: inline-block;
            margin-top: 5px;
            font-size: 10px;
        }
        
        .billing-section {
            display: flex;
            justify-content: space-between;
            padding: 15px 20px;
            gap: 30px;
        }
        .billing-info { flex: 1; }
        .billing-info h3 {
            color: #9333ea;
            font-size: 13px;
            margin-bottom: 8px;
            border-bottom: 1px solid #9333ea;
            padding-bottom: 3px;
        }
        .billing-info p { margin-bottom: 2px; font-size: 11px; }
        
        .course-section { padding: 15px 20px; background: #f8fafc; }
        .course-section h3 { color: #9333ea; font-size: 14px; margin-bottom: 10px; }
        .course-details {
            background: white;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #9333ea;
            box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        }
        .course-title { font-size: 16px; font-weight: bold; color: #1f2937; margin-bottom: 3px; }
        .course-hindi { font-style: italic; color: #ec4899; font-size: 13px; margin-bottom: 10px; }
        .course-info {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 10px;
        }
        .course-info div { font-size: 11px; }
        .course-info strong { color: #9333ea; }
        
        .amount-section { 
            padding: 15px 20px; 
            text-align: center; 
            background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
        }
        .amount-box {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 20px;
            border-radius: 12px;
            display: inline-block;
            min-width: 280px;
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
        }
        .amount-label { 
            font-size: 14px; 
            margin-bottom: 8px; 
            opacity: 0.9; 
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .amount-value { 
            font-size: 32px; 
            font-weight: bold; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .payment-info {
            padding: 12px 20px;
            background: #f1f5f9;
            border-top: 1px solid #e2e8f0;
        }
        .payment-info h4 { color: #9333ea; margin-bottom: 8px; font-size: 13px; }
        .payment-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            font-size: 10px;
        }
        
        .terms-section { padding: 12px 20px; background: #fefefe; }
        .terms-section h4 { color: #9333ea; margin-bottom: 8px; font-size: 13px; }
        .terms-list { 
            list-style: none; 
            font-size: 10px; 
            line-height: 1.4;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 3px;
        }
        .terms-list li {
            margin-bottom: 2px;
            padding-left: 10px;
            position: relative;
        }
        .terms-list li:before {
            content: "•";
            color: #9333ea;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .footer {
            background: linear-gradient(135deg, #9333ea, #ec4899);
            color: white;
            padding: 15px 20px;
            text-align: center;
            margin-top: auto;
        }
        .footer h3 { font-size: 14px; margin-bottom: 5px; }
        .footer p { font-size: 11px; opacity: 0.9; }
        .contact-info { margin-top: 8px; font-size: 9px; opacity: 0.8; }
        
        @media print {
            body { margin: 0; }
            .invoice-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="header-content">
                <h1>KALAKAR ART ACADEMY</h1>
                <p>Where Creativity Comes Alive</p>
            </div>
            <div class="logo-container">
                ${logoBase64 ? 
                  `<img src="${logoBase64}" alt="Kalakar Art Academy Logo" class="logo-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                   <div class="logo-fallback" style="display: none;">🎨</div>` : 
                  `<div class="logo-fallback">🎨</div>`
                }
            </div>
        </div>

        <div class="invoice-info">
            <div class="invoice-details">
                <h2>INVOICE</h2>
                <div class="status-paid">✓ PAID</div>
            </div>
            <div class="invoice-meta">
                <div><strong>Invoice #:</strong> ${data.invoiceNumber}</div>
                <div><strong>Date:</strong> ${data.date}</div>
                <div><strong>Transaction:</strong> ${data.transactionId.substring(0, 15)}...</div>
            </div>
        </div>

        <div class="billing-section">
            <div class="billing-info">
                <h3>FROM</h3>
                <p><strong>Kalakar Art Academy</strong></p>
                <p>Duplex Shop no.47, Near Entry Gate</p>
                <p>Samanvay Samipya Complex</p>
                <p>Harni-Sama Link Road, Vadodara</p>
                <p>Gujarat 390022</p>
                <p><strong>📞</strong> +91 8866742028</p>
                <p><strong>📧</strong> kalakarartacademy@gmail.com</p>
            </div>
            <div class="billing-info">
                <h3>BILL TO</h3>
                <p><strong>${data.studentName}</strong></p>
                <p><strong>📧</strong> ${data.email}</p>
                <p><strong>📞</strong> ${data.phone}</p>
                ${data.address ? `<p><strong>📍</strong> ${data.address.substring(0, 50)}${data.address.length > 50 ? '...' : ''}</p>` : ''}
            </div>
        </div>

        <div class="course-section">
            <h3>📚 COURSE DETAILS</h3>
            <div class="course-details">
                <div class="course-title">${data.course.title}</div>
                <div class="course-hindi">${data.course.hindiName}</div>
                <div class="course-info">
                    <div><strong>Level:</strong> ${data.course.level}</div>
                    <div><strong>Duration:</strong> ${data.course.duration}</div>
                    <div><strong>Sessions:</strong> ${data.course.sessions}</div>
                    <div><strong>Technique:</strong> ${data.course.technique}</div>
                </div>
            </div>
        </div>


        <div class="payment-info">
            <h4>💳 PAYMENT INFORMATION</h4>
            <div class="payment-details">
                <div><strong>Method:</strong> Razorpay</div>
                <div><strong>Status:</strong> SUCCESS ✓</div>
                <div><strong>Date:</strong> ${data.date}</div>
                <div><strong>Transaction:</strong> ${data.transactionId.substring(0, 12)}...</div>
                <div><strong>Amount:</strong> ₹${formattedAmount}</div>
                <div><strong>Currency:</strong> INR</div>
            </div>
        </div>

        <div class="terms-section">
            <h4>📋 TERMS & CONDITIONS</h4>
            <ul class="terms-list">
                <li>Classes are non-refundable once started</li>
                <li>Students must bring own materials unless specified</li>
                <li>Regular attendance required for completion</li>
                <li>Academy reserves right to reschedule classes</li>
                <li>Certificate provided upon successful completion</li>
                <li>Contact +91 8866742028 for any queries</li>
            </ul>
        </div>

        <div class="footer">
            <h3>🙏 Thank you for choosing Kalakar Art Academy!</h3>
            <p>Unleash your creativity • Discover your inner artist • Join our artistic community</p>
            <div class="contact-info">
                📞 +91 8866742028 | 📧 kalakarartacademy@gmail.com | 📍 Vadodara, Gujarat
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Optimized PDF generation function for single page with balanced horizontal logo
export const generateInvoicePDF = async (invoiceData: InvoiceData): Promise<void> => {
  try {
    console.log('🎨 Generating single-page optimized invoice with balanced horizontal logo...');
    console.log('📊 Invoice Data:', invoiceData);
    
    // Load logo image as base64
    console.log('🖼️ Loading logo image...');
    const logoBase64 = await getImageAsBase64('/logo.png');
    
    if (logoBase64) {
      console.log('✅ Logo loaded successfully');
    } else {
      console.log('⚠️ Logo failed to load, using fallback icon');
    }
    
    // Create temporary container with fixed dimensions
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = '800px';
    tempContainer.style.height = '1050px'; // Fixed height for A4
    tempContainer.style.overflow = 'hidden';
    tempContainer.innerHTML = getInvoiceHTML(invoiceData, logoBase64);
    
    document.body.appendChild(tempContainer);
    
    // Wait for rendering and image loading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Import libraries
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;
    
    // Generate canvas with optimized settings for single page
    const canvas = await html2canvas(tempContainer, {
      scale: 1.5, // Reduced scale for better performance
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 800,
      height: 1050, // Fixed height
      scrollX: 0,
      scrollY: 0,
      logging: false // Disable logging for cleaner output
    });
    
    // Remove temporary container
    document.body.removeChild(tempContainer);
    
    // Create PDF with single page
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgData = canvas.toDataURL('image/png', 0.95); // Slightly compressed
    const imgWidth = 210; // A4 width in mm
    const imgHeight = 297; // A4 height in mm
    
    // Add image to fit exactly on one page
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Save PDF
    const fileName = `Kalakar_Invoice_${invoiceData.invoiceNumber}.pdf`;
    pdf.save(fileName);
    
    console.log('✅ Single-page invoice with balanced horizontal logo generated successfully!');
    
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    alert('Error generating invoice PDF. Please try again.');
  }
};