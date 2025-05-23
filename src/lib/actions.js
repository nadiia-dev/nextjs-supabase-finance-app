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

export const fetchTransactions = async (range, limit = 10, offset = 0) => {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error("Can`t fetch transactions");
  return data;
};

export const deleteTransaction = async (id) => {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) {
    throw new Error("Failed deleting the transaction");
  }
  revalidatePath("/dashboard");
};
