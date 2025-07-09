import "@/app/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Initialize axios configurations for backward compatibility
import "@/lib/axios-setup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App - Migrated from Monorepo",
  description: "Next.js application migrated from monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
