import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSupplierArrival = async (req: Request, res: Response) => {
  try {
    const { supplierId, arrivalTime, parkingSpaceId, notes, scheduledBy } = req.body;

    if (!supplierId || !arrivalTime || !parkingSpaceId || !scheduledBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newArrival = await prisma.supplierArrival.create({
      data: {
        supplierId: Number(supplierId),
        arrivalTime: new Date(arrivalTime),
        parkingSpaceId: Number(parkingSpaceId),
        notes: notes || undefined,
        scheduledBy: Number(scheduledBy),
      },
      include: {
        supplier: true,
        parkingSpace: true,
        admin: true,
      },
    });
     
    return res.status(201).json(newArrival);
  } catch (error) {
    console.error('Error creating supplier arrival:', error);
    return res.status(500).json({ error: 'Failed to schedule supplier arrival' });
  }
};
export const getSupplierArrivals = async (req: Request, res: Response) => {
    try {
        const arrivals = await prisma.supplierArrival.findMany({
        include: {
            supplier: true,
            parkingSpace: true,
            admin: true,
        },
        orderBy: { arrivalTime: 'desc' },
        });
        return res.status(200).json(arrivals);
    } catch (error) {
        console.error('Error fetching supplier arrivals:', error);
        return res.status(500).json({ error: 'Failed to fetch supplier arrivals' });
    }
    }  ;
export const getSupplierArrivalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const arrival = await prisma.supplierArrival.findUnique({
            where: { id: Number(id) },
            include: {
                supplier: true,
                parkingSpace: true,
                admin: true,
            },
        });
        if (!arrival) {
            return res.status(404).json({ error: 'Supplier arrival not found' });
        }
        return res.status(200).json(arrival);
    } catch (error) {
        console.error('Error fetching supplier arrival:', error);
        return res.status(500).json({ error: 'Failed to fetch supplier arrival' });
    }
};
export const updateSupplierArrival = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { arrivalTime, parkingSpaceId, notes } = req.body;
        const updatedArrival = await prisma.supplierArrival.update({
            where: { id: Number(id) },
            data: {
                arrivalTime: new Date(arrivalTime),
                parkingSpaceId: Number(parkingSpaceId),
                notes,
            },
            include: {
                supplier: true,
                parkingSpace: true,
                admin: true,
            },
        });
        return res.status(200).json(updatedArrival);
    } catch (error) {
        console.error('Error updating supplier arrival:', error);
        return res.status(500).json({ error: 'Failed to update supplier arrival' });
    }
};
export const deleteSupplierArrival = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.supplierArrival.delete({
            where: { id: Number(id) },
        });
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting supplier arrival:', error);
        return res.status(500).json({ error: 'Failed to delete supplier arrival' });
    }
};
export const getSupplierArrivalBySupplierId = async (req: Request, res: Response) => {
    try {
        const { supplierId } = req.params;
        const arrivals = await prisma.supplierArrival.findMany({
            where: { supplierId: Number(supplierId) },
            include: {
                supplier: true,
                parkingSpace: true,
                admin: true,
            },
            orderBy: { arrivalTime: 'desc' },
        });
        return res.status(200).json(arrivals);
    } catch (error) {
        console.error('Error fetching supplier arrivals by supplier ID:', error);
        return res.status(500).json({ error: 'Failed to fetch supplier arrivals' });
    }
};
export const getSupplierArrivalByParkingSpaceId = async (req: Request, res: Response) => {
    try {
        const { parkingSpaceId } = req.params;
        const arrivals = await prisma.supplierArrival.findMany({
            where: { parkingSpaceId: Number(parkingSpaceId) },
            include: {
                supplier: true,
                parkingSpace: true,
                admin: true,
            },
            orderBy: { arrivalTime: 'desc' },
        });
        return res.status(200).json(arrivals);
    } catch (error) {
        console.error('Error fetching supplier arrivals by parking space ID:', error);
        return res.status(500).json({ error: 'Failed to fetch supplier arrivals' });
    }
};
export const getSupplierArrivalByAdminId = async (req: Request, res: Response) => {
    try {
        const { adminId } = req.params;
        const arrivals = await prisma.supplierArrival.findMany({
            where: { scheduledBy: Number(adminId) },
            include: {
                supplier: true,
                parkingSpace: true,
                admin: true,
            },
            orderBy: { arrivalTime: 'desc' },
        });
        return res.status(200).json(arrivals);
    } catch (error) {
        console.error('Error fetching supplier arrivals by admin ID:', error);
        return res.status(500).json({ error: 'Failed to fetch supplier arrivals' });
    }
};