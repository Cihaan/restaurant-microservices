import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Enum pour les statuts de livraison
export const DeliveryStatusEnum = pgEnum('delivery_status', [
  'pending',    // En attente
  'in_progress', // En cours
  'completed',   // Terminée
]);

export const deliveries = pgTable(
  'deliveries',
  {
    id: serial('id').primaryKey(),
    assignedDriverId: varchar('assigned_driver_id', { length: 255 }).notNull(),
    status: DeliveryStatusEnum('status').notNull(),
    deliveryDate: timestamp('delivery_date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    driverIndex: uniqueIndex('assigned_driver_id_idx').on(table.assignedDriverId),
  })
);

export type SelectDelivery = InferSelectModel<typeof deliveries>;
export type InsertDelivery = InferInsertModel<typeof deliveries>;
