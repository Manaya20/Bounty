const profileService = require('../services/profile.service');
const { hashPassword, comparePassword } = require('../utils/password.utils');
const { generateToken } = require('../utils/jwt.utils');

// Signup route
exports.signup = async (req, res) => {
    try {
        const { username, role, bio, skills, preferences, profile_picture_url, password } = req.body;

        // Validate required fields
        if (!username || !role || !password) {
            return res.status(400).json({ error: "Username, role, and password are required." });
        }

        // Check if the username already exists
        const existingProfile = await profileService.getProfileByUsername(username);
        if (existingProfile) {
            return res.status(409).json({ error: "Username already exists." });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new profile
        const newProfile = await profileService.createProfile({
            username,
            role,
            bio,
            skills,
            preferences,
            profile_picture_url,
            password: hashedPassword
        });

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.me = async (req, res) => {
    try {
        // Middleware should have already attached the user to the request
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.profile_picture_url,
                initials: user.initials,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Login route
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        // Fetch the profile by username
        const profile = await profileService.getProfileByUsername(username);
        if (!profile) {
            return res.status(404).json({ error: "User not found." });
        }

        // Compare the password
        const isMatch = await comparePassword(password, profile.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Generate JWT token
        const token = generateToken(profile.id);

        // Return user data and token
        res.status(200).json({
            user: {
                id: profile.id,
                username: profile.username,
                role: profile.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};