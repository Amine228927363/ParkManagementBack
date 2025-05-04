
import { Request, Response ,NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
//supplier controller
// Controller function to create a new supplier
export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone } = req.body;
        // Validate request body
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and phone are required'
            });
        }
        // Create the supplier
        const supplier = await prisma.supplier.create({
            data: {
                name,
                email,
                phone,
                contactPerson: req.body.contactPerson,
                company: req.body.company,
                vehiclePlate: req.body.vehiclePlate,
            },
        });
        // Return success response
        return res.status(201).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        console.error('Error creating supplier:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create supplier'
        });
    }
};
// Controller function to get all suppliers
export const getAllSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const suppliers = await prisma.supplier.findMany();
        return res.status(200).json({
            success: true,
            data: suppliers
        });
    }
    catch (error) {
        console.error('Error fetching suppliers:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch suppliers'
        });
    }
};
// Controller function to get a supplier by ID
export const getSupplierById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const supplier = await prisma.supplier.findUnique({
            where: { id: Number(id) }
        });
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: 'Supplier not found'
            });
        }
        return res.status(200).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        console.error('Error fetching supplier:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch supplier'
        });
    }
};
// Controller function to update a supplier by ID
export const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, email, phone,contactPerson,status} = req.body;
        // Validate request body
        // Update the supplier
        const supplier = await prisma.supplier.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                phone,
                contactPerson,
                status
            },
        });
        // Return success response
        return res.status(200).json({
            success: true,
            data: supplier
        });
    } catch (error) {
        console.error('Error updating supplier:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update supplier'
        });
    }
}
// Controller function to delete a supplier by ID
export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // Delete the supplier
        await prisma.supplier.delete({
            where: { id: Number(id) },
        });
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Supplier deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting supplier:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete supplier'
        });
    }
};
// Export all controller functions
export default {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};
