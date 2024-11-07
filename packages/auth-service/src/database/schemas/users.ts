import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  timestamp,
  varchar,
  serial,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Enum pour les rôles d'utilisateur
export const UserRoleEnum = pgEnum("user_role", ["admin", "client", "livreur"]);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    provider: varchar('provider', { length: 50 }).notNull(),
    role: UserRoleEnum("role").default("client"),
    providerId: varchar('provider_id', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    emailIndex: uniqueIndex('email_idx').on(table.email),
    usernameIndex: uniqueIndex('username_idx').on(table.username),
  })
);

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
