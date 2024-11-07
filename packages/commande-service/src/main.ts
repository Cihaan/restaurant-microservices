/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { closeConnections } from './database/db';
import { errorHandler } from './middleware/error';
import commandesRoutes from './routes/commandes'
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(commandesRoutes);

// Error middleware
app.use(errorHandler);

app.get('/healthz', (req: Request, res: Response) => {
  res.status(200)
  res.json("OK")
  return res
});

const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    // if (process.env.NODE_ENV !== 'production') {
      // await runMigrations();
    // }

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Handle graceful shutdown
    const gracefulShutdown = async () => {
      console.log('Gracefully shutting down...');
      await closeConnections();
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    server.on('error', console.error);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);

export default app;
