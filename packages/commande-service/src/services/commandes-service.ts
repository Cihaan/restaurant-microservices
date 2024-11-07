import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { InsertCommande, commandes, SelectCommande, SelectCommandePlat, InsertCommandePlat, commandePlats } from '../database/schemas';

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

// Add plats to a commande
export async function addPlatsToCommande(
  commandeId: number,
  platsData: { platId: number; quantite: number }[]
): Promise<SelectCommandePlat[]> {
  const insertData = platsData.map(plat => ({
    commandeId,
    platId: plat.platId,
    quantite: plat.quantite
  }));

  const newCommandePlats = await db.insert(commandePlats)
    .values(insertData)
    .returning();

  return newCommandePlats;
}

// Get all plats for a specific commande
export async function getPlatsForCommande(commandeId: number): Promise<SelectCommandePlat[]> {
  const commandePlatsData = await db
    .select()
    .from(commandePlats)
    .where(eq(commandePlats.commandeId, commandeId));

  return commandePlatsData;
}

// Update quantity of a plat in a commande
export async function updatePlatQuantity(
  commandeId: number,
  platId: number,
  newQuantite: number
): Promise<SelectCommandePlat | null> {
  const [updatedCommandePlat] = await db
    .update(commandePlats)
    .set({ quantite: newQuantite })
    .where(
      and(
        eq(commandePlats.commandeId, commandeId),
        eq(commandePlats.platId, platId)
      )
    )
    .returning();

  return updatedCommandePlat || null;
}

// Remove a plat from a commande
export async function removePlatFromCommande(
  commandeId: number,
  platId: number
): Promise<boolean> {
  const result = await db
    .delete(commandePlats)
    .where(
      and(
        eq(commandePlats.commandeId, commandeId),
        eq(commandePlats.platId, platId)
      )
    );

  return result > 0;
}

// Remove all plats from a commande
export async function removeAllPlatsFromCommande(commandeId: number): Promise<boolean> {
  const result = await db
    .delete(commandePlats)
    .where(eq(commandePlats.commandeId, commandeId));

  return result > 0;
}

// Get detailed commande with plats
export async function getCommandeWithPlats(commandeId: number): Promise<{
  commande: SelectCommande;
  plats: SelectCommandePlat[];
} | null> {
  const commande = await getCommandeById(commandeId);
  if (!commande) return null;

  const plats = await getPlatsForCommande(commandeId);

  return {
    commande,
    plats
  };
}
