const express = require('express');
const router = express.Router();

// Import controllers
const memberController = require('../controllers/memberController');
const { verifyToken } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerMiddleware');

// Add a new member (Requires token to verify gym)
router.post(
    '/register', 
    verifyToken, 
    upload.single('profilePic'), 
    memberController.registerMember
);


// Get all members (Requires token to verify gym)
router.get('/all', verifyToken, memberController.getAllMembers);

// Search members based on query parameters (Requires token to verify gym)
router.get('/search', verifyToken, memberController.searchMember);

// Get monthly members (Requires token to verify gym)
router.get('/monthly', verifyToken, memberController.monthlyMember);

// Get members expiring within 3 days (Requires token to verify gym)
router.get('/expiring-within-3-days', verifyToken, memberController.expiringWithin3Days);

// Get expired members (Requires token to verify gym)
router.get('/expired', verifyToken, memberController.expiredMember);

// Get inactive members (Requires token to verify gym)
router.get('/inactive', verifyToken, memberController.inActiveMember);

// Get membership details of a member by ID (Requires token to verify gym)
router.get('/membership-details/:id', verifyToken, memberController.getMebershipDetails);

// Update the member's plan (Requires token to verify gym)
router.put('/update-plan/:id', verifyToken, memberController.updateMemberPlan);

module.exports = router;
