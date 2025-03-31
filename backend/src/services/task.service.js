const { supabase } = require('../app');

exports.getTask = async (id) => {
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.createTask = async (taskData) => {
    const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.updateTask = async (id, updatedData) => {
    const { data, error } = await supabase
        .from('tasks')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
};

exports.deleteTask = async (id) => {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};