import QueryProvider from "@/components/provider/QueryProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Nav from "@/modules/layout/templates/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />
      <main className="container mx-auto max-w-7xl my-5">{children}</main>
      {/* <section className="bg-gray-100 py-16 px-6 md:px-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Stay in the Loop</h2>
          <p className="text-gray-600 mb-6">
            Sign up to get exclusive offers and the latest fashion updates.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email" className="rounded-l-2xl" />
            <Button className="rounded-r-2xl">Subscribe</Button>
          </div>
        </section>
        <footer className="py-4 text-center text-sm text-gray-500 border-t h-fit">
          © {new Date().getFullYear()} Your Brand. All rights reserved.
        </footer> */}
    </div>
  );
}
