"use client";

import { useState } from "react";
import { EmailComposer } from "@/components/EmailComposer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/useTheme";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-[#25293c]">
          <EmailComposer />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
