import TransactionForm from "@/app/dashboard/components/transaction-form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Transaction",
};

const page = async (props) => {
  const { id } = await props.params;
  const supabase = await createClient();
  console.log(id);

  const { data: transaction, error } = await supabase
    .from("transactions")
    .select()
    .eq("id", id)
    .single();

  if (error) notFound();

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
};

export default page;
