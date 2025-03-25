const SupabaseConfig = require('../config/SupabaseClient');

class TaskService {
  static async getTasks(filters = {}) {
    let query = SupabaseConfig.client
      .from('tasks')
      .select('*');

    // Apply filters
    if (filters.client_id) {
      query = query.eq('client_id', filters.client_id);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.complexity) {
      query = query.eq('complexity', filters.complexity);
    }
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.is_remote !== undefined) {
      query = query.eq('is_remote', filters.is_remote);
    }
    if (filters.required_skills) {
      query = query.contains('required_skills', filters.required_skills);
    }

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
      throw new Error('Missing required fields');
    }

    // Set default values
    const completeTaskData = {
      status: 'OPEN',
      is_remote: true,
      ...taskData,
      required_skills: taskData.required_skills || [],
      attachments: taskData.attachments || []
    };

    const { data, error } = await SupabaseConfig.client
      .from('tasks')
      .insert(completeTaskData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTask(taskId, updateData) {
    // Remove fields that shouldn't be updated
    const { id, client_id, created_at, ...sanitizedData } = updateData;
    
    // Add updated_at timestamp
    sanitizedData.updated_at = new Date().toISOString();

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

  static async searchTasks(searchParams) {
    let query = SupabaseConfig.client
      .from('tasks')
      .select('*')
      .eq('status', 'OPEN');

    if (searchParams.query) {
      query = query.or(`title.ilike.%${searchParams.query}%,description.ilike.%${searchParams.query}%`);
    }
    if (searchParams.category) {
      query = query.eq('category', searchParams.category);
    }
    if (searchParams.complexity) {
      query = query.eq('complexity', searchParams.complexity);
    }
    if (searchParams.min_budget) {
      query = query.gte('budget', searchParams.min_budget);
    }
    if (searchParams.max_budget) {
      query = query.lte('budget', searchParams.max_budget);
    }
    if (searchParams.required_skills) {
      query = query.overlaps('required_skills', searchParams.required_skills);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
}

module.exports = TaskService;