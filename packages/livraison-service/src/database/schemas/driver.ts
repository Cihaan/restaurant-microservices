import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Enum pour les statuts de conducteur
export const DriverStatusEnum = pgEnum('driver_status', [
  'available',   // Disponible
  'in_delivery', // En cours de livraison
]);

export const drivers = pgTable(
  'drivers',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    status: DriverStatusEnum('status').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    nameIndex: uniqueIndex('driver_name_idx').on(table.name), // Index unique sur le nom
  })
);

export type SelectDriver = InferSelectModel<typeof drivers>;
export type InsertDriver = InferInsertModel<typeof drivers>;
