"use server";
import { AppError } from "@/app/lib/error";
import * as db from "@/app/lib/db/index";
import type { InsertWish } from "@/app/lib/db/schema";
import type { WishFormItem } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { getUserId } from "../auth/actions";

export async function createWish(item: WishFormItem) {
  try {
    const id = await getUserId();
    if (!id) {
      throw new AppError("User does not exist", false);
    }
    const wishItem: InsertWish = {
      ...item,
      userId: id,
    };
    await db.createWish(wishItem);
    revalidatePath("/", "page");
  } catch (error) {
    console.error(error);
  }
}

export async function hasCreatedWish() {
  try {
    const id = await getUserId();
    if (!id) {
      throw new AppError("User does not exist", false);
    }
    return await db.hasCreatedWish(id);
  } catch (error) {
    console.error(error);
    return true;
  }
}

export async function getWishes() {
  try {
    return db.getWishes();
  } catch (error) {
    console.error(error);
  }
}
