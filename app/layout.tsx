import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";
import { Toaster } from "sonner";

const geistSans = Urbanist({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "RealityCheck",
  description: "Turn your problems into questionably helpful advice!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className}  antialiased flex flex-col text-white`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
