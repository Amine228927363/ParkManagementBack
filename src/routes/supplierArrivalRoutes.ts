
import express from 'express';
const router = express.Router();
//supplier arrival routes
import { createSupplierArrival, deleteSupplierArrival, getSupplierArrivalById, getSupplierArrivalBySupplierId, getSupplierArrivals, updateSupplierArrival } from '../controllers/supplierArrival';
// Route for creating a new supplier arrival
router.post('/createSupplierArrival', createSupplierArrival);
// Route for getting all supplier arrivals
router.get('/getAllSupplierArrival',getSupplierArrivals);
// Route for getting a specific supplier arrival by ID
router.get('/getSupplierArrival/:id', getSupplierArrivalById);
// Route for deleting a supplier arrival request
router.delete('/deleteSupplierArrival/:id', deleteSupplierArrival);
// Route for updating a supplier arrival request
router.put('/updateSupplierArrival/:id', updateSupplierArrival);
// Route for getting all supplier arrivals by supplier ID
router.get('/getSupplierArrivalBySupplierId/:supplierId', getSupplierArrivalBySupplierId);
// Export the router
export default router;

