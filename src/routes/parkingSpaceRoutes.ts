//parking SpaceRoutes.ts
import express from 'express';
import { createParkingSpace, getAllParkingSpaces, getParkingSpaceById, updateParkingSpace, deleteParkingSpace } from '../controllers/parkingSpace';
const router = express.Router();
// Route for creating a new parking space
router.post('/createParkingSpace', createParkingSpace);
// Route for getting all parking spaces
router.get('/getAllParkingSpaces', getAllParkingSpaces);
// Route for getting a specific parking space by ID
router.get('/getParkingSpace/:id', getParkingSpaceById);
// Route for updating a parking space
router.put('/updateParkingSpace/:id', updateParkingSpace);
// Route for deleting a parking space
router.delete('/deleteParkingSpace/:id', deleteParkingSpace);
// Export the router
export default router;