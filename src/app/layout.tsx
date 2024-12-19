"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import Loader from "@/components/common/Loader";
import NextAuthSessionProvider from '@/providers/sessionProvider';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 60 * 1000,
      gcTime: 3 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    },
  },
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NextAuthSessionProvider>
        <PersistQueryClientProvider 
          client={queryClient}
          persistOptions={{ persister }}
        >
          {loading ? <Loader /> : children}
        </PersistQueryClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
