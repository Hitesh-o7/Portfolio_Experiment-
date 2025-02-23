import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/context/AnimationContext";

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A smooth scrolling website with dynamic background and text colors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
