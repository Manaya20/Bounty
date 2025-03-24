const supabase = require('../config/SupabaseClient'); 
const MatchingService = require('./matching.service');
const logger = require('../utils/logger');

class TaskService {
  constructor() {
    this.supabase = supabase.getInstance(); 
  }

  async createTask(taskData, clientId) {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .insert({
          ...taskData,
          client_id: clientId,
          status: 'OPEN',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Match task to potential taskers
      try {
        const matchedTaskers = await MatchingService.findMatchingTaskers(data);
        await this.notifyMatchedTaskers(data, matchedTaskers);
      } catch (matchingError) {
        logger.error('Task matching failed:', matchingError);
      }

      return data;
    } catch (error) {
      logger.error('Task creation failed:', error);
      throw new Error('Failed to create task');
    }
  }

  async getTasks(filters = {}) {
    try {
      let query = this.supabase
        .from('tasks')
        .select('*');

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.skills) {
        query = query.contains('required_skills', filters.skills);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data || [];
    } catch (error) {
      logger.error('Failed to fetch tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  }

  async notifyMatchedTaskers(task, taskers) {
    if (!taskers || taskers.length === 0) return;
    
    try {
      // Implement actual notification logic here
      logger.info(`Notifying ${taskers.length} taskers about task ${task.id}`);
      // Could integrate with email service or push notifications
    } catch (error) {
      logger.error('Notification failed:', error);
    }
  }
}

module.exports = new TaskService();