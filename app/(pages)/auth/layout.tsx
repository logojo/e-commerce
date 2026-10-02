
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-red-100 ">
      { children }
    </main>
  );
}