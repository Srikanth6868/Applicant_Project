import express from 'express';
import bodyParser from 'body-parser';
import * as db from './db'; // database interaction module
export {app};
const app = express();
const port = 3000;

app.use(bodyParser.json());

//  Get applicant
app.get('/awesome/applicant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const applicantInfo = await db.getApplicantInfo(Number(id));
    res.json(applicantInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST create applicant
app.post('/awesome/applicant', async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const createdApplicant = await db.createApplicant(id, name, email);
    res.json(createdApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create applicant' });
  }
});


// PUT update applicant
app.put('/awesome/applicant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updatedApplicant = await db.updateApplicant(Number(id), name, email);
    res.json(updatedApplicant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update applicant' });
  }
});

// DELETE applicant
app.delete('/awesome/applicant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteApplicant(Number(id));
    res.json({ message: 'Applicant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete applicant' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
