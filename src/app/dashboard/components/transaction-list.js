import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummary from "@/components/transaction-summary";
import { createClient } from "@/lib/supabase/server";
import { transactionsByDate } from "@/lib/transactionsByDate";

const TransactionList = async ({ range }) => {
  const supabase = await createClient();

  let { data: transactions, error } = await supabase.rpc("fetch_transactions", {
    // limit_arg,
    // offset_arg,
    range_arg: range,
  });
  if (error) throw new Error("Can`t fetch transactions");

  const grouped = transactionsByDate(transactions);
  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummary date={date} amount={amount} />
          <Separator />
          <section className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
