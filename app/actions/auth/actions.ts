"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";
const DOMAIN = process.env.DOMAIN;

export async function signInWithPopup() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${DOMAIN}/auth/callback`,
    },
  });
  if (error) {
    redirect("/error");
  }

  //   revalidatePath("/", "layout");
  redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Unexpected error has occured, failed to get user\n", error);
    return null;
  }
}

export async function getUserId() {
  try {
    const user = await getUser();
    return user?.id ?? null;
  } catch (error) {
    console.error(
      "Unexpected error has occured, failed to get user id \n",
      error
    );
    return null;
  }
}
