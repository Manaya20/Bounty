const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const validate = require('../middleware/validation.middleware');
const { loginSchema, registerSchema } = require('../validations/auth.validations');

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refreshToken);

module.exports = router;