const SupabaseConfig = require('../config/SupabaseClient');

class MessageService {
  static async getMessages() {
    const { data, error } = await SupabaseConfig.client
      .from('messages')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  static async getMessage(id) {
    const { data, error } = await SupabaseConfig.client
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createMessage(messageData) {
    const { data, error } = await SupabaseConfig.client
      .from('messages')
      .insert(messageData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteMessage(id) {
    const { error } = await SupabaseConfig.client
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}

module.exports = MessageService;