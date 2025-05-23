import { Loader, X } from "lucide-react";
import Button from "./button";
import { useState } from "react";
import { deleteTransaction } from "@/lib/actions";

const TransactionRemove = ({ id, onRemove }) => {
  const [loading, setLoading] = useState();
  const [confirmed, setConfirmed] = useState();
  const handleDelete = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);
      onRemove();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="xs"
      variant={!confirmed ? "ghost" : "danger"}
      onClick={handleDelete}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default TransactionRemove;
