import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/ProgressBarProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "#2025Live",
  description: "CountDown to 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <title>#2025Live</title>
        <meta name="title" content="#2025Live" />
        <meta
          name="description"
          content="Countdown to New Year celebrations with a global map, country timelines, and Twitch specials."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://https://nye.today/" />
        <meta property="og:title" content="#2025Live" />
        <meta
          property="og:description"
          content="Countdown to New Year celebrations with a global map, country timelines, and Twitch specials."
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://https://nye.today/" />
        <meta property="twitter:title" content="#2025Live" />
        <meta
          property="twitter:description"
          content="Countdown to New Year celebrations with a global map, country timelines, and Twitch specials."
        />

        <meta name="author" content="@vanderfondi" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden ${inter.className}`}
      >
        <div className="text-white dark:text-slate-950 bg-zinc-950 dark:bg-white min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
          <Providers>
            {children}
            <Analytics />
            <SpeedInsights />
          </Providers>
        </div>
      </body>
    </html>
  );
}
