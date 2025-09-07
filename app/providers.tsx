"use client"

import { Toaster as Sonner } from "@/components/ui/sonner";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { defaultShouldDehydrateQuery, isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const MINUTE = 60 * 1000;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * MINUTE,
        staleTime: 5 * MINUTE,
        refetchInterval: 5 * MINUTE,
        retry: 0,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Providers({ children }: { children: React.ReactNode }) {

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider
        height="5px"
        color="#54ad77"
        options={{ showSpinner: false }}
        shallowRouting
      >
        {children}
      </ProgressProvider>
      <Sonner richColors expand={true} position="top-right" />
    </QueryClientProvider>
  )
}