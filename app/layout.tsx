import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { MyRuntimeProvider } from "./context/runtimeProvider";
import { AppProvider } from "../app/context/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arc",
  description: "create stunning ui in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
      signInUrl="/signin"
      signUpUrl="/signup"
    >
      <AppProvider>
        <MyRuntimeProvider>
          <html lang="en" suppressHydrationWarning>
            <head>
              <link rel="icon" href="/logo.png" />
            </head>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              suppressHydrationWarning
            >
              <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
              </ThemeProvider>
            </body>
          </html>
        </MyRuntimeProvider>
      </AppProvider>
    </ClerkProvider>
  );
}
