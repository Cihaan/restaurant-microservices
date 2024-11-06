import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { closeConnections, runMigrations } from './database/db';
import { errorHandler } from './middleware/error';
import { authGuard } from './middleware/guard';
import deliveryRoutes from './routes/deliveries';
import driverRoutes from './routes/drivers';
// import { configurePassport } from '/packages/auth-service/src/routes/auth';

const app = express();
dotenv.config();
console.log('Redis Host:', process.env.REDIS_HOST);
console.log('Redis Port:', process.env.REDIS_PORT);
console.log('Redis Password:', process.env.REDIS_PASSWORD);
console.log('Session Secret:', process.env.SESSION_SECRET);
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

// Si en production, on ajoute des configurations supplémentaires
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/deliveries', deliveryRoutes); // Routes de gestion des livraisons
app.use('/api/drivers', driverRoutes);

// Route de santé pour vérifier que le serveur est actif
app.get('/health', (_: Request, res: Response) => {
  res.send('OK');
});

const { PORT = 3333 } = process.env;

async function startServer() {
  try {
    // Lancer les migrations si nécessaire
    console.log(process.env);
    await runMigrations(); // Assurez-vous d'avoir une méthode pour appliquer les migrations

    // Lancer le serveur
    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    // Gestion de l'arrêt gracieux
    const gracefulShutdown = async () => {
      console.log('Gracefully shutting down...');
      await closeConnections(); // Fermer les connexions DB ou autres services
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    // Ajouter des gestionnaires pour l'arrêt du serveur
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
