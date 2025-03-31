const supabaseClient = require('../../src/config/SupabaseClient');

exports.getAttachment = async (id) => {
    const { data, error } = await supabaseClient.client
        .from('attachments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};
exports.getAllAttachment = async () => {
    const { data, error } = await supabaseClient.client
        .from('attachments')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
};


exports.createAttachment = async (attachmentData) => {
    const { data, error } = await supabaseClient.client
        .from('attachments')
        .insert([attachmentData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateAttachment = async (id, updatedData) => {
    const { data, error } = await supabaseClient.client
        .from('attachments')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteAttachment = async (id) => {
    const { error } = await supabaseClient.client
        .from('attachments')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};