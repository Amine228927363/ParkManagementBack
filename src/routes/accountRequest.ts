//accountrequest routes 
import { Router } from 'express';
import { createAccountRequest, getAllAccountRequests, updateAccountRequest } from '../controllers/accountRequest';
const router = Router();
// Route for creating a new account request
router.post('/createAccountRequest', createAccountRequest);
// Route for getting all account requests
router.get('/getAllAccountRequests', getAllAccountRequests);
// Route for updating an account request
router.put('/updateAccountRequest/:id', updateAccountRequest);
// Export the router
export default router;