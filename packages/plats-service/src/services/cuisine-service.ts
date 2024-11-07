import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { InsertPlat, plats, SelectPlat } from '../database/schemas';

// Create a new user
export async function createPlat(platData: InsertPlat): Promise<SelectPlat> {
  const [newPlat] = await db.insert(plats).values(
    { ...platData, createdAt: new Date().toDateString(), updatedAt: new Date().toDateString() }
  ).returning();
  return newPlat;
}

// Read a user by ID
export async function getPlatById(id: number): Promise<SelectPlat | null> {
  const [plat] = await db.select().from(plats).where(eq(plats.id, id));
  return plat || null;
}


// Update a plat
export async function updatePlat(
  id: number,
  platData: Partial<InsertPlat>
): Promise<SelectPlat | null> {
  console.log('update funct plat.id', id);
  console.log('update plat', platData);
  const [updatedPlat] = await db
    .update(plats)
    .set({ ...platData, updatedAt: new Date().toDateString() })
    .where(eq(plats.id, id))
    .returning();
  return updatedPlat || null;
}

// Delete a plat
export async function deletePlat(id: number): Promise<boolean> {
  const result = await db.delete(plats).where(eq(plats.id, id));
  return result > 0;
}

// List plats with pagination
export async function listPlats(
  page = 1,
  pageSize = 10
): Promise<SelectPlat[]> {
  return db
    .select()
    .from(plats)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
