import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevGym Coach",
  description: "Your guided practice coach for DevGym",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
