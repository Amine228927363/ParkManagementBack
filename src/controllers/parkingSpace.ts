import { Request, Response ,NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//parking space controller
export const createParkingSpace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { spaceNumber, floor, section, status } = req.body;
        // Validate request body
        if (!spaceNumber || !floor || !section || status === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Space number, floor, section, and status are required'
            });
        }
        // Create the parking space
        const parkingSpace = await prisma.parkingSpace.create({
            data: {
                spaceNumber,
                floor,
                section,
                status,
            },
        });
        // Return success response
        return res.status(201).json({
            success: true,
            data: parkingSpace
        });
    } catch (error) {
        console.error('Error creating parking space:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create parking space'
        });
    }
};
// Controller function to get all parking spaces
export const getAllParkingSpaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parkingSpaces = await prisma.parkingSpace.findMany();
        return res.status(200).json({
            success: true,
            data: parkingSpaces
        });
    }
    catch (error) {
        console.error('Error fetching parking spaces:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch parking spaces'
        });
    }
};
// Controller function to get a parking space by ID
export const getParkingSpaceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const parkingSpace = await prisma.parkingSpace.findUnique({
            where: { id: Number(id) }
        });
        if (!parkingSpace) {
            return res.status(404).json({
                success: false,
                message: 'Parking space not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: parkingSpace
        });
    } catch (error) {
        console.error('Error fetching parking space:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch parking space'
        });
    }
};
// Controller function to update a parking space
export const updateParkingSpace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { spaceNumber, floor, section, status } = req.body;
        // Validate request body
        if (!spaceNumber || !floor || !section || status === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Space number, floor, section, and status are required'
            });
        }
        // Update the parking space
        const updatedParkingSpace = await prisma.parkingSpace.update({
            where: { id: Number(id) },
            data: {
                spaceNumber,
                floor,
                section,
                status,
            },
        });
        // Return success response
        return res.status(200).json({
            success: true,
            data: updatedParkingSpace
        });
    } catch (error) {
        console.error('Error updating parking space:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update parking space'
        });
    }
};
// Controller function to delete a parking space
export const deleteParkingSpace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Delete the parking space
        await prisma.parkingSpace.delete({
            where: { id: Number(id) }
        });
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Parking space deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting parking space:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete parking space'
        });
    }
}