import Header from "@/components/Header";

export default async function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header title={title} />
      <main className="flex flex-col items-center">{children}</main>
    </div>
  );
}
