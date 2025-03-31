const supabaseClient = require('../../src/config/SupabaseClient');

exports.getNotification = async (id) => {
    const { data, error } = await supabaseClient.client
        .from('notifications')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.createNotification = async (notificationData) => {
    const { data, error } = await supabaseClient.client
        .from('notifications')
        .insert([notificationData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateNotification = async (id, updatedData) => {
    const { data, error } = await supabaseClient.client
        .from('notifications')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteNotification = async (id) => {
    const { error } = await supabaseClient.client
        .from('notifications')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};