import { getBaseURL } from "@/lib/utils/env";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import QueryProvider from "@/components/provider/QueryProvider";
const inter = Inter({
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700"], // Specify desired weights for optimization
  subsets: ["latin"],
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
        className={`${inter.className} ${roboto.className}`}
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
