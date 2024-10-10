// src/services/delivery.service.ts
import { db } from '../config/database';
import { deliveries, NewDelivery } from '../models/delivery.model';
import { eq } from 'drizzle-orm/expressions'; 

export const createDelivery = async (orderId: string, deliveryPersonId: string) => {
  const newDelivery: NewDelivery = {
    orderId,
    deliveryPersonId,
    status: 'pending',
  };
  
  const result = await db.insert(deliveries).values(newDelivery).returning();
  return result[0];  // Retourne la livraison créée
};

export const updateDeliveryStatus = async (deliveryId: number, status: 'pending' | 'in-transit' | 'delivered') => {
  const result = await db.update(deliveries)
    .set({ status })
    .where(eq(deliveries.id, deliveryId))
    .returning();
    
  return result[0];  // Retourne la livraison mise à jour
};

export const getDeliveries = async () => {
  return await db.select().from(deliveries);  // Récupère toutes les livraisons
};
