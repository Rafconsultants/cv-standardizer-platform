"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const index_1 = require("../index");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post('/register', [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 6 }),
    (0, express_validator_1.body)('role').isIn(['CANDIDATE', 'RECRUITER'])
], (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw (0, errorHandler_1.createError)('Validation failed', 400);
    }
    const { email, password, role } = req.body;
    const existingUser = await index_1.prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw (0, errorHandler_1.createError)('User already exists', 409);
    }
    const saltRounds = 12;
    const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
    const user = await index_1.prisma.user.create({
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
    });
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw (0, errorHandler_1.createError)('JWT secret not configured', 500);
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, secret, { expiresIn: '24h' });
    logger_1.logger.info(`New user registered: ${email} (${role})`);
    res.status(201).json({
        message: 'User created successfully',
        user,
        token
    });
}));
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').notEmpty()
], (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw (0, errorHandler_1.createError)('Validation failed', 400);
    }
    const { email, password } = req.body;
    const user = await index_1.prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw (0, errorHandler_1.createError)('Invalid credentials', 401);
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw (0, errorHandler_1.createError)('Invalid credentials', 401);
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw (0, errorHandler_1.createError)('JWT secret not configured', 500);
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, secret, { expiresIn: '24h' });
    logger_1.logger.info(`User logged in: ${email}`);
    res.json({
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        },
        token
    });
}));
router.get('/me', (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        throw (0, errorHandler_1.createError)('Access token required', 401);
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw (0, errorHandler_1.createError)('JWT secret not configured', 500);
    }
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    const user = await index_1.prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            profile: true
        }
    });
    if (!user) {
        throw (0, errorHandler_1.createError)('User not found', 404);
    }
    res.json({ user });
}));
//# sourceMappingURL=auth.js.map