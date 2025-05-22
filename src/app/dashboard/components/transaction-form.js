import Button from "@/components/button";
import FormError from "@/components/form-error";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/constants";
import { transactionSchema } from "@/lib/valiadtion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const TransactionForm = ({ initialData }) => {
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

  const onSubmit = () => {};

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Type</Label>
          <Select>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
          <FormError error={errors.type} />
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Select>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          <FormError error={errors.category} />
        </div>

        <div>
          <Label className="mb-1">Date</Label>
          <Input {...register("created_at")} />
          <FormError error={errors.created_at} />
        </div>

        <div>
          <Label className="mb-1">Amount</Label>
          <Input type="number" {...register("amount")} />
          <FormError error={errors.amount} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input type="number" {...register("description")} />
          <FormError error={errors.description} />
        </div>

        <div className="flex justify-between items-center">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
