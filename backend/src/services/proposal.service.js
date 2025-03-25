const SupabaseConfig = require('../config/SupabaseClient');

class ProposalService {
  static async createProposal({ tasker_id, task_id, bid_amount, estimated_days, cover_message }) {
    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .insert({
        tasker_id,
        task_id,
        bid_amount,
        estimated_days,
        cover_message,
        status: 'PENDING'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProposalStatus(proposalId, status) {
    const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid proposal status');
    }

    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', proposalId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getTaskProposals(taskId) {
    const { data, error } = await SupabaseConfig.client
      .from('proposals')
      .select('*')
      .eq('task_id', taskId);

    if (error) throw error;
    return data;
  }
}

module.exports = ProposalService;