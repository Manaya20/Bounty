const SupabaseConfig = require('../config/SupabaseClient');

class TaskService {
  static async getTasks(filters = {}) {
    let query = SupabaseConfig.client
      .from('tasks')
      .select('*');

    // Apply filters
    if (filters.client_id) query = query.eq('client_id', filters.client_id);
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.complexity) query = query.eq('complexity', filters.complexity);
    if (filters.min_budget) query = query.gte('budget', filters.min_budget);
    if (filters.max_budget) query = query.lte('budget', filters.max_budget);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async getTaskById(taskId) {
    const { data, error } = await SupabaseConfig.client
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (error) throw error;
    return data;
  }

  static async createTask(taskData) {
    // Validate required fields
    if (!taskData.title || !taskData.description || !taskData.budget || !taskData.time_limit) {
      throw new Error('Missing required fields: title, description, budget, time_limit');
    }

    // Validate complexity enum if provided
    if (taskData.complexity) {
      const validComplexities = ['EASY', 'MEDIUM', 'HARD'];
      if (!validComplexities.includes(taskData.complexity)) {
        throw new Error(`Invalid complexity. Must be one of: ${validComplexities.join(', ')}`);
      }
    }

    const { data, error } = await SupabaseConfig.client
      .from('tasks')
      .insert({
        ...taskData,
        client_id: taskData.client_id || null, // Make client_id optional
        status: taskData.status || 'OPEN', // Default status
        required_skills: taskData.required_skills || [], // Default empty array
        attachments: taskData.attachments || [] // Default empty array
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTask(taskId, updateData) {
    // Remove non-updatable fields
    const { id, created_at, ...sanitizedData } = updateData;
    
    // Add updated_at timestamp
    sanitizedData.updated_at = new Date().toISOString();

    // Validate status enum if provided
    if (sanitizedData.status) {
      const validStatuses = ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
      if (!validStatuses.includes(sanitizedData.status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }
    }

    const { data, error } = await SupabaseConfig.client
      .from('tasks')
      .update(sanitizedData)
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteTask(taskId) {
    const { error } = await SupabaseConfig.client
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
  }
}

module.exports = TaskService;