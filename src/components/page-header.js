import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import getServerDarkMode from "@/hooks/use-server-dark-mode";
import { createClient } from "@/lib/supabase/server";
import { KeyRound } from "lucide-react";
import SignOutButton from "./sign-out-button";
import Avatar from "./avatar";
import { sizes, variants } from "@/lib/variants";

const PageHeader = async ({ className }) => {
  const theme = getServerDarkMode();
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center">
        <ThemeToggle defaultMode={theme} />
        {user && (
          <Link
            href="/dashboard/settings"
            className={`flex items-center space-x-1 ${variants["ghost"]} ${sizes["sm"]}`}
          >
            <Avatar />
            <span>{user?.user_metadata?.fullName ?? user?.email}</span>
          </Link>
        )}
        {user && <SignOutButton />}
        {!user && (
          <Link href="/login" className={`${variants["ghost"]} ${sizes["sm"]}`}>
            <KeyRound className="w-6 h-6" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
