import TransactionForm from "../../components/transaction-form";

export const metadata = {
  title: "Add transaction",
};

const page = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
      <TransactionForm />
    </>
  );
};

export default page;
