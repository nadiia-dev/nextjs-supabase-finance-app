"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export const createTransaction = async (data) => {
  const validated = transactionSchema.safeParse(data);
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert(data);
  if (error) {
    throw new Error("Failed creating the transaction");
  }
  revalidatePath("/dashboard");
};
