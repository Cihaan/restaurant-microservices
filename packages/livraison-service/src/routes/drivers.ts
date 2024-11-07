import express, { Request, Response } from 'express';
import { createDriver, deleteDriver, getDriverById, listDrivers, updateDriver , getAvailableDrivers} from '../services/driver-service';

const router = express.Router();

// Create a new driver
router.post('/drivers', async (req: Request, res: Response) => {
  try {
    console.log('req.body', req.body);
    const newDriver = await createDriver(req.body);
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error creating driver', error });
  }
});

//Get tous les drivers qui sont disponible
router.get('/drivers/available', async (req: Request, res: Response) => {
  try {
    console.log('Fetching available drivers');
    const availableDrivers = await getAvailableDrivers();

    if (availableDrivers.length === 0) {
      return res.status(404).json({ message: 'No available drivers found' });
    }

    res.json(availableDrivers);
  } catch (error) {
    console.error('Error fetching available drivers', error);
    res.status(500).json({ message: 'Error fetching available drivers', error });
  }
});

// Get a driver by ID
router.get('/drivers/:id', async (req: Request, res: Response) => {
  try {
    const driver = await getDriverById(Number(req.params.id));
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error });
  }
});

// // Affecte un livreur disponible à une commande spécifique en créant une entrée
// router.post('/drivers/assign', async (req, res) => {
//   const { driverId, orderId } = req.body;
//   try {
//     await db.insert(drivers).values({
//       driverId,
//       orderId,
//       status: 'in_delivery',
//       assignedAt: new Date(),
//     });

//     await db.update(users)
//       .set({ status: 'in_delivery' })
//       .where(eq(users.id, driverId));

//     res.json({ message: 'Livreur assigné à la commande avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de l\'assignation de la commande au livreur', error });
//   }
// });


// // Récupère toutes les affectations de livraisons en cours pour un livreur donné.
// router.get('/drivers/:driverId/assignments', async (req, res) => {
//   const driverId = parseInt(req.params.driverId, 10);
//   try {
//     const assignments = await db.select()
//       .from(drivers)
//       .where(eq(drivers.driverId, driverId));
//     res.json(assignments);
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la récupération des affectations du livreur', error });
//   }
// });


// // Met à jour le statut d’une affectation de livraison spécifique (par exemple, pour marquer une livraison comme "terminée")
// router.patch('/drivers/assignments/:assignmentId/status', async (req, res) => {
//   const assignmentId = parseInt(req.params.assignmentId, 10);
//   const { status } = req.body;
//   try {
//     await db.update(drivers)
//       .set({ status, updatedAt: new Date() })
//       .where(eq(drivers.id, assignmentId));
//     res.json({ message: 'Statut de la livraison mis à jour' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de livraison', error });
//   }
// });

// Update a driver
router.put('/drivers/:id', async (req: Request, res: Response) => {
  try {
    console.log('update driver.id', req.params.id);
    console.log('update driver', req.body);
    const updatedDriver = await updateDriver(Number(req.params.id), req.body);
    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver', error });
  }
});

// Delete a driver
router.delete('/drivers/:id', async (req: Request, res: Response) => {
  try {
    console.log('req.params.id', req.params.id);
    const success = await deleteDriver(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error });
  }
});

// List drivers with pagination
router.get('/drivers', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const drivers = await listDrivers(page, pageSize);
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error listing drivers', error });
  }
});

export default router;
