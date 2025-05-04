import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ Create a new arrival request
export const createArrival = async (req: Request, res: Response) => {
  console.log('Received request body:', req.body); // Log the request body for debugging
  try {
    if (!req.body) {
      
      return res.status(400).json({ 
        success: false, 
        message: 'Request body is missing. Make sure to send JSON data and set Content-Type header to application/json.' 
      });
     
    }
    const {
      sosUserId,
      supplierName,
      companyName,
      vehiclePlate,
      vehicleType,
      vehicleColor,
      requestedTime,
      parkingSpace
    } = req.body;

    // Check required fields
    if (
      !sosUserId ||
      !supplierName ||
      !companyName ||
      !vehiclePlate ||
      !vehicleType ||
      !vehicleColor ||
      !requestedTime ||
      !parkingSpace
    ) {
      return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
    }

    // Convert sosUserId to number if it's a string
    const parsedSosUserId = typeof sosUserId === 'string' ? parseInt(sosUserId, 10) : sosUserId;

    // Create the request
    const request = await prisma.arrival.create({
      data: {
        sosUserId: parsedSosUserId,
        supplierName,
        companyName,
        vehiclePlate,
        vehicleType,
        vehicleColor,
        requestedTime: new Date(requestedTime),
        parkingSpace
      },
    });

    res.status(201).json({ success: true, data: request });
  } catch (error) {
    console.error('Erreur création de la demande :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ✅ Get all arrival requests
export const getAllArrival = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.arrival.findMany({
      include: {
        sosUser: true, // Include user relationship
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, data: requests });
  } catch (error) {
    console.error('Erreur récupération des demandes :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  } finally {
    // No need to disconnect for each request when using a singleton
  }
};

// ✅ Get arrival request by ID
export const getArrivalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    const arrivalId = parseInt(id, 10);
    if (isNaN(arrivalId)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    const request = await prisma.arrival.findUnique({
      where: { id: arrivalId },
      include: {
        sosUser: true,
      },
    });

    if (!request) {
      return res.status(404).json({ success: false, message: 'Demande introuvable' });
    }

    res.json({ success: true, data: request });
  } catch (error) {
    console.error('Erreur récupération de la demande :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ✅ Delete an arrival by vehicle plate
export const deleteArrivalByVehiclePlate = async (req: Request, res: Response) => {
  try {
    const { vehiclePlate } = req.params;
    
    // Validate vehicle plate
    if (!vehiclePlate) {
      return res.status(400).json({ success: false, message: 'Numéro de plaque invalide' });
    }

    // Check if record exists before attempting to delete
    const existingRequest = await prisma.arrival.findMany({
      where: { vehiclePlate },
    });

    if (!existingRequest) {
      return res.status(404).json({ success: false, message: 'Demande introuvable' });
    }

    await prisma.arrival.deleteMany({ 
      where: { vehiclePlate } 
    });
    
    res.json({ success: true, message: 'Demande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur suppression demande :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
}
export const deleteArrivalRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Validate ID
    const arrivalId = parseInt(id, 10);
    if (isNaN(arrivalId)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    // Check if record exists before attempting to delete
    const existingRequest = await prisma.arrival.findUnique({
      where: { id: arrivalId },
    });

    if (!existingRequest) {
      return res.status(404).json({ success: false, message: 'Demande introuvable' });
    }

    await prisma.arrival.delete({ 
      where: { id: arrivalId } 
    });
    
    res.json({ success: true, message: 'Demande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur suppression demande :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ✅ Update an arrival request
export const updateArrival = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      sosUserId,
      supplierName,
      companyName,
      vehiclePlate,
      vehicleType,
      requestedTime,
      parkingSpace,
      status
    } = req.body;

    // Validate ID
    const arrivalId = parseInt(id, 10);
    if (isNaN(arrivalId)) {
      return res.status(400).json({ success: false, message: 'ID invalide' });
    }

    // Check if record exists
    const existingRequest = await prisma.arrival.findUnique({
      where: { id: arrivalId },
    });

    if (!existingRequest) {
      return res.status(404).json({ success: false, message: 'Demande introuvable' });
    }

    // Update the request
    const updatedRequest = await prisma.arrival.update({
      where: { id: arrivalId },
      data: {
        sosUserId: sosUserId !== undefined ? (typeof sosUserId === 'string' ? parseInt(sosUserId, 10) : sosUserId) : undefined,
        supplierName,
        companyName,
        vehiclePlate,
        vehicleType,
        requestedTime: requestedTime ? new Date(requestedTime) : undefined,
        parkingSpace,
        status
      },
    });

    res.json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error('Erreur mise à jour de la demande :', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};