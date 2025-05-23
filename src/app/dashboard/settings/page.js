"use client";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/lib/actions";
import { useActionState } from "react";

const initialState = {
  message: "",
  error: false,
};

const Page = () => {
  const [state, formAction] = useActionState(uploadAvatar, initialState);

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={uploadAvatar}>
        <Input type="file" name="file" id="file" />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
};

export default Page;
