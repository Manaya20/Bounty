const supabaseClient = require('../config/SupabaseClient').getInstance();
const { registerSchema, loginSchema } = require('../validations/auth.validations');
const logger = require('../utils/logger');

// Signup route
exports.signup = async (req, res) => {
    try {
        logger.info('Processing signup request...');
        logger.info('Signup attempt for email:', req.body.email);

        // Validate request body against schema
        const { error, value } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error('Validation error:', error.details);
            return res.status(400).json({ 
                error: "Validation error",
                details: error.details.map(detail => detail.message)
            });
        }

        const { username, role, email, password } = value;

        // Check if user already exists
        const { data: { users }, error: userError } = await supabaseClient.auth.admin.listUsers();
        
        if (userError) {
            logger.error('Error checking existing users:', userError);
            return res.status(500).json({
                error: "Server error",
                message: "Could not verify user status"
            });
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            logger.error('User already exists:', email);
            return res.status(400).json({
                error: "Signup failed",
                message: "User with this email already exists"
            });
        }

        logger.info('Creating new user in Supabase auth...');

        // First, create the user with Supabase Auth
        const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    role
                }
            }
        });

        if (signUpError || !signUpData.user) {
            logger.error('Signup error:', signUpError);
            return res.status(400).json({ 
                error: "Signup failed",
                message: signUpError?.message || "Failed to create user"
            });
        }

        logger.info('User created in auth system, updating confirmation status...');

        // For testing environment, automatically confirm email
        if (process.env.NODE_ENV === 'test') {
            const { error: updateError } = await supabaseClient.auth.admin.updateUserById(
                signUpData.user.id,
                { email_confirm: true }
            );
            
            if (updateError) {
                logger.error('Email confirmation error:', updateError);
            }
        }

        // Create profile in public schema
        const { data: profileData, error: profileError } = await supabaseClient
            .from('profiles')
            .insert([
                {
                    id: signUpData.user.id,
                    username,
                    email,
                    role
                }
            ])
            .select()
            .single();

        if (profileError) {
            logger.error('Profile creation error:', profileError);
            // Clean up the auth user if profile creation fails
            await supabaseClient.auth.admin.deleteUser(signUpData.user.id);
            return res.status(400).json({ 
                error: "Profile creation failed",
                message: profileError.message
            });
        }

        logger.info('Signup successful for user:', email);

        res.status(201).json({
            user: {
                id: signUpData.user.id,
                username,
                email,
                role
            },
            message: process.env.NODE_ENV === 'test' 
                ? "Signup successful" 
                : "Signup successful. Please check your email to confirm your account."
        });
    } catch (error) {
        logger.error('Signup error:', error);
        res.status(500).json({ 
            error: "Internal server error",
            message: error.message
        });
    }
};

// Reset password route
exports.resetPassword = async (req, res) => {
    try {
        logger.info('Processing password reset request...');
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                error: "Validation error",
                message: "Email is required"
            });
        }

        // Check if user exists
        const { data: { users }, error: userError } = await supabaseClient.auth.admin.listUsers();
        
        if (userError) {
            logger.error('Error checking user existence:', userError);
            return res.status(500).json({
                error: "Server error",
                message: "Could not verify user status"
            });
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            logger.error('User not found for email:', email);
            return res.status(404).json({
                error: "User not found",
                message: "No account found with this email"
            });
        }

        // Send password reset email
        const { error: resetError } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.FRONTEND_URL}/reset-password`
        });

        if (resetError) {
            logger.error('Password reset error:', resetError);
            return res.status(400).json({
                error: "Password reset failed",
                message: resetError.message
            });
        }

        logger.info('Password reset email sent to:', email);
        res.status(200).json({
            message: "Password reset email sent successfully"
        });
    } catch (error) {
        logger.error('Password reset error:', error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Login route
exports.login = async (req, res) => {
    try {
        logger.info('Processing login request...');
        logger.info('Login attempt for email:', req.body.email);

        // Validate request body against schema
        const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.error('Validation error:', error.details);
            return res.status(400).json({ 
                error: "Validation error",
                details: error.details.map(detail => detail.message)
            });
        }

        const { email, password } = value;

        // First, check if user exists and email confirmation status
        const { data: { users }, error: userError } = await supabaseClient.auth.admin.listUsers();
        
        if (userError) {
            logger.error('Error fetching users:', userError);
            return res.status(500).json({
                error: "Server error",
                message: "Could not verify user status"
            });
        }

        const user = users.find(u => u.email === email);
        
        if (!user) {
            logger.error('User not found for email:', email);
            return res.status(401).json({
                error: "Login failed",
                message: "Invalid email or password"
            });
        }

        logger.info('User found, checking email confirmation status...');
        logger.info('Email confirmed:', user.email_confirmed_at);

        // Check email confirmation in non-test environment
        if (process.env.NODE_ENV !== 'test' && !user.email_confirmed_at) {
            logger.error('Email not confirmed for user:', email);
            return res.status(403).json({
                error: "Email not confirmed",
                message: "Please confirm your email address before logging in"
            });
        }

        // Attempt to sign in
        logger.info('Attempting to sign in user...');
        const { data, error: signInError } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (signInError) {
            logger.error('Login error:', signInError);
            
            // Handle specific error cases
            if (signInError.message === 'Invalid login credentials') {
                // Try to get more information about the user
                const { data: userData, error: userDataError } = await supabaseClient.auth.admin.getUserById(user.id);
                
                if (!userDataError) {
                    logger.info('User data:', {
                        id: userData.user.id,
                        email: userData.user.email,
                        email_confirmed: userData.user.email_confirmed_at,
                        last_sign_in: userData.user.last_sign_in_at
                    });
                }

                return res.status(401).json({ 
                    error: "Login failed",
                    message: "Invalid email or password. Please try again or reset your password."
                });
            }
            
            if (signInError.message.includes('Email not confirmed')) {
                return res.status(403).json({
                    error: "Email not confirmed",
                    message: "Please confirm your email address before logging in"
                });
            }

            return res.status(401).json({ 
                error: "Login failed",
                message: signInError.message
            });
        }

        logger.info('Login successful for user:', email);

        // Get user profile
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError) {
            logger.error('Error fetching user profile:', profileError);
            return res.status(500).json({
                error: "Profile fetch failed",
                message: "Could not fetch user profile"
            });
        }

        logger.info('User profile fetched successfully');

        res.status(200).json({
            user: {
                id: data.user.id,
                email: data.user.email,
                username: profile.username,
                role: profile.role
            },
            token: data.session.access_token
        });
    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({ 
            error: "Internal server error",
            message: error.message
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        logger.info('Processing me request...');

        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        
        if (sessionError) {
            logger.error('Session error:', sessionError);
            return res.status(401).json({ 
                error: "Unauthorized access",
                message: "No active session"
            });
        }

        if (!session) {
            logger.error('No session found');
            return res.status(401).json({ 
                error: "Unauthorized access",
                message: "No active session"
            });
        }

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser(session.access_token);
        
        if (userError) {
            logger.error('User error:', userError);
            return res.status(401).json({ 
                error: "Unauthorized access",
                message: "Invalid session"
            });
        }

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                role: user.user_metadata.role
            }
        });
    } catch (error) {
        logger.error('Get current user error:', error);
        res.status(500).json({ 
            error: "Internal server error",
            message: error.message
        });
    }
};