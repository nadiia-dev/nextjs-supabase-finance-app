"use client";
import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummary from "@/components/transaction-summary";
import { transactionsByDate } from "@/lib/transactionsByDate";

const TransactionList = ({ initialTransactions, range }) => {
  const grouped = transactionsByDate(initialTransactions);
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
