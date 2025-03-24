const SupabaseConfig = require('../config/SupabaseClient');

class TaskService {
  static async getTasks() {
    const { data, error } = await SupabaseConfig.client
      .from('tasks')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  static async createTask(taskData) {
    const { data, error } = await SupabaseConfig.client
      .from('tasks')
      .insert(taskData)
      .select();
    
    if (error) throw error;
    return data;
  }
}

module.exports = TaskService;