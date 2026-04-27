import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevGym Coach — Westinghouse Prep",
  description: "Practice OOP, networking, secure coding, and testing for Principal Software Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
