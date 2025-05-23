"use client";

import { LogOut } from "lucide-react";
import SubmitButton from "./submit-button";
import { signout } from "@/lib/actions";

const SignOutButton = () => {
  return (
    <form action={signout}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
};

export default SignOutButton;
