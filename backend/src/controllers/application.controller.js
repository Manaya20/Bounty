const applicationService = require('../services/application.service');

exports.getApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await applicationService.getApplication(id);
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await applicationService.getAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createApplication = async (req, res) => {
    try {
        const applicationData = req.body;
        const newApplication = await applicationService.createApplication(applicationData);
        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedApplication = await applicationService.updateApplication(id, updatedData);
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        await applicationService.deleteApplication(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};