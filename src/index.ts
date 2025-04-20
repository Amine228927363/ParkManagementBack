import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import requestRoutes from './routes/requestRoutes'; 
import supplierRoutes from './routes/supplierRoutes'; 
 import parkingSpaceRoutes from './routes/parkingSpaceRoutes'; // Uncomment if needed
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Initialize Express app
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Add authentication routes
app.use('/', userRoutes);
app.use('/api/parkingSpaces', parkingSpaceRoutes); 
app.use('/api/suppliers', supplierRoutes); 
app.use('/api/requests', requestRoutes); 

// Start server
const startServer = async () => {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('Connected to database');
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

// Start the server
startServer();