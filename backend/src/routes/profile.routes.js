const express = require('express');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.get('/', profileController.getAllProfiles);
router.get('/:id', profileController.getProfile);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;