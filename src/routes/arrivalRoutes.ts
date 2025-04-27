//arrival  routes 
 import { Router } from 'express';
import { createArrival, getAllArrival, getArrivalById, deleteArrivalRequest } from '../controllers/arrival';
const router = Router();
// Route for creating a new arrival request
router.post('/createArrival', createArrival);
// Route for getting all arrival requests
router.get('/getAllArrival', getAllArrival);
// Route for getting a specific arrival request by ID
router.get('/getArrival/:id', getArrivalById);
// Route for deleting an arrival request
router.delete('/deleteArrival/:id', deleteArrivalRequest);
// Export the router
export default router;