import request from 'supertest';
import {app} from '../server'; // Assuming your Express app instance is exported from server.ts

describe('CRUD Operations', () => {
  const newApplicant = {
    id: 1,
    name: 'Srikanth',
    email: 'srikanth@example.com',
  };

  it('should create a new applicant', async () => {
    const response = await request(app)
      .post('/awesome/applicant')
      .send(newApplicant);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(newApplicant));
  });

  it('should retrieve applicant info', async () => {
    const response = await request(app).get('/awesome/applicant/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(newApplicant));
  });

  it('should update applicant info', async () => {
    const updatedInfo = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    const response = await request(app)
      .put('/awesome/applicant/1')
      .send(updatedInfo);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedInfo));
  });

  it('should delete an applicant', async () => {
    const response = await request(app).delete('/awesome/applicant/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Applicant deleted successfully' });
  });
});
