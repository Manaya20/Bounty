const ProfileService = require('../services/profile.service');

class ProfileController {
  static async getMyProfile(req, res, next) {
    try {
      // For now, just get first profile or handle differently
      const profile = await ProfileService.getProfile(req.params.id || 'default');
      res.json(profile);
    } catch (err) {
      next(err);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const profile = await ProfileService.getProfile(req.params.id);
      res.json(profile);
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const updatedProfile = await ProfileService.updateProfile(
        req.params.id || 'default',
        req.body
      );
      res.json(updatedProfile);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProfileController;