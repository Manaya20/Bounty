const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

router.get('/', ReviewController.getAllReviews);
router.get('/:id', ReviewController.getReview);
router.post('/', ReviewController.createReview);
router.put('/:id', ReviewController.updateReview);

module.exports = router;