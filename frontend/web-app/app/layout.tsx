import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./nav/Navbar";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
  title: "Cars Auction",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        <main className="md:container md:mx-auto pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
