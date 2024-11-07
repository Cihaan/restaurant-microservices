import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  integer,
  pgEnum,
  // uniqueIndex,
} from 'drizzle-orm/pg-core';

export const DriverStatusEnum = pgEnum('driver_status', ['pending', 'available', 'in_delivery']);

export const drivers = pgTable(
  'drivers',
  {
    id: serial('id').primaryKey(),
    driverId: integer('driver_id').notNull(), // ID du livreur (référence à la table des utilisateurs)
    orderId: integer('order_id').notNull(),
    status: DriverStatusEnum('status').default("available"),
    assignedAt: timestamp('assigned_at').defaultNow(),
    createdAt: timestamp('created_at').defaultNow()
  }
  // },
  // (table) => ({
  //   nameIndex: uniqueIndex('driver_name_idx').on(table.name), // Index unique sur le nom
  // })
);

export type SelectDriver = InferSelectModel<typeof drivers>;
export type InsertDriver = InferInsertModel<typeof drivers>;
