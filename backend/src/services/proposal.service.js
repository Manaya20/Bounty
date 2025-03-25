const SupabaseConfig = require('../config/SupabaseClient');

class ProposalService {
  static async getProposals(userId) {
    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  }

  static async getProposal(id, userId) {
    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async createProposal(proposalData) {
    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .insert(proposalData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateProposal(id, proposalData, userId) {
    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .update(proposalData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteProposal(id, userId) {
    const { error } = await SupabaseConfig.client
      .from('proposals')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    
    if (error) throw error;
  }
}

module.exports = ProposalService;