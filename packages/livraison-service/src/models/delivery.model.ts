// src/models/delivery.model.ts
import { pgTable, serial, varchar, text, pgEnum } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

// Enum pour les statuts de livraison
export const deliveryStatusEnum = pgEnum('delivery_status', ['pending', 'in-transit', 'delivered']);

export const deliveries = pgTable("deliveries", {
  id: serial("id").primaryKey(),
  orderId: varchar("order_id", { length: 255 }).notNull(),
  deliveryPersonId: varchar("delivery_person_id", { length: 255 }).notNull(),
  status: deliveryStatusEnum("status").notNull().default('pending'),
});

export type Delivery = InferModel<typeof deliveries>; // TypeScript type for Delivery
export type NewDelivery = InferModel<typeof deliveries, "insert">; // Type for creating new deliveries
