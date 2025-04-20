import { Router } from 'express';
import { createUser,getUsers,getUserById, deleteUser,updateUser } from '../controllers/userController';

const router = Router();
// Route for creating a new user
router.post('/createUser', createUser);
router.get('/getUsers', getUsers);
// Route for getting a specific user by ID  
router.get('/getUser/:id', getUserById);
router.delete('/deleteUser/:id', deleteUser);
//route for update user by id
router.put('/updateUser/:id', updateUser);
export default router;