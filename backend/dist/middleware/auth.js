"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.requireRecruiter = exports.requireCandidate = exports.requireRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const errorHandler_1 = require("./errorHandler");
const authenticateToken = async (req, res, next) => {
    try {
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
            select: { id: true, email: true, role: true }
        });
        if (!user) {
            throw (0, errorHandler_1.createError)('User not found', 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next((0, errorHandler_1.createError)('Invalid token', 401));
        }
        else if (error.name === 'TokenExpiredError') {
            next((0, errorHandler_1.createError)('Token expired', 401));
        }
        else {
            next(error);
        }
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next((0, errorHandler_1.createError)('Authentication required', 401));
        }
        if (!roles.includes(req.user.role)) {
            return next((0, errorHandler_1.createError)('Insufficient permissions', 403));
        }
        next();
    };
};
exports.requireRole = requireRole;
exports.requireCandidate = (0, exports.requireRole)(['CANDIDATE']);
exports.requireRecruiter = (0, exports.requireRole)(['RECRUITER']);
exports.requireAdmin = (0, exports.requireRole)(['ADMIN']);
//# sourceMappingURL=auth.js.map