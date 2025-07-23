// Complete Node.js Express server for MongoDB operations
// Deploy this to Heroku, Railway, Render, or any Node.js hosting

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Atlas connection URI
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  console.log('🔗 Connecting to MongoDB Atlas...');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db('kalakar_art_academy');

  cachedClient = client;
  cachedDb = db;

  console.log('✅ Connected to MongoDB Atlas successfully');
  return { client, db };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Kalakar Art Academy API is running',
    timestamp: new Date().toISOString(),
    mongodb: cachedClient ? 'Connected' : 'Not connected'
  });
});

// Save enrollment endpoint
app.post('/api/enrollment', async (req, res) => {
  try {
    console.log('📝 Received enrollment data:', req.body);

    const { db } = await connectToDatabase();
    
    // Validate required fields
    const { enrollmentId, studentInfo, courseInfo, paymentInfo } = req.body;
    
    if (!enrollmentId || !studentInfo || !courseInfo || !paymentInfo) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: enrollmentId, studentInfo, courseInfo, paymentInfo'
      });
    }

    // Prepare enrollment data with timestamps
    const enrollmentData = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into enrollments collection
    console.log('💾 Inserting into enrollments collection...');
    const result = await db.collection('enrollments').insertOne(enrollmentData);
    
    console.log('✅ Enrollment saved successfully with ID:', result.insertedId);

    res.status(200).json({ 
      success: true, 
      message: 'Enrollment saved successfully to MongoDB Atlas',
      data: {
        mongoId: result.insertedId,
        enrollmentId: enrollmentData.enrollmentId,
        studentName: enrollmentData.studentInfo.name,
        course: enrollmentData.courseInfo.title,
        amount: enrollmentData.paymentInfo.amount,
        savedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Database error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save enrollment data to database',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Save contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📝 Received contact form data:', req.body);

    const { db } = await connectToDatabase();
    
    // Validate required fields
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name and email are required'
      });
    }

    // Generate contact ID
    const contactId = 'CNT' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();

    // Prepare contact data with timestamps
    const contactData = {
      contactId,
      ...req.body,
      submittedAt: new Date(),
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into contacts collection
    console.log('💾 Inserting into contacts collection...');
    const result = await db.collection('contacts').insertOne(contactData);
    
    console.log('✅ Contact form saved successfully with ID:', result.insertedId);

    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully!',
      data: {
        mongoId: result.insertedId,
        contactId: contactData.contactId,
        name: contactData.name,
        email: contactData.email,
        course: contactData.course,
        savedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Database error:', error);
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save contact form to database',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get contact forms
app.get('/api/contacts', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { email, status } = req.query;

    let query = {};
    if (email) {
      query.email = { $regex: new RegExp(email, 'i') };
    }
    if (status) {
      query.status = status;
    }

    const contacts = await db.collection('contacts')
      .find(query)
      .sort({ submittedAt: -1 })
      .toArray();

    res.json({
      success: true,
      data: contacts,
      count: contacts.length
    });

  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact forms',
      details: error.message
    });
  }
});

// Get enrollments by email
app.get('/api/enrollments', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { email } = req.query;

    let query = {};
    if (email) {
      query = { 'studentInfo.email': { $regex: new RegExp(email, 'i') } };
    }

    const enrollments = await db.collection('enrollments')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      data: enrollments,
      count: enrollments.length
    });

  } catch (error) {
    console.error('❌ Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enrollments',
      details: error.message
    });
  }
});

// Get enrollment statistics
app.get('/api/stats', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    
    const [
      totalEnrollments,
      activeEnrollments,
      revenueResult,
      recentEnrollments,
      totalContacts,
      newContacts,
      recentContacts
    ] = await Promise.all([
      db.collection('enrollments').countDocuments(),
      db.collection('enrollments').countDocuments({ status: 'active' }),
      db.collection('enrollments').aggregate([
        { $match: { 'paymentInfo.paymentStatus': 'success' } },
        { $group: { _id: null, total: { $sum: '$paymentInfo.amount' } } }
      ]).toArray(),
      db.collection('enrollments')
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray(),
      db.collection('contacts').countDocuments(),
      db.collection('contacts').countDocuments({ status: 'new' }),
      db.collection('contacts')
        .find()
        .sort({ submittedAt: -1 })
        .limit(10)
        .toArray()
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      success: true,
      data: {
        enrollments: {
          total: totalEnrollments,
          active: activeEnrollments,
          revenue: totalRevenue,
          recent: recentEnrollments
        },
        contacts: {
          total: totalContacts,
          new: newContacts,
          recent: recentContacts
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/enrollment',
      'POST /api/contact',
      'GET /api/enrollments',
      'GET /api/contacts',
      'GET /api/stats'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Kalakar Art Academy API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  if (cachedClient) {
    await cachedClient.close();
  }
  process.exit(0);
});
