import { Router } from 'express'
import { authenticateToken, requireCandidate } from '../middleware/auth'
import { asyncHandler } from '../middleware/errorHandler'

const router = Router()

// Get CV
router.get('/', authenticateToken, requireCandidate, asyncHandler(async (req, res) => {
  res.json({ message: 'Get CV endpoint - to be implemented' })
}))

// Create/Update CV
router.post('/', authenticateToken, requireCandidate, asyncHandler(async (req, res) => {
  res.json({ message: 'Create/Update CV endpoint - to be implemented' })
}))

// Upload CV for parsing
router.post('/upload', authenticateToken, requireCandidate, asyncHandler(async (req, res) => {
  res.json({ message: 'Upload CV for parsing endpoint - to be implemented' })
}))

export { router as cvRoutes }
