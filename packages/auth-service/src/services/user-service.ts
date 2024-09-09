import { eq, like, or, sql } from 'drizzle-orm';
import { db } from '../database/db';
import { InsertUser, SelectUser, users } from '../database/schemas';

// Create a new user
export async function createUser(userData: InsertUser): Promise<SelectUser> {
  const [newUser] = await db.insert(users).values(userData).returning();
  return newUser;
}

// Read a user by ID
export async function getUserById(id: number): Promise<SelectUser | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
}

// Read a user by email
export async function getUserByEmail(
  email: string
): Promise<SelectUser | null> {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user || null;
}

// Read a user by username
export async function getUserByUsername(
  username: string
): Promise<SelectUser | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user || null;
}

// Update a user
export async function updateUser(
  id: number,
  userData: Partial<InsertUser>
): Promise<SelectUser | null> {
  const [updatedUser] = await db
    .update(users)
    .set(userData)
    .where(eq(users.id, id))
    .returning();
  return updatedUser || null;
}

// Delete a user
export async function deleteUser(id: number): Promise<boolean> {
  const result = await db.delete(users).where(eq(users.id, id));
  return result.count > 0;
}

// List users with pagination
export async function listUsers(
  page = 1,
  pageSize = 10
): Promise<SelectUser[]> {
  return db
    .select()
    .from(users)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

// Search users by name or email
export async function searchUsers(query: string): Promise<SelectUser[]> {
  return db
    .select()
    .from(users)
    .where(
      or(
        like(users.fristName, `%${query}%`),
        like(users.lastName, `%${query}%`),
        like(users.email, `%${query}%`)
      )
    );
}

// Get user count
export async function getUserCount(): Promise<number> {
  const [result] = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(users);
  return result?.count || 0;
}

// Check if email exists
export async function isEmailTaken(email: string): Promise<boolean> {
  const [result] = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(users)
    .where(eq(users.email, email));
  return (result?.count || 0) > 0;
}

// Check if username exists
export async function isUsernameTaken(username: string): Promise<boolean> {
  const [result] = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(users)
    .where(eq(users.username, username));
  return (result?.count || 0) > 0;
}

// Get users by provider
export async function getUsersByProvider(
  provider: string
): Promise<SelectUser[]> {
  return db.select().from(users).where(eq(users.provider, provider));
}

// Update last login
// export async function updateLastLogin(id: number): Promise<void> {
//   await db.update(users).set({ updatedAt: new Date() }).where(eq(users.id, id));
// }
