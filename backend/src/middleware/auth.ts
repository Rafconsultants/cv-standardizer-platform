import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../index'
import { createError } from './errorHandler'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      throw createError('Access token required', 401)
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw createError('JWT secret not configured', 500)
    }

    const decoded = jwt.verify(token, secret) as any
    
    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true }
    })

    if (!user) {
      throw createError('User not found', 401)
    }

    req.user = user
    next()
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      next(createError('Invalid token', 401))
    } else if (error.name === 'TokenExpiredError') {
      next(createError('Token expired', 401))
    } else {
      next(error)
    }
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(createError('Authentication required', 401))
    }

    if (!roles.includes(req.user.role)) {
      return next(createError('Insufficient permissions', 403))
    }

    next()
  }
}

export const requireCandidate = requireRole(['CANDIDATE'])
export const requireRecruiter = requireRole(['RECRUITER'])
export const requireAdmin = requireRole(['ADMIN'])
