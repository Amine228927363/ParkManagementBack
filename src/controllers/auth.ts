import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Function to authenticate user
async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Compare password with hashed password in DB
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    "someSuperSecretKeyThatIsHardToGuess", // Replace with your actual secret
    { expiresIn: '1h' } // Token expiration time
  )

  return token
}
export { loginUser }