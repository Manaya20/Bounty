const express = require('express');
const AuthController = require('../controllers/auth.controller');
const validate = require('../middleware/validation.middleware'); // Fixed import
const { loginSchema, registerSchema } = require('../validations/auth.validations');

const router = express.Router();

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refreshToken);

module.exports = router;