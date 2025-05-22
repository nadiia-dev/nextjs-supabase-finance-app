import BaseTrend from "@/components/trend";

const Trend = async ({ type }) => {
  const res = await fetch(`http://localhost:3100/trends/${type}`);
  const { amount, prevAmount } = await res.json();
  return <BaseTrend type={type} amount={amount} prevAmount={prevAmount} />;
};

export default Trend;
