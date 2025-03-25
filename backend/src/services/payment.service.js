const SupabaseConfig = require('../config/SupabaseClient');

class PaymentService {
  static async createPayment({ task_id, client_id, tasker_id, amount, transaction_id }) {
    const { data, error } = await SupabaseConfig.client
      .from('payments')
      .insert({
        task_id,
        client_id,
        tasker_id,
        amount,
        transaction_id,
        status: 'PENDING'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePaymentStatus(paymentId, status) {
    const validStatuses = ['PENDING', 'COMPLETED', 'FAILED'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid payment status');
    }

    const { data, error } = await SupabaseConfig.client
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getPaymentsByTask(taskId) {
    const { data, error } = await SupabaseConfig.client
      .from('payments')
      .select('*')
      .eq('task_id', taskId);

    if (error) throw error;
    return data;
  }
}

module.exports = PaymentService;