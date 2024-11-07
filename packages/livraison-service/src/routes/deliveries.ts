import express, { Request, Response } from 'express';
import { createDelivery, deleteDelivery, getDeliveryById, listDeliveries, updateDelivery } from '../services/delivery-service';

const router = express.Router();

// Create a new delivery
router.post('/deliveries', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body);
    const newDelivery = await createDelivery(req.body);
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).json({ message: 'Error creating delivery', error });
  }
});

// Get a delivery by ID
router.get('/deliveries/:id', async (req: Request, res: Response) => {
  try {
    const delivery = await getDeliveryById(Number(req.params.id));
    if (!delivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching delivery', error });
  }
});

// Update a delivery
router.put('/deliveries/:id', async (req: Request, res: Response) => {
  try {
    console.log('update delivery.id', req.params.id);
    console.log('update delivery', req.body);
    const updatedDelivery = await updateDelivery(Number(req.params.id), req.body);
    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery', error });
  }
});

// Delete a delivery
router.delete('/deliveries/:id', async (req: Request, res: Response) => {
  try {
    console.log('req.params.id', req.params.id);
    const success = await deleteDelivery(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting delivery', error });
  }
});

// List deliveries with pagination
router.get('/deliveries', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const deliveries = await listDeliveries(page, pageSize);
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ message: 'Error listing deliveries', error });
  }
});

export default router;
