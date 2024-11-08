import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const plats = pgTable(
  'plats',
  {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    description: varchar('description').notNull(),
    price: varchar('price').notNull(),
    image: varchar('image'),
    createdAt: varchar('created_at'),
    updatedAt: varchar('updated_at')
  }
);

export type SelectPlat = InferSelectModel<typeof plats>;
export type InsertPlat = InferInsertModel<typeof plats>;
