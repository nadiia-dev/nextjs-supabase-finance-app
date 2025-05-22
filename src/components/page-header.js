import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import getServerDarkMode from "@/hooks/use-server-dark-mode";

const PageHeader = ({ className }) => {
  const theme = getServerDarkMode();
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
        <div>User dropdown</div>
      </div>
    </header>
  );
};

export default PageHeader;
