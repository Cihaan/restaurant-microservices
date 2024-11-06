import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { InsertCommande, commandes, SelectCommande } from '../database/schemas';

// Create a new commande
export async function createCommande(commandeData: InsertCommande): Promise<SelectCommande> {
  const [newCommande] = await db.insert(commandes).values(commandeData).returning();
  return newCommande;
}

// Read a commande by ID
export async function getCommandeById(id: number): Promise<SelectCommande | null> {
  const [commande] = await db.select().from(commandes).where(eq(commandes.id, id));
  return commande || null;
}

// Update a commande
export async function updateCommande(
  id: number,
  commandeData: Partial<InsertCommande>
): Promise<SelectCommande | null> {
  const [updatedCommande] = await db
    .update(commandes)
    .set(commandeData)
    .where(eq(commandes.id, id))
    .returning();
  return updatedCommande || null;
}

// Delete a commande
export async function deleteCommande(id: number): Promise<boolean> {
  const result = await db.delete(commandes).where(eq(commandes.id, id));
  return result > 0;
}

// List commandes with pagination
export async function listCommandes(
  page = 1,
  pageSize = 10
): Promise<SelectCommande[]> {
  return db
    .select()
    .from(commandes)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
