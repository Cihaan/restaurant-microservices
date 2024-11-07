import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { InsertDelivery, deliveries, SelectDelivery } from '../database/schemas';

// Create a new delivery
export async function createDelivery(deliveryData: InsertDelivery): Promise<SelectDelivery> {
  const [newDelivery] = await db.insert(deliveries).values(deliveryData).returning();
  return newDelivery;
}

// Read a delivery by ID
export async function getDeliveryById(id: number): Promise<SelectDelivery | null> {
  const [delivery] = await db.select().from(deliveries).where(eq(deliveries.id, id));
  return delivery || null;
}

// Update a delivery
export async function updateDelivery(
  id: number,
  deliveryData: Partial<InsertDelivery>
): Promise<SelectDelivery | null> {
  const [updatedDelivery] = await db
    .update(deliveries)
    .set(deliveryData)
    .where(eq(deliveries.id, id))
    .returning();
  return updatedDelivery || null;
}

// Delete a delivery
export async function deleteDelivery(id: number): Promise<boolean> {
  const result = await db.delete(deliveries).where(eq(deliveries.id, id));
  return result > 0;
}

// List deliveries with pagination
export async function listDeliveries(
  page = 1,
  pageSize = 10
): Promise<SelectDelivery[]> {
  return db
    .select()
    .from(deliveries)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
