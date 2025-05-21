import Link from "next/link";

const PageHeader = ({ className }) => {
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center">
        <div>Dark mode toggle</div>
        <div>User dropdown</div>
      </div>
    </header>
  );
};

export default PageHeader;
