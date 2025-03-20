const jwt = require('jsonwebtoken');

// Secret key for signing the JWT
const SECRET_KEY = "your_secret_key";

// Create the payload
const payload = {
    user_id: 123,
    role: "admin"
};

// Generate the token with an expiration time (1 hour)
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

console.log("Generated JWT Token:", token);

