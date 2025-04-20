//supplier routes 
 import { Router } from 'express';
import { createSupplier, getAllSuppliers, getSupplierById, updateSupplier, deleteSupplier } from '../controllers/supplier';
const router = Router();
// Route for creating a new supplier
router.post('/createSupplier', createSupplier);

// Route for getting all suppliers
router.get('/getAllSuppliers', getAllSuppliers);
// Route for getting a specific supplier by ID
router.get('/getSupplier/:id', getSupplierById);
// Route for updating a supplier
router.put('/updateSupplier/:id', updateSupplier);
// Route for deleting a supplier
router.delete('/deleteSupplier/:id', deleteSupplier);
// Export the router
export default router;
