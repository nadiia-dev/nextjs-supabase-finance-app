import PageHeader from "@/components/page-header";

export const metadata = {
  title: "Dashboard",
};

const layout = ({ children }) => {
  return (
    <>
      <PageHeader className="my-8" />
      <main>{children}</main>
      <footer className="mt-auto text-center py-8">Footer</footer>
    </>
  );
};

export default layout;
