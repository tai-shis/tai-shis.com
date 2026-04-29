import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Footer from "@/app/components/footer";
import Shell from "@/app/components/shell";
import HomeSlide from "@/app/components/home/home-slide";
import VendorReports from "@/app/components/projects/vendor-reports";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const gitSans = localFont({
  src: "./fonts/gitsans/gitsans.ttf",
  variable: "--font-gitsans",
});

const aberMono = localFont({
  src: [
    { path: "./fonts/aber-mono/AberMono-Light.woff", weight: "300" },
    { path: "./fonts/aber-mono/AberMono-Regular.woff", weight: "400" },
    { path: "./fonts/aber-mono/AberMono-Bold.woff", weight: "700" },
  ],
  variable: "--font-aber-mono",
});

export const metadata: Metadata = {
  title: "tai-shis | Tai Shishiba - Software Developer",
  description: "",
};

export default function RootLayout({}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} ${gitSans.variable} ${aberMono.variable} h-full antialiased bg-background text-foreground`}
    >
      <body className="h-full overflow-hidden flex flex-col">
        <div className="w-full max-w-3xl mx-auto flex flex-col h-full px-4 py-8 gap-4">
          <Shell>
            <HomeSlide />
            <VendorReports />
            <div />
            <div />
          </Shell>
          <Footer />
        </div>
      </body>
    </html>
  );
}
