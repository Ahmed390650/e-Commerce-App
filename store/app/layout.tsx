import { getBaseURL } from "@/lib/utils/env";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import QueryProvider from "@/components/provider/QueryProvider";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable}`}
      >
        <body>
          <QueryProvider>
            <main>
              {props.children}
              <Toaster position="bottom-left" richColors />
            </main>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
