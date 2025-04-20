//arrival request routes 
 import { Router } from 'express';
import { createArrivalRequest, getAllArrivalRequests, getArrivalRequestById, updateRequestStatus, deleteArrivalRequest } from '../controllers/request';
const router = Router();
// Route for creating a new arrival request
router.post('/createArrivalRequest', createArrivalRequest);
// Route for getting all arrival requests
router.get('/getAllArrivalRequests', getAllArrivalRequests);
// Route for getting a specific arrival request by ID
router.get('/getArrivalRequest/:id', getArrivalRequestById);
// Route for updating the status of an arrival request
router.put('/updateRequestStatus/:id', updateRequestStatus);
// Route for deleting an arrival request
router.delete('/deleteArrivalRequest/:id', deleteArrivalRequest);
// Export the router
export default router;