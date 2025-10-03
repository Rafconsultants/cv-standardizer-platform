import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { prisma } from '../index'
import { createError, asyncHandler } from '../middleware/errorHandler'
import { logger } from '../utils/logger'

const router = Router()

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['CANDIDATE', 'RECRUITER'])
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Validation failed', 400)
  }

  const { email, password, role } = req.body

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw createError('User already exists', 409)
  }

  // Hash password
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role
    },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true
    }
  })

  // Generate JWT token
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw createError('JWT secret not configured', 500)
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: '24h' }
  )

  logger.info(`New user registered: ${email} (${role})`)

  res.status(201).json({
    message: 'User created successfully',
    user,
    token
  })
}))

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw createError('Validation failed', 400)
  }

  const { email, password } = req.body

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw createError('Invalid credentials', 401)
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    throw createError('Invalid credentials', 401)
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw createError('JWT secret not configured', 500)
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: '24h' }
  )

  logger.info(`User logged in: ${email}`)

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    token
  })
}))

// Get current user
router.get('/me', asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    throw createError('Access token required', 401)
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw createError('JWT secret not configured', 500)
  }

  const decoded = jwt.verify(token, secret) as any
  
  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      profile: true
    }
  })

  if (!user) {
    throw createError('User not found', 404)
  }

  res.json({ user })
}))

export { router as authRoutes }
