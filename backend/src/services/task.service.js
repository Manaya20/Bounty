const SupabaseConfig = require('../config/SupabaseClient');
const MatchingService = require('./matching.service');

class TaskService {
  constructor() {
    this.supabase = SupabaseConfig.client; // ✅ Directly access `client`
  }

  async createTask(taskData, clientId) {
    const { data, error } = await this.supabase
      .from('tasks')
      .insert({
        ...taskData,
        client_id: clientId,
        status: 'OPEN'
      })
      .select()
      .single();

    if (error) throw error;

    // Automatically match task to potential taskers
    const matchedTaskers = await MatchingService.findMatchingTaskers(data);
    await this.notifyMatchedTaskers(data, matchedTaskers);

    return data;
  }

  async getTasks(filters = {}) {
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

    return data;
  }

  async notifyMatchedTaskers(task, taskers) {
    // Implement notification logic (email, push notification)
    console.log(`Notify taskers: ${taskers.map(t => t.id)} for task ${task.id}`);
  }
}

module.exports = new TaskService();
