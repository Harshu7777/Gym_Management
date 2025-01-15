const express = require('express');
const { addMembership, getMemberships } = require('../controllers/memberShipController');  // Fixed name of addMembership
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for adding a membership
router.route("/add-memberships").post(verifyToken, addMembership );  

// Route for getting memberships
router.route("/get-memberships").get(verifyToken, getMemberships);  

module.exports = router;
