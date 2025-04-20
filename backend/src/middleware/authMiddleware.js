const supabaseClient = require('../config/SupabaseClient').getInstance();

exports.authenticate = async (req, res, next) => {
    try {
        console.log('🔐 Authenticating request...');

        // Get the session from the request
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        
        if (sessionError) {
            console.error('❌ Session error:', sessionError);
            return res.status(401).json({ 
                error: "Unauthorized",
                message: "Invalid session"
            });
        }

        if (!session) {
            console.error('❌ No session found');
            return res.status(401).json({ 
                error: "Unauthorized",
                message: "No active session"
            });
        }

        console.log('✅ Session validated, fetching user profile...');

        // Get user profile
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (profileError) {
            console.error('❌ Profile fetch error:', profileError);
            return res.status(401).json({ 
                error: "Unauthorized",
                message: "User profile not found"
            });
        }

        // Attach user and session to request
        req.user = profile;
        req.session = session;

        console.log('✅ Authentication successful for user:', profile.email);
        next();
    } catch (error) {
        console.error('❌ Authentication error:', error);
        res.status(500).json({ 
            error: "Internal server error",
            message: error.message
        });
    }
};