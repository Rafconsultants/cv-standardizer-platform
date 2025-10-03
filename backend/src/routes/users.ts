import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'
import { asyncHandler } from '../middleware/errorHandler'

const router = Router()

// Get user profile
router.get('/profile', authenticateToken, asyncHandler(async (req, res) => {
  res.json({ message: 'User profile endpoint - to be implemented' })
}))

// Update user profile
router.put('/profile', authenticateToken, asyncHandler(async (req, res) => {
  res.json({ message: 'Update user profile endpoint - to be implemented' })
}))

export { router as userRoutes }
