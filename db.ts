import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ApplicantDB',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

export const getApplicantInfo = async (id: number) => {
  const query = 'SELECT * FROM applicants WHERE id = $1';
  const values = [id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createApplicant = async (id: number, name: string, email: string) => {
  const query = 'INSERT INTO applicants (id, name, email) VALUES ($1, $2, $3) RETURNING *';
  const values = [id, name, email];

  const result = await pool.query(query, values);
  return result.rows[0];
};


export const updateApplicant = async (id: number, name: string, email: string) => {
  const query = 'UPDATE applicants SET name = $1, email = $2 WHERE id = $3 RETURNING *';
  const values = [name, email, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteApplicant = async (id: number) => {
  const query = 'DELETE FROM applicants WHERE id = $1';
  const values = [id];

  await pool.query(query, values);
};
