/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
// import { specs, swaggerUi } from 'packages/auth-service/src/docs/swagger';
import passport from 'passport';
import path from 'path';
import { redisStore } from './caching/redis';
import { closeConnections, runMigrations } from './database/db';
import { errorHandler } from './middleware/error';
import { authGuard } from './middleware/guard';
import authRoutes, { configurePassport } from './routes/auth';
import userRoutes from './routes/users';

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3333',
      'http://localhost:3334',
      'http://localhost:3335',
      'http://localhost:3336',
      'http://localhost:5173',
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      sameSite: 'strict',
    },
  })
);

// Passport configuration
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error middleware
app.use(errorHandler);

// Routes
app.use(authRoutes);
// app.use(authGuard, userRoutes);
app.use(userRoutes);

app.get('/health', (_: Request, res: Response) => {
  res.send('OK');
});

const { PORT = 3333 } = process.env;

async function startServer() {
  try {
    console.log(process.env);
    // if (process.env.NODE_ENV !== 'production') {
    await runMigrations();
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
