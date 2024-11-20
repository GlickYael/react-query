"use client"
import React from 'react';
import Cars from './cars/page';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Cars />
      </QueryClientProvider>
    </div>

  );
}
