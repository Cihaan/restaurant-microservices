// src/controllers/delivery.controller.ts
import { Request, Response } from 'express';
import { createDelivery, updateDeliveryStatus, getDeliveries } from '../services/delivery.service';

export const createDeliveryHandler = async (req: Request, res: Response) => {
  const { orderId, deliveryPersonId } = req.body;
  try {
    const newDelivery = await createDelivery(orderId, deliveryPersonId);
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateDeliveryStatusHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedDelivery = await updateDeliveryStatus(parseInt(id), status);
    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllDeliveriesHandler = async (req: Request, res: Response) => {
  try {
    const deliveries = await getDeliveries();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
