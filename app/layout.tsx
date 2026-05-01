import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProviderWrapper } from "@/components/providers/query-client-provider";

export const metadata: Metadata = {
  title: "Timesheet Management",
  description: "Track and manage your weekly timesheets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}
