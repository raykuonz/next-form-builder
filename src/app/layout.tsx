import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import FormDesignerProvider from "@/providers/form-designer-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Form Builder",
  description: "Generated form by prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader />
          <FormDesignerProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </FormDesignerProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
