
//account request controller
import { Request, Response, NextFunction } from 'express';
import { PrismaClient, RequestStatus } from '@prisma/client';

const prisma = new PrismaClient();
//function to create a new account request
export const createAccountRequest = async (req: Request, res: Response) => {
  try {
    const { name, email, phone,message } = req.body;

    if (!name || !email ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

   const request = await prisma.accountRequest.create({
      data: {
            name: req.body.name,
            email: req.body.email,         // Assuming these fields are in the request body
            phone: req.body.phone,
            message: req.body.message,
      },
    });
    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Error creating account request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
//function to get all account requests
export const getAllAccountRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.accountRequest.findMany({
      include: {
        reviewer: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
//function to update an account request
export const updateAccountRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status, reviewedBy } = req.body;
  
      if (!status || !reviewedBy) {
        return res.status(400).json({ success: false, message: 'Status and reviewer ID are required.' });
      }
  
      const updatedRequest = await prisma.accountRequest.update({
        where: { id: Number(id) },
        data: {
          status: status,
          reviewedBy: Number(reviewedBy), // reviewerId directement utilisé ici
        },
      });
  
      return res.status(200).json({ success: true, data: updatedRequest });
    } catch (error) {
      console.error('Error updating account request:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
