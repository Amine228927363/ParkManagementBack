//arrival  routes 
 import { Router } from 'express';
import { createArrival, getAllArrival, getArrivalById, deleteArrivalRequest,deleteArrivalByVehiclePlate } from '../controllers/arrival';
const router = Router();
// Route for creating a new arrival request
router.post('/createArrival', createArrival);
// Route for getting all arrival requests
router.get('/getAllArrival', getAllArrival);
// Route for getting a specific arrival request by ID
router.get('/getArrival/:id', getArrivalById);
// Route for deleting an arrival request
router.delete('/deleteArrival/:id', deleteArrivalRequest);
// Route for deleting an arrival request by vehicle plate
router.delete('/deleteArrivalByVehiclePlate/:vehiclePlate', deleteArrivalByVehiclePlate);
// Export the router
export default router;