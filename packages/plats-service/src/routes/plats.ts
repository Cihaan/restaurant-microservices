import express, { Request, Response } from 'express';
import { createPlat, deletePlat, getPlatById, listPlats, updatePlat } from '../services/cuisine-service';

const router = express.Router();

// Create a new palt
router.post('/plats', async (req: Request, res: Response) => {
  try {
    const newPlat = await createPlat(req.body);
    res.status(201).json(newPlat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get a palt by ID
router.get('/plats/:id', async (req: Request, res: Response) => {
  try {
    const plat = await getPlatById(Number(req.params.id));
    if (!plat) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(plat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plat', error });
  }
});

// Update a plat
router.put('/plats/:id', async (req: Request, res: Response) => {
  try {
    const updatedPlat = await updatePlat(Number(req.params.id), req.body);
    if (!updatedPlat) {
      return res.status(404).json({ message: 'Plat not found' });
    }
    res.json(updatedPlat);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Plat', error });
  }
});

// Delete a palt
router.delete('/plats/:id', async (req: Request, res: Response) => {
  try {
    const success = await deletePlat(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Plat not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plat', error });
  }
});

// List palt with pagination
router.get('/plats', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const plats = await listPlats(page, pageSize);
    res.json(plats);
  } catch (error) {
    res.status(500).json({ message: 'Error listing plats', error });
  }
});

export default router;
