const request = require('supertest');
const app = require('../app');
const logger = require('../src/utils/logger');

describe('Authentication API', () => {
    const timestamp = Date.now();
    const testUser = {
        username: `testuser_${timestamp}`,
        email: `test_${timestamp}@bountyapp.com`,
        password: 'Test123!@#',
        role: 'client'
    };

    let authToken;

    describe('POST /api/v1/auth/signup', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/signup')
                .send(testUser)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user).toHaveProperty('username', testUser.username);
            expect(response.body.user).toHaveProperty('email', testUser.email);
            expect(response.body.user).toHaveProperty('role', testUser.role);
            expect(response.body).toHaveProperty('session');
        });

        it('should fail with invalid data', async () => {
            const invalidUser = {
                username: 't',
                email: 'invalid-email',
                password: '123',
                role: 'invalid-role'
            };

            const response = await request(app)
                .post('/api/v1/auth/signup')
                .send(invalidUser)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation error');
            expect(response.body).toHaveProperty('details');
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('should login with valid credentials', async () => {
            // Set NODE_ENV to test to bypass email confirmation
            process.env.NODE_ENV = 'test';

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                })
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('session');
            expect(response.body.session).toHaveProperty('access_token');
            
            authToken = response.body.session.access_token;
        });

        it('should fail with invalid credentials', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                })
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toHaveProperty('error', 'Login failed');
        });

        it('should handle unconfirmed email in non-test environment', async () => {
            // Temporarily set NODE_ENV to development
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';

            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                })
                .expect('Content-Type', /json/)
                .expect(403);

            expect(response.body).toHaveProperty('error', 'Email not confirmed');

            // Restore NODE_ENV
            process.env.NODE_ENV = originalEnv;
        });
    });

    describe('GET /api/v1/auth/me', () => {
        it('should get current user with valid token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/me')
                .set('Authorization', `Bearer ${authToken}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('id');
            expect(response.body.user).toHaveProperty('email', testUser.email);
        });

        it('should fail without token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/me')
                .expect('Content-Type', /json/)
                .expect(401);

            expect(response.body).toHaveProperty('error', 'Unauthorized access');
        });
    });
}); 