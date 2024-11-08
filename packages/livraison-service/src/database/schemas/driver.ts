import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  pgEnum,
  // uniqueIndex,
} from 'drizzle-orm/pg-core';

export const DriverStatusEnum = pgEnum('driver_status', ['pending', 'available', 'in_delivery']);

export const drivers = pgTable(
  'drivers',
  {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    order_id: varchar('order_id'),
    status: DriverStatusEnum('status').default('available'),
    assignedAt: timestamp('assigned_at').defaultNow(),
    createdAt: timestamp('created_at').defaultNow()
  }
);

export type SelectDriver = InferSelectModel<typeof drivers>;
export type InsertDriver = InferInsertModel<typeof drivers>;
