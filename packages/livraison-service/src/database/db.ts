import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schemas';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT||'5432', 10),
  database: process.env.DB_DATABASE!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
};

const connectionString = `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

// Migration client
const migrationClient = postgres(connectionString, { max: 1 });

// Query client with connection pool
const queryClient = postgres(connectionString);
const db = drizzle(queryClient, { schema });

// Migration function
async function runMigrations() {
  await migrate(drizzle(migrationClient), { migrationsFolder: './drizzle' });
}

// Graceful shutdown function
async function closeConnections() {
  console.log('Closing database connections...');
  await queryClient.end();
  await migrationClient.end();
  console.log('Database connections closed.');
}

export { closeConnections, db, runMigrations };
