// src/routes/delivery.routes.ts
import { Router } from 'express';
import { createDeliveryHandler, updateDeliveryStatusHandler, getAllDeliveriesHandler } from '../controllers/delivery.controller';

const router = Router();

// Route pour créer une nouvelle livraison
router.post('/deliveries', createDeliveryHandler);

// Route pour mettre à jour le statut d'une livraison
router.put('/deliveries/:id/status', updateDeliveryStatusHandler);

// Route pour récupérer toutes les livraisons
router.get('/deliveries', getAllDeliveriesHandler);

export default router;
