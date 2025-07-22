import { MongoClient, Db, Collection } from 'mongodb';

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DATABASE_NAME = 'kalakar_art_academy';

// Types for our collections
export interface StudentEnrollment {
  _id?: string;
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
  createdAt: Date;
  updatedAt: Date;
}

class DatabaseService {
  private client: MongoClient | null = null;
  private db: Db | null = null;

  async connect(): Promise<void> {
    try {
      if (!this.client) {
        this.client = new MongoClient(MONGODB_URI);
        await this.client.connect();
        this.db = this.client.db(DATABASE_NAME);
        console.log('✅ Connected to MongoDB successfully');
      }
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw new Error('Failed to connect to database');
    }
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('🔌 Disconnected from MongoDB');
    }
  }

  private getCollection(collectionName: string): Collection {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db.collection(collectionName);
  }

  async saveStudentEnrollment(enrollmentData: Omit<StudentEnrollment, '_id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      await this.connect();
      
      const enrollmentsCollection = this.getCollection('enrollments');
      
      const enrollment: StudentEnrollment = {
        ...enrollmentData,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await enrollmentsCollection.insertOne(enrollment);
      
      console.log('✅ Student enrollment saved successfully:', result.insertedId);
      return result.insertedId.toString();
    } catch (error) {
      console.error('❌ Error saving student enrollment:', error);
      throw new Error('Failed to save enrollment data');
    }
  }

  async getStudentEnrollments(email: string): Promise<StudentEnrollment[]> {
    try {
      await this.connect();
      
      const enrollmentsCollection = this.getCollection('enrollments');
      const enrollments = await enrollmentsCollection
        .find({ 'studentInfo.email': email })
        .sort({ createdAt: -1 })
        .toArray();

      return enrollments as StudentEnrollment[];
    } catch (error) {
      console.error('❌ Error fetching student enrollments:', error);
      throw new Error('Failed to fetch enrollment data');
    }
  }

  async updatePaymentStatus(
    enrollmentId: string, 
    paymentStatus: 'success' | 'failed' | 'pending',
    additionalData?: any
  ): Promise<void> {
    try {
      await this.connect();
      
      const enrollmentsCollection = this.getCollection('enrollments');
      
      const updateData: any = {
        'paymentInfo.paymentStatus': paymentStatus,
        updatedAt: new Date()
      };

      if (additionalData) {
        Object.keys(additionalData).forEach(key => {
          updateData[`paymentInfo.${key}`] = additionalData[key];
        });
      }

      await enrollmentsCollection.updateOne(
        { enrollmentId },
        { $set: updateData }
      );

      console.log('✅ Payment status updated successfully');
    } catch (error) {
      console.error('❌ Error updating payment status:', error);
      throw new Error('Failed to update payment status');
    }
  }

  async getEnrollmentStats(): Promise<{
    totalEnrollments: number;
    activeEnrollments: number;
    totalRevenue: number;
    recentEnrollments: StudentEnrollment[];
  }> {
    try {
      await this.connect();
      
      const enrollmentsCollection = this.getCollection('enrollments');
      
      const [
        totalEnrollments,
        activeEnrollments,
        revenueResult,
        recentEnrollments
      ] = await Promise.all([
        enrollmentsCollection.countDocuments(),
        enrollmentsCollection.countDocuments({ status: 'active' }),
        enrollmentsCollection.aggregate([
          { $match: { 'paymentInfo.paymentStatus': 'success' } },
          { $group: { _id: null, total: { $sum: '$paymentInfo.amount' } } }
        ]).toArray(),
        enrollmentsCollection
          .find()
          .sort({ createdAt: -1 })
          .limit(10)
          .toArray()
      ]);

      const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

      return {
        totalEnrollments,
        activeEnrollments,
        totalRevenue,
        recentEnrollments: recentEnrollments as StudentEnrollment[]
      };
    } catch (error) {
      console.error('❌ Error fetching enrollment stats:', error);
      throw new Error('Failed to fetch enrollment statistics');
    }
  }
}

// Create a singleton instance
export const databaseService = new DatabaseService();

// Helper function to generate unique enrollment ID
export const generateEnrollmentId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ENR${timestamp.slice(-8)}${random}`;
};

// Helper function to validate MongoDB URI
export const validateMongoDBConnection = async (uri: string): Promise<boolean> => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    await client.db().admin().ping();
    await client.close();
    return true;
  } catch (error) {
    console.error('MongoDB connection validation failed:', error);
    return false;
  }
};