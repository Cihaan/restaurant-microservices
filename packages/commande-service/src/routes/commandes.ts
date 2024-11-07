import express, { Request, Response } from 'express';
import {
  addPlatsToCommande,
  createCommande,
  deleteCommande,
  getCommandeById,
  listCommandes,
  removePlatFromCommande,
  updateCommande,
} from '../services/commandes-service';

const router = express.Router();

// Create a new commande
router.post('/commandes', async (req: Request, res: Response) => {
  try {
    const newCommande = await createCommande(req.body);
    res.status(201).json(newCommande);
  } catch (error) {
    res.status(500).json({ message: 'Error creating commande', error });
  }
});

// Get a commande by ID
router.get('/commandes/:id', async (req: Request, res: Response) => {
  try {
    const commande = await getCommandeById(Number(req.params.id));
    if (!commande) {
      return res.status(200).json({ message: 'Commande not found' });
    }
    res.json(commande);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching commande', error });
  }
});

// Update a commande
router.put('/commandes/:id', async (req: Request, res: Response) => {
  try {
    const updatedCommande = await updateCommande(
      Number(req.params.id),
      req.body
    );
    if (!updatedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.json(updatedCommande);
  } catch (error) {
    res.status(500).json({ message: 'Error updating commande', error });
  }
});

// Delete a commande
router.delete('/commandes/:id', async (req: Request, res: Response) => {
  try {
    const success = await deleteCommande(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting commande', error });
  }
});

// List commandes with pagination
router.get('/commandes', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const commandes = await listCommandes(page, pageSize);
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Error listing commandes', error });
  }
});

// Add a plat to a commande
router.post('/commandes/:id/plats', async (req: Request, res: Response) => {
  const commandeId = Number(req.params.id);
  const platsData = req.body as { platId: number; quantite: number }[];

  try {
    const newCommandePlats = await addPlatsToCommande(commandeId, platsData);
    res.status(201).json(newCommandePlats);
  } catch (error) {
    res.status(500).json({ message: 'Error adding plats to commande', error });
  }
});

// Remove a plat from a commande
router.delete(
  '/commandes/:id/plats/:platId',
  async (req: Request, res: Response) => {
    const commandeId = Number(req.params.id);
    const platId = Number(req.params.platId);

    try {
      const success = await removePlatFromCommande(commandeId, platId);
      if (!success) {
        return res.status(404).json({ message: 'Plat not found in commande' });
      }
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error removing plat from commande', error });
    }
  }
);

export default router;
