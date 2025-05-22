import BaseTrend from "@/components/trend";
import { createClient } from "@/lib/supabase/server";

const Trend = async ({ type, range }) => {
  const supabase = await createClient();
  let { data, error } = await supabase.rpc("calculate_total", {
    type_arg: type,
    range_arg: range,
  });
  if (error) throw new Error("Coud not fetch the trend data");

  const amounts = data[0];

  return (
    <BaseTrend
      type={type}
      amount={amounts.current_amount}
      prevAmount={amounts.previous_amount}
    />
  );
};

export default Trend;
