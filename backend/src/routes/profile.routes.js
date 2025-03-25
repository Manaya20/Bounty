const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');

router.get('/me', ProfileController.getMyProfile);
router.put('/me', ProfileController.updateProfile);
router.get('/:id', ProfileController.getProfile);

module.exports = router;