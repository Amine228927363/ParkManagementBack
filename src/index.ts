import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import requestRoutes from './routes/requestRoutes'; 
import accountRequestRoutes from './routes/accountRequest'; 
import supplierRoutes from './routes/supplierRoutes'; 
 import parkingSpaceRoutes from './routes/parkingSpaceRoutes'; 
 import geminiModel from './routes/geminiModel';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/', userRoutes);
app.use('/api/parkingSpaces', parkingSpaceRoutes); 
app.use('/api/suppliers', supplierRoutes); 
app.use('/api/accountRequests', accountRequestRoutes);
app.use('/api/requests', requestRoutes); 
app.use('/api', geminiModel);


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