import express, { Request, Response } from 'express';
import { createDriver, deleteDriver, getDriverById, listDrivers, updateDriver } from '../services/driver-service';

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
