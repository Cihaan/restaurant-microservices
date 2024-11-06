// src/services/driver-service.ts

import { DriverSchema } from '../database/schemas/driver';
import { db } from '../database/db';

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'in_progress';
  // Ajoutez d'autres propriétés nécessaires pour un livreur
}

export class DriverService {
  /**
   * Récupère un livreur disponible pour une livraison.
   * @returns Le livreur disponible ou null s'il n'y en a aucun.
   */
  static async getAvailableDriver(): Promise<Driver | null> {
    // Cherche un livreur avec le statut "available" dans la base de données
    const availableDriver = await db.findOne('drivers', { status: 'available' }); // Exemple de syntaxe

    return availableDriver || null;
  }

  /**
   * Met à jour le statut d'un livreur.
   * @param driverId L'ID du livreur à mettre à jour.
   * @param status Le nouveau statut du livreur.
   * @returns Le livreur avec le statut mis à jour.
   */
  static async updateDriverStatus(driverId: string, status: 'available' | 'in_progress'): Promise<Driver | null> {
    const driver = await db.findOne('drivers', { id: driverId }); // Exemple de syntaxe

    if (!driver) {
      throw new Error(`Driver with ID ${driverId} not found`);
    }

    driver.status = status;
    await db.update('drivers', driverId, { status }); // Exemple de syntaxe

    return driver;
  }

  /**
   * Récupère tous les livreurs disponibles.
   * @returns La liste des livreurs disponibles.
   */
  static async getAllAvailableDrivers(): Promise<Driver[]> {
    // Cherche tous les livreurs avec le statut "available" dans la base de données
    const availableDrivers = await db.findMany('drivers', { status: 'available' }); // Exemple de syntaxe

    return availableDrivers;
  }
}
