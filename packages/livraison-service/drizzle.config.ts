// drizzle.config.ts
import { config } from 'dotenv';
config();

export default {
  schema: "./src/models",  // Dossier où se trouvent tes schémas Drizzle
  out: "./migrations",    // Dossier où les migrations seront générées
  connectionString: process.env.DATABASE_URL,  // Variable d'environnement pour la DB
};
