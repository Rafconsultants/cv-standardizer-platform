"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
exports.userRoutes = router;
router.get('/profile', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'User profile endpoint - to be implemented' });
}));
router.put('/profile', auth_1.authenticateToken, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Update user profile endpoint - to be implemented' });
}));
//# sourceMappingURL=users.js.map