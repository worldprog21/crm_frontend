"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "./lib/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionWrapper>
        {children}
        <Toaster />
      </SessionWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
