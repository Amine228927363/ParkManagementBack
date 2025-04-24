import { Request, Response ,NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient();

// Controller function to create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;

    // Validate request body
    if (!name || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Fullname, email, and password are required'
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create the user with the hashed password
    const user = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,  // Store hashed password
        email,
      },
    });

    // Return success response
    return res.status(201).json({
      success: true,
      data: {
        id: user.id,
        fullname: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
};
// Controller function to get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};
// Controller function to get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10); // Ensure it's a valid integer

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
};
//controller function to get all users where role ius SOS_User
export const getSOSUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'SOS_USER' },
    });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching SOS users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch SOS users',
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { name, email, password } = req.body;

    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, password },
    });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};
