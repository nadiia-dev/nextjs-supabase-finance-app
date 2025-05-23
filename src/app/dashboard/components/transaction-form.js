"use client";
import Button from "@/components/button";
import FormError from "@/components/form-error";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/constants";
import { transactionSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createTransaction, editTransaction } from "@/lib/actions";
import { useState } from "react";

const TransactionForm = ({ initialData }) => {
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [finalErr, setFinalErr] = useState();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split("T")[0],
    },
  });
  const type = watch("type");
  const editing = Boolean(initialData);

  const onSubmit = async (data) => {
    setSaving(true);
    setFinalErr();

    try {
      if (editing) {
        await editTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }
      router.push("/dashboard");
    } catch (error) {
      setFinalErr(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Type</Label>
          <Select
            {...register("type", {
              onChange: (e) => {
                if (e.target.value !== "Expense") {
                  setValue("category", "");
                }
              },
            })}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <FormError error={errors.type} />
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Select {...register("category")} disabled={type !== "Expense"}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <FormError error={errors.category} />
        </div>

        <div>
          <Label className="mb-1">Date</Label>
          <Input {...register("created_at")} disabled={editing} />
          <FormError error={errors.created_at} />
        </div>

        <div>
          <Label className="mb-1">Amount</Label>
          <Input type="number" {...register("amount")} />
          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input type="text" {...register("description")} />
          <FormError error={errors.description} />
        </div>

        <div className="flex justify-between items-center">
          <div>{finalErr && <FormError error={finalErr} />}</div>
          <Button type="submit" disabled={isSaving}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
