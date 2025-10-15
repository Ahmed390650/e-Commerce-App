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
    </div>
  );
}
