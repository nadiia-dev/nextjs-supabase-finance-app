"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";

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

export const editTransaction = async (id, data) => {
  const validated = transactionSchema.safeParse(data);
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id);
  if (error) {
    throw new Error("Failed creating the transaction");
  }
  revalidatePath("/dashboard");
};

export async function login(prevState, formData) {
  const supabase = await createClient();
  const email = formData.get("email");
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return {
      error: true,
      message: "Error authenticating!",
    };
  }
  return {
    message: `Email sent to ${email}`,
  };
}
