import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, desc } from "drizzle-orm";
import postgres from "postgres";
config({ path: ".env.local" });
import { type InsertWish, type SelectWish, wishesTable } from "./schema";

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

export async function hasCreatedWish(userId: string): Promise<boolean> {
  try {
    const items = await db
      .select()
      .from(wishesTable)
      .where(eq(wishesTable.userId, userId));
    return items.length > 0;
  } catch (error) {
    console.error(error);
    return true;
  }
}
export async function createWish(data: InsertWish) {
  try {
    await db.insert(wishesTable).values(data);
  } catch (error) {
    console.error(error);
  }
}
export async function getWishes(): Promise<SelectWish[]> {
  try {
    return await db.select().from(wishesTable).orderBy(desc(wishesTable.id));
  } catch (error) {
    console.error(error);
    return [];
  }
}
