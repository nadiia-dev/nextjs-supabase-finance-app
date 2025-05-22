import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-skeletons";
import TrendFallback from "./components/trend-fallbask";
import Trend from "./components/trend";

const page = () => {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <Suspense fallback={<TrendFallback />}>
          <Trend type="Income" />
          <Trend type="Expense" />
          <Trend type="Investment" />
          <Trend type="Saving" />
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<TransactionListFallback />}>
          <TransactionList />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
