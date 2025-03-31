const supabaseClient = require('../../src/config/SupabaseClient');

exports.getMessage = async (id) => {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.createMessage = async (messageData) => {
    const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateMessage = async (id, updatedData) => {
    const { data, error } = await supabase
        .from('messages')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteMessage = async (id) => {
    const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};