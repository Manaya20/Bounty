const ReviewService = require('../services/review.service');

class ReviewController {
  static async getAllReviews(req, res, next) {
    try {
      const reviews = await ReviewService.getReviews(req.query);
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  }

  static async getReview(req, res, next) {
    try {
      const review = await ReviewService.getReview(req.params.id);
      res.json(review);
    } catch (err) {
      next(err);
    }
  }

  static async createReview(req, res, next) {
    try {
      const newReview = await ReviewService.createReview({
        ...req.body,
        reviewer_id: req.user.id
      });
      res.status(201).json(newReview);
    } catch (err) {
      next(err);
    }
  }

  static async updateReview(req, res, next) {
    try {
      const updatedReview = await ReviewService.updateReview(
        req.params.id,
        req.body,
        req.user.id
      );
      res.json(updatedReview);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ReviewController;