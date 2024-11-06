// src/routes/drivers.ts

import { Router, Request, Response } from 'express';
import { DriverService } from '../services/driver-service';

const router = Router();

/**
 * Récupère tous les livreurs disponibles.
 */
router.get('/available', async (req: Request, res: Response) => {
  try {
    const availableDrivers = await DriverService.getAllAvailableDrivers();
    res.status(200).json(availableDrivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des livreurs disponibles' });
  }
});

/**
 * Récupère un livreur par son ID.
 */
router.get('/:driverId', async (req: Request, res: Response) => {
  const { driverId } = req.params;

  try {
    const driver = await DriverService.getDriverById(driverId);
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(404).json({ message: 'Livreur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du livreur' });
  }
});

/**
 * Met à jour le statut d'un livreur.
 */
router.put('/:driverId/status', async (req: Request, res: Response) => {
  const { driverId } = req.params;
  const { status } = req.body;

  try {
    const updatedDriver = await DriverService.updateDriverStatus(driverId, status);
    if (updatedDriver) {
      res.status(200).json(updatedDriver);
    } else {
      res.status(404).json({ message: 'Livreur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut du livreur' });
  }
});

/**
 * Ajoute un nouveau livreur.
 */
router.post('/', async (req: Request, res: Response) => {
  const driverData = req.body;

  try {
    const newDriver = await DriverService.createDriver(driverData);
    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du livreur' });
  }
});

export default router;
