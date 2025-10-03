"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
exports.searchRoutes = router;
router.post('/', auth_1.authenticateToken, auth_1.requireRecruiter, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Search candidates endpoint - to be implemented' });
}));
router.get('/saved', auth_1.authenticateToken, auth_1.requireRecruiter, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Get saved searches endpoint - to be implemented' });
}));
router.post('/saved', auth_1.authenticateToken, auth_1.requireRecruiter, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Save search endpoint - to be implemented' });
}));
//# sourceMappingURL=search.js.map