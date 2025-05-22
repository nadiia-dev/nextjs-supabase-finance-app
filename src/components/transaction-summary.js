import useFormatCurrency from "@/hooks/use-format-currency";

const TransactionSummary = ({ date, amount }) => {
  const formattedAmount = useFormatCurrency(amount);
  return (
    <div className="flex text-gray-500 font-semibold ">
      <div className="grow">{date}</div>
      <div className="min-w-[70px] text-right font-semibold">
        {formattedAmount}
      </div>
      <div className="min-w-[100px]"></div>
    </div>
  );
};

export default TransactionSummary;
