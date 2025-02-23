import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server'; // Make sure this exports only the Express `app` (no .listen call)

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Start an in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Connect Mongoose to this in-memory server
  await mongoose.connect(uri);
});

afterAll(async () => {
  // Clean up
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Authentication API', () => {
  it('should sign in with Google and return a JWT token', async () => {
    const res = await request(app)
      .post('/auth/google')
      .send({
        googleId: '12345',
        name: 'Test User',
        email: 'test@example.com',
        picture: 'test.jpg'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return an error if missing required fields', async () => {
    const res = await request(app)
      .post('/auth/google')
      .send({}); // Missing googleId, name, email
    expect(res.statusCode).toBe(400);
  });
});