const supabaseClient = require('../../src/config/SupabaseClient');

exports.getProfile = async (id) => {
    const { data, error } = await supabaseClient.client
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};
exports.getAllProfiles = async () => {
    const { data, error } = await supabaseClient.client
        .from('profiles')
        .select('*');

    if (error) throw new Error(error.message);
    return data;
};

exports.createProfile = async (profileData) => {
    const { data, error } = await supabaseClient.client
        .from('profiles')
        .insert([profileData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateProfile = async (id, updatedData) => {
    const { data, error } = await supabaseClient.client
        .from('profiles')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteProfile = async (id) => {
    const { error } = await supabaseClient.client
        .from('profiles')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};