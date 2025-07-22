// Backend API endpoint for handling enrollment data
// This file should be deployed to your backend server (Node.js/Express, Vercel, Netlify Functions, etc.)

const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URI - use environment variable in production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sanket27:sanket1234@cluster0.xuf2s.mongodb.net/kalakar_art_academy?retryWrites=true&w=majority&appName=Cluster0';

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

// Main API handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST to save enrollment data.' 
    });
  }

  try {
    console.log('📝 Received enrollment data:', req.body);

    const { db } = await connectToDatabase();
    
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
      enrollmentId: result.insertedId,
      message: 'Enrollment saved successfully to MongoDB Atlas',
      data: {
        mongoId: result.insertedId,
        enrollmentId: enrollmentData.enrollmentId,
        studentName: enrollmentData.studentInfo.name,
        course: enrollmentData.courseInfo.title,
        amount: enrollmentData.paymentInfo.amount
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
}

// Alternative export for different deployment platforms
module.exports = handler;

// For Express.js server setup:
/*
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/enrollment', handler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
*/