import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SupabaseUserProvider } from "@/components/providers/supabase-user-provider";
import { Toaster } from "@/components/ui/toaster";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inherent Risk Ai",
  description: "AI to predict the inherent risk of a customer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "bg-white dark:bg-black")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="rakyc-theme"
        >
          <SupabaseUserProvider>
            <ModalProvider />
            {children}
            <Toaster />
          </SupabaseUserProvider>
        </ThemeProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}
