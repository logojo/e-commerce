import { Footer, Sidebar, TopMenu } from "@/app/components";



export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 md:px-5">
        { children }
      </div>
      <Footer />
    </main>
  );
}