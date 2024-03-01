import supertest from 'supertest'
import app from '../index'

describe('Test API routes', () => {
  it('should register a new user', async () => {
    const newUser = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test',
      lastName: 'User',
      status: 'active',
      role: 'user'
    }

    const response = await supertest(app)
      .post('/api/users/register')
      .send(newUser)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('email', 'test@example.com')
  })

  it('should login a user', async () => {
    const loginCredentials = {
      email: 'test@example.com',
      password: 'password123'
    }

    const response = await supertest(app)
      .post('/api/users/login')
      .send(loginCredentials)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('email', 'test@example.com')
  })
})
