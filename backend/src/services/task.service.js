const supabaseClient = require('../config/SupabaseClient').getInstance();

exports.getTask = async (id) => {
    try {
        const { data, error } = await supabaseClient
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error in getTask:', error);
        throw error;
    }
};

exports.getAllTasks = async () => {
    try {
        const { data, error } = await supabaseClient
            .from('tasks')
            .select('*');

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error in getAllTasks:', error);
        throw error;
    }
};

exports.createTask = async (taskData) => {
    try {
        const { data, error } = await supabaseClient
            .from('tasks')
            .insert([taskData])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error in createTask:', error);
        throw error;
    }
};

exports.updateTask = async (id, updatedData) => {
    try {
        const { data, error } = await supabaseClient
            .from('tasks')
            .update(updatedData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error in updateTask:', error);
        throw error;
    }
};

exports.deleteTask = async (id) => {
    try {
        const { error } = await supabaseClient
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) throw error;
    } catch (error) {
        console.error('Error in deleteTask:', error);
        throw error;
    }
};