"use client";
import DateRangeSelect from "@/components/date-range-select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Range = ({ defaultView }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const range = searchParams.get("range") ?? defaultView ?? "last30days";

  const handleChange = (e) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return <DateRangeSelect defaultValue={range} onChange={handleChange} />;
};

export default Range;
