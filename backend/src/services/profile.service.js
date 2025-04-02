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
exports.getProfileByUsername = async (username) => {
    const { data, error } = await supabaseClient.client
        .from('profiles')
        .select('*')
        .eq('username', username);

    if (error) throw new Error(error.message);

    // Check if exactly one profile is returned
    if (!data || data.length === 0) {
        return null; // No profile found
    }
    if (data.length > 1) {
        throw new Error('Multiple profiles found for the given username');
    }

    return data[0]; // Return the single profile
};

exports.getProfileByEmail = async (email) => {
    const { data, error } = await supabaseClient.client
        .from('profiles')
        .select('*')
        .eq('email', email);

    if (error) throw new Error(error.message);

    // Check if exactly one profile is returned
    if (!data || data.length === 0) {
        return null; // No profile found
    }
    if (data.length > 1) {
        throw new Error('Multiple profiles found for the given email');
    }

    return data[0]; // Return the single profile
}
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