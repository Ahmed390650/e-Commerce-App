"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();
const QueryProvider = ({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<
  typeof NextThemesProvider
>) => {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextThemesProvider>
  );
};

export default QueryProvider;
