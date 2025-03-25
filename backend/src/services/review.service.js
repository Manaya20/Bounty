const SupabaseConfig = require('../config/SupabaseClient');

class ReviewService {
  static async getReviews(filters = {}) {
    let query = SupabaseConfig.client
      .from('reviews')
      .select('*');

    if (filters.reviewee_id) {
      query = query.eq('reviewee_id', filters.reviewee_id);
    }

    if (filters.reviewer_id) {
      query = query.eq('reviewer_id', filters.reviewer_id);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return data;
  }

  static async getReview(id) {
    const { data, error } = await SupabaseConfig.client
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createReview(reviewData) {
    const { data, error } = await SupabaseConfig.client
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateReview(id, reviewData, userId) {
    const { data, error } = await SupabaseConfig.client
      .from('reviews')
      .update(reviewData)
      .eq('id', id)
      .eq('reviewer_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

module.exports = ReviewService;