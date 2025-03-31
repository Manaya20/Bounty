const profileService = require('../services/profile.service');

exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await profileService.getProfile(id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProfile = async (req, res) => {
    try {
        const profileData = req.body;
        const newProfile = await profileService.createProfile(profileData);
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProfile = await profileService.updateProfile(id, updatedData);
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await profileService.deleteProfile(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};