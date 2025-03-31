const { supabase } = require('../../app');

exports.getApplication = async (id) => {
    const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.createApplication = async (applicationData) => {
    const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateApplication = async (id, updatedData) => {
    const { data, error } = await supabase
        .from('applications')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteApplication = async (id) => {
    const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};