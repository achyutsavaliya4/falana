"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage:
    typeof window !== "undefined"
      ? {
          getItem: (key) => Promise.resolve(localStorage.getItem(key)),
          setItem: (key, value) =>
            Promise.resolve(localStorage.setItem(key, value)),
          removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
        }
      : undefined,
});

if (typeof window !== "undefined") {
  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24,
  });
}

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <TanStackDevtools
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      /> */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
