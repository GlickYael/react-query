import React from 'react';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
    </QueryClientProvider>
    
  );
}
