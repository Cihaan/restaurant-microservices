import express, { Request, Response } from 'express';
import { createPlat, deletePlat, getPlatById, listPlats, updatePlat } from '../services/cuisine-service';
import { numeric } from 'drizzle-orm/pg-core';

const router = express.Router();

// Create a new palt
router.post('/plats', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body);
    const newPlat = await createPlat(req.body);
    res.status(201).json(newPlat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plat', error });
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
    const platId = Number(req.params.id);
    if (isNaN(platId)) {
      return res.status(400).json({ message: 'Invalid plat ID' });
    }

    const { name, description, price, image } = req.body;
    if (!name || !description || typeof price !== 'number' || !image) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    console.log('update plat.id', platId);
    console.log('update plat', req.body);
    //cast price to string
    req.body.price = req.body.price.toString();
    console.log('update plat', req.body);

    const updatedPlat = await updatePlat(platId, req.body);

    if (!updatedPlat) {
      return res.status(404).json({ message: 'Plat not found' });
    }

    res.json(updatedPlat);
  } catch (error) {
    console.error('Error updating plat:', error);
    res.status(500).json({ message: 'Error updating plat', error });
  }
});


// Delete a palt
router.delete('/plats/:id', async (req: Request, res: Response) => {
  try {
    console.log('req.params.id', req.params.id);
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
