// src/services/delivery-service.ts

import { DeliverySchema } from '../database/schemas/delivery';
import { DriverSchema } from '../database/schemas/driver';
import { db } from '../database/db';
import { DriverService } from './driver-service';

interface Delivery {
  id: string;
  assignedDriverId?: string;
  status: 'pending' | 'in_progress' | 'completed';
  deliveryDate: Date;
  // Ajoutez d'autres propriétés nécessaires pour une livraison
}

export class DeliveryService {
  /**
   * Crée une nouvelle livraison dans la base de données.
   * @param deliveryData Les données de la livraison à créer.
   * @returns La livraison créée.
   */
  static async createDelivery(deliveryData: Omit<Delivery, 'id'>): Promise<Delivery> {
    const newDelivery = {
      ...deliveryData,
      id: generateUniqueId(), // Remplacez par votre propre fonction de génération d'ID
      status: 'pending',
    };

    // Ajoute la livraison dans la base de données
    await db.insert('deliveries', newDelivery); // Exemple de syntaxe, ajustez selon votre ORM

    return newDelivery;
  }

  /**
   * Met à jour le statut d'une livraison.
   * @param deliveryId L'ID de la livraison à mettre à jour.
   * @param status Le nouveau statut de la livraison.
   * @returns La livraison mise à jour.
   */
  static async updateDeliveryStatus(deliveryId: string, status: 'pending' | 'in_progress' | 'completed'): Promise<Delivery | null> {
    const delivery = await db.findOne('deliveries', { id: deliveryId }); // Exemple de syntaxe

    if (!delivery) {
      throw new Error(`Delivery with ID ${deliveryId} not found`);
    }

    delivery.status = status;
    await db.update('deliveries', deliveryId, { status }); // Exemple de syntaxe

    return delivery;
  }

  /**
   * Affecte un livreur disponible à une livraison.
   * @param deliveryId L'ID de la livraison.
   * @returns La livraison avec le livreur assigné.
   */
  static async assignDriverToDelivery(deliveryId: string): Promise<Delivery | null> {
    const delivery = await db.findOne('deliveries', { id: deliveryId });

    if (!delivery) {
      throw new Error(`Delivery with ID ${deliveryId} not found`);
    }

    if (delivery.status !== 'pending') {
      throw new Error(`Delivery with ID ${deliveryId} is not in a state that can be assigned`);
    }

    const availableDriver = await DriverService.getAvailableDriver();

    if (!availableDriver) {
      throw new Error('No available drivers at the moment');
    }

    delivery.assignedDriverId = availableDriver.id;
    delivery.status = 'in_progress';

    // Met à jour la livraison et le statut du livreur dans la base de données
    await db.update('deliveries', deliveryId, { assignedDriverId: availableDriver.id, status: 'in_progress' });
    await DriverService.updateDriverStatus(availableDriver.id, 'in_progress');

    return delivery;
  }
}

/**
 * Fonction auxiliaire pour générer un ID unique.
 * Vous pouvez remplacer cette fonction par une solution plus robuste.
 */
function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}
