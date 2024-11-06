// src/routes/deliveries.ts

import { Router, Request, Response } from 'express';
import { DeliveryService } from '../services/delivery-service';

const router = Router();

/**
 * Crée une nouvelle livraison.
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const deliveryData = req.body;
    const newDelivery = await DeliveryService.createDelivery(deliveryData);
    res.status(201).json(newDelivery);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la livraison' });
  }
});

/**
 * Met à jour le statut d'une livraison.
 */
router.put('/:deliveryId/status', async (req: Request, res: Response) => {
  const { deliveryId } = req.params;
  const { status } = req.body;

  try {
    const updatedDelivery = await DeliveryService.updateDeliveryStatus(deliveryId, status);
    if (updatedDelivery) {
      res.status(200).json(updatedDelivery);
    } else {
      res.status(404).json({ message: 'Livraison non trouvée' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la livraison' });
  }
});

/**
 * Affecte un livreur disponible à une livraison.
 */
router.put('/:deliveryId/assign-driver', async (req: Request, res: Response) => {
  const { deliveryId } = req.params;

  try {
    const assignedDelivery = await DeliveryService.assignDriverToDelivery(deliveryId);
    if (assignedDelivery) {
      res.status(200).json(assignedDelivery);
    } else {
      res.status(404).json({ message: 'Livraison non trouvée ou aucun livreur disponible' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'affectation du livreur' });
  }
});

/**
 * Récupère la liste de toutes les livraisons.
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Remplacez `getAllDeliveries` par la fonction appropriée si vous souhaitez limiter les livraisons (par statut, etc.)
    const deliveries = await DeliveryService.getAllDeliveries();
    res.status(200).json(deliveries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des livraisons' });
  }
});

export default router;
