import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Hitesh Thakur",
  description: "Creative Portfolio showcasing 3D art, games, and development work",
  icons: {
    icon: "/BottomLogo.svg",
    shortcut: "/BottomLogo.svg",
    apple: "/BottomLogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
