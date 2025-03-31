const supabaseClient = require('../../src/config/SupabaseClient'); // Singleton instance

exports.getApplication = async (id) => {
    const { data, error } = await supabaseClient.client
        .from('applications')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.createApplication = async (applicationData) => {
    const { data, error } = await supabaseClient.client
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateApplication = async (id, updatedData) => {
    const { data, error } = await supabaseClient.client
        .from('applications')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteApplication = async (id) => {
    const { error } = await supabaseClient.client
        .from('applications')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};