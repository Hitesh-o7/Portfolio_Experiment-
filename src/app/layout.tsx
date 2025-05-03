import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/context/AnimationContext";
import TransitionOverlay from "@/components/Transition/TransitionOverlay";

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
          <TransitionOverlay />
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}
