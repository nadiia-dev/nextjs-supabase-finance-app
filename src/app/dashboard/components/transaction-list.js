"use client";
import Button from "@/components/button";
import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummary from "@/components/transaction-summary";
import { fetchTransactions } from "@/lib/actions";
import { transactionsByDate } from "@/lib/transactionsByDate";
import { Loader } from "lucide-react";
import { useState } from "react";

const TransactionList = ({ initialTransactions, range }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = useState(false);
  const grouped = transactionsByDate(transactions);

  const handleClick = async () => {
    setLoading(true);
    let next = null;
    try {
      next = await fetchTransactions(range, transactions.length, 10);
      setButtonHidden(next.length === 0);
      setTransactions((prev) => [...prev, ...next]);
    } finally {
      setLoading(false);
    }
  };
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
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
