const supabaseClient = require('../../src/config/SupabaseClient');
exports.getAttachment = async (id) => {
    const { data, error } = await supabase
        .from('attachments')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.createAttachment = async (attachmentData) => {
    const { data, error } = await supabase
        .from('attachments')
        .insert([attachmentData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateAttachment = async (id, updatedData) => {
    const { data, error } = await supabase
        .from('attachments')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteAttachment = async (id) => {
    const { error } = await supabase
        .from('attachments')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};