// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import deliveryRoutes from './routes/delivery.routes';
import { db } from './config/database';
import { sql } from 'drizzle-orm'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', deliveryRoutes);

// Check connection to the database (Drizzle doesn't need a sync method like Sequelize)
(async () => {
  try {
    await db.execute(sql`SELECT 1`); // This is a simple test query to ensure connection
    console.log('Connected to the database');
    
    // Start the server after the database connection is successful
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();
