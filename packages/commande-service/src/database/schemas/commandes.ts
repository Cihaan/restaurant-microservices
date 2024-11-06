import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, varchar, integer, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import  {plats}  from 'packages/plats-service/src/database/schemas/plats'; // On suppose que la table des plats est déjà définie
import { users } from 'packages/auth-service/src/database/schemas/users'; // On suppose que la table des plats est déjà définie


export const commandes = pgTable(
  'commandes',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id), // Clé étrangère vers la table des utilisateurs
    status: varchar('status', { length: 50 }).notNull(), // Le statut de la commande
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  }
);

export const commandePlats = pgTable(
  'commande_plats',
  {
    id: serial('id').primaryKey(),
    commandeId: integer('commande_id').notNull().references(() => commandes.id), // Clé étrangère vers la table des commandes
    platId: integer('plat_id').notNull().references(() => plats.id), // Clé étrangère vers la table des plats
    quantite: integer('quantite').notNull().check((value) => value > 0), // Quantité du plat dans la commande
  }
);

export type SelectCommande = InferSelectModel<typeof commandes>;
export type InsertCommande = InferInsertModel<typeof commandes>;
