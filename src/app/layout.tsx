import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";
import PageLayoutClient from "./PageLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automated Framework Creator",
  description: "Create and manage frameworks and channels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-full bg-background text-foreground antialiased`}
      >
        <PageLayoutClient>{children}</PageLayoutClient>
      </body>
    </html>
  );
}
