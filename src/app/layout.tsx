import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/context/AnimationContext";

export const metadata: Metadata = {
  title: "Portfolio", 
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
