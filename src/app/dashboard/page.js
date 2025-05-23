import { Suspense } from "react";
import TransactionListFallback from "./components/transaction-list-skeletons";
import TrendFallback from "./components/trend-fallbask";
import Trend from "./components/trend";
import Range from "./components/range";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { sizes, variants } from "@/lib/variants";
import { types } from "@/lib/constants";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import TransactionListWrapper from "./components/transaction-list-wrapper";
import { createClient } from "@/lib/supabase/server";

const page = async ({ searchParams }) => {
  const supabase = await createClient();
  const {
    data: {
      user: { user_metadata: settings },
    },
  } = await supabase.auth.getUser();
  const range = searchParams?.range ?? settings?.defaultView ?? "last30days";

  return (
    <div className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Summary</h1>
        <aside>
          <Range defaultView={range} />
        </aside>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {types.map((type) => (
          <ErrorBoundary
            key={type}
            fallback={
              <div className="text-red-500">Cannot fetch {type} trend data</div>
            }
          >
            <Suspense fallback={<TrendFallback />}>
              <Trend type={type} range={range} />
            </Suspense>
          </ErrorBoundary>
        ))}
      </section>

      <section className="flex justify-between items-center">
        <h2 className="text-2xl">Transactions</h2>
        <Link
          href="/dashboard/transaction/add"
          className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
        >
          <PlusCircle className="h-4 w-4" />
          <div>Add</div>
        </Link>
      </section>

      <section>
        <Suspense fallback={<TransactionListFallback />}>
          <TransactionListWrapper range={range} />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
