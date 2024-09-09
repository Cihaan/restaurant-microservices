import express, { Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUserCount,
  getUsersByProvider,
  isEmailTaken,
  isUsernameTaken,
  listUsers,
  searchUsers,
  updateUser,
} from '../services/user-service';

const router = express.Router();

// Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Get a user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Get a user by email
router.get('/users/email/:email', async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Get a user by username
router.get('/users/username/:username', async (req: Request, res: Response) => {
  try {
    const user = await getUserByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
});

// Update a user
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(Number(req.params.id), req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Delete a user
router.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const success = await deleteUser(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

// List users with pagination
router.get('/users', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  try {
    const users = await listUsers(page, pageSize);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error listing users', error });
  }
});

// Search users by name or email
router.get('/users/search', async (req: Request, res: Response) => {
  const query = req.query.q as string;

  try {
    const users = await searchUsers(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
});

// Get user count
router.get('/users/count', async (req: Request, res: Response) => {
  try {
    const count = await getUserCount();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user count', error });
  }
});

// Check if email exists
router.get('/users/check-email/:email', async (req: Request, res: Response) => {
  try {
    const exists = await isEmailTaken(req.params.email);
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ message: 'Error checking email', error });
  }
});

// Check if username exists
router.get(
  '/users/check-username/:username',
  async (req: Request, res: Response) => {
    try {
      const exists = await isUsernameTaken(req.params.username);
      res.json({ exists });
    } catch (error) {
      res.status(500).json({ message: 'Error checking username', error });
    }
  }
);

// Get users by provider
router.get('/users/provider/:provider', async (req: Request, res: Response) => {
  try {
    const users = await getUsersByProvider(req.params.provider);
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching users by provider', error });
  }
});

export default router;
