import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { InsertDriver, drivers, SelectDriver } from '../database/schemas';
import { users } from 'packages/auth-service/src/database/schemas';

// Create a new driver
export async function createDriver(driverData: InsertDriver): Promise<SelectDriver> {
  const [newDriver] = await db.insert(drivers).values(driverData).returning();
  return newDriver;
}

// Read a driver by ID
export async function getDriverById(id: number): Promise<SelectDriver | null> {
  const [driver] = await db.select().from(drivers).where(eq(drivers.id, id));
  return driver || null;
}

// Get available drivers
export async function getAvailableDrivers(): Promise<{ id: number, name: string, status: string }[]> {
  const availableDrivers = await db
    .select({
      driverId: drivers.id,
      firstName: users.firstName,
      lastName: users.lastName,
      status: drivers.status,
    })
    .from(drivers)
    .innerJoin(users, eq(drivers.id, users.id))
    .where(eq(drivers.status, 'available'));

  return availableDrivers.map(driver => ({
    id: driver.driverId,
    name: driver.firstName,
    lastName: driver.lastName,
    status: driver.status
  }));
}


// Update a driver
export async function updateDriver(
  id: number,
  driverData: Partial<InsertDriver>
): Promise<SelectDriver | null> {
  const [updatedDriver] = await db
    .update(drivers)
    .set(driverData)
    .where(eq(drivers.id, id))
    .returning();
  return updatedDriver || null;
}

// Delete a driver
export async function deleteDriver(id: number): Promise<boolean> {
  const result = await db.delete(drivers).where(eq(drivers.id, id));
  return result > 0;
}

// List drivers with pagination
export async function listDrivers(
  page = 1,
  pageSize = 10
): Promise<SelectDriver[]> {
  return db
    .select()
    .from(drivers)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}
