const SupabaseConfig = require('../config/SupabaseClient');

class MessageService {
  static async getMessages(taskId = null) {
    let query = SupabaseConfig.client
      .from('messages')
      .select('*');

    if (taskId) {
      query = query.eq('task_id', taskId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  static async createMessage({ sender_id, receiver_id, task_id, content }) {
    const { data, error } = await SupabaseConfig.client
      .from('messages')
      .insert({
        sender_id,
        receiver_id,
        task_id,
        content
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async markAsRead(messageId) {
    const { data, error } = await SupabaseConfig.client
      .from('messages')
      .update({ is_read: true })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

module.exports = MessageService;