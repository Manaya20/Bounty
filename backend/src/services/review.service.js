const SupabaseConfig = require('../config/SupabaseClient');

class ReviewService {
  static async createReview({ task_id, reviewer_id, tasker_id, rating, comment }) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const { data, error } = await SupabaseConfig.client
      .from('reviews')
      .insert({
        task_id,
        reviewer_id,
        tasker_id,
        rating,
        comment
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getTaskerReviews(taskerId) {
    const { data, error } = await SupabaseConfig.client
      .from('reviews')
      .select('*')
      .eq('tasker_id', taskerId);

    if (error) throw error;
    return data;
  }

  static async getTaskReviews(taskId) {
    const { data, error } = await SupabaseConfig.client
      .from('reviews')
      .select('*')
      .eq('task_id', taskId);

    if (error) throw error;
    return data;
  }
}

module.exports = ReviewService;