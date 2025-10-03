"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const router = (0, express_1.Router)();
exports.cvRoutes = router;
router.get('/', auth_1.authenticateToken, auth_1.requireCandidate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Get CV endpoint - to be implemented' });
}));
router.post('/', auth_1.authenticateToken, auth_1.requireCandidate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Create/Update CV endpoint - to be implemented' });
}));
router.post('/upload', auth_1.authenticateToken, auth_1.requireCandidate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    res.json({ message: 'Upload CV for parsing endpoint - to be implemented' });
}));
//# sourceMappingURL=cv.js.map