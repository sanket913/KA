# Kalakar Art Academy

A beautiful, responsive website for Kalakar Art Academy with integrated payment processing and MongoDB database storage for student enrollment management.

## 🎯 Current Status

✅ **Payment Integration**: Razorpay payment gateway fully integrated  
✅ **Database Setup**: MongoDB Atlas connection configured  
✅ **Frontend**: Complete React application with payment modal  
⚠️ **Backend API**: Needs deployment for actual database operations  

## 🚀 Features

### 🎨 **Art Academy Website**
- Beautiful, responsive design with artistic animations
- Course catalog with age-specific programs (Kids, Teens, Adults)
- Student gallery showcase
- Contact forms and academy information
- Multi-language support (English/Hindi)

### 💳 **Payment Integration**
- Razorpay payment gateway integration
- Secure payment processing
- Invoice generation and PDF download
- Test mode for development

### 📊 **Database Management**
- MongoDB Atlas integration for student enrollment tracking
- Secure storage of student information and course details
- Payment history and transaction records
- Enrollment status management

### 🔐 **Security Features**
- Secure payment processing with Razorpay
- Data encryption and secure storage
- Input validation and sanitization
- Error handling and logging

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PDF Generation**: jsPDF, html2canvas
- **Database**: MongoDB Atlas
- **Payment**: Razorpay
- **Build Tool**: Vite

## 📋 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kalakar-art-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your MongoDB Atlas URI:
   ```env
   MONGODB_URI=mongodb+srv://sanket27:sanket1234@cluster0.xuf2s.mongodb.net/kalakar_art_academy?retryWrites=true&w=majority&appName=Cluster0
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ MongoDB Atlas Setup

Your MongoDB Atlas database is already configured with the connection string:
```
mongodb+srv://sanket27:sanket1234@cluster0.xuf2s.mongodb.net/kalakar_art_academy?retryWrites=true&w=majority&appName=Cluster0
```

### Database Schema

The application uses the following collections:

#### `enrollments` Collection
```javascript
{
  _id: ObjectId,
  enrollmentId: "ENR12345678ABC",
  studentInfo: {
    name: "Student Name",
    email: "student@example.com",
    phone: "+91 9876543210",
    address: "Student Address"
  },
  courseInfo: {
    title: "Course Title",
    level: "Beginner/Intermediate/Advanced",
    hindiName: "हिंदी नाम",
    fee: "₹5,000",
    duration: "2 months",
    sessions: "16 sessions",
    technique: "Mixed Media",
    color: "from-purple-600 to-pink-600"
  },
  paymentInfo: {
    amount: 5000,
    transactionId: "TXN123456789",
    razorpayPaymentId: "pay_123456789",
    razorpayOrderId: "order_123456789",
    razorpaySignature: "signature_hash",
    paymentStatus: "success",
    paymentDate: ISODate
  },
  invoiceInfo: {
    invoiceNumber: "INV12345678",
    invoiceDate: "2025-01-01"
  },
  enrollmentDate: ISODate,
  status: "active",
  createdAt: ISODate,
  updatedAt: ISODate
}
```

## 🔧 Backend API Setup (Required for Database Operations)

Currently, the frontend simulates database operations. To actually save to MongoDB Atlas, you need to deploy the backend API:

### Option 1: Vercel Deployment
1. Create a Vercel account
2. Deploy the `api/enrollment.js` file as a serverless function
3. Update the frontend to call your Vercel API endpoint

### Option 2: Netlify Functions
1. Move `api/enrollment.js` to `netlify/functions/enrollment.js`
2. Deploy to Netlify
3. Update the frontend to call your Netlify function

### Option 3: Express.js Server
1. Create a separate Node.js server
2. Use the Express.js setup in `api/enrollment.js`
3. Deploy to Heroku, Railway, or any Node.js hosting

### Frontend API Integration
Update `src/utils/enrollmentService.ts` to call your actual API:

```typescript
const apiResponse = await fetch('YOUR_API_ENDPOINT/api/enrollment', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(enrollmentData)
});
```

## 💳 Razorpay Setup

### Test Mode (Development)
1. Sign up at [Razorpay](https://razorpay.com)
2. Get test API keys from dashboard
3. Use test card: `4111 1111 1111 1111`
4. Any future expiry date and CVV

### Production Mode
1. Complete KYC verification
2. Get live API keys
3. Update payment key in `PaymentModal.tsx`
4. Configure webhooks for payment verification

## 🔄 Payment Flow

1. **Student fills enrollment form**
   - Name, email, phone, address
   - Course selection

2. **Razorpay payment processing**
   - Secure payment gateway
   - Multiple payment methods
   - Real-time verification

3. **Database storage**
   - Student enrollment details
   - Payment information
   - Invoice generation

4. **Confirmation**
   - PDF invoice download
   - Email notifications (optional)
   - Enrollment tracking

## 📊 Current Database Status

- ✅ MongoDB Atlas connection configured
- ✅ Database schema designed
- ✅ Frontend integration ready
- ⚠️ Backend API needs deployment for actual database operations
- 💾 Currently using localStorage as fallback

## 🚀 Deployment Steps

### 1. Deploy Backend API
Choose one of the backend deployment options above and deploy the `api/enrollment.js` file.

### 2. Update Frontend
Update the API endpoint in `src/utils/enrollmentService.ts` to point to your deployed backend.

### 3. Deploy Frontend
- Build: `npm run build`
- Deploy `dist/` folder to hosting service (Vercel, Netlify, etc.)
- Configure environment variables

### 4. Test End-to-End
1. Make a test payment
2. Verify data is saved to MongoDB Atlas
3. Check enrollment tracking

## 🔍 Debugging

### Check MongoDB Atlas
1. Log into MongoDB Atlas dashboard
2. Navigate to your cluster
3. Browse collections to see saved enrollments

### Check Browser Console
The application logs detailed information about:
- Payment processing
- Database operations
- Error handling

### Check localStorage
Failed enrollments are stored in localStorage under:
- `kalakar_enrollments` - Successful saves
- `kalakar_enrollments_failed` - Failed saves

## 📞 Support

For technical support or questions:
- Email: kalakarartacademy@gmail.com
- Phone: +91 8866742028

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use secure environment variable management
   - Rotate keys regularly

2. **Database Security**
   - MongoDB Atlas has built-in security
   - Use strong connection strings
   - Enable authentication

3. **Payment Security**
   - Verify payment signatures
   - Use HTTPS in production
   - Implement proper error handling

## 📝 License

This project is proprietary software for Kalakar Art Academy.