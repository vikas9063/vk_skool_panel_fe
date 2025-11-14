import type { Metadata } from "next";
import { Nunito} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const nunitoFont = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight:"variable"
});

export const metadata: Metadata = {
  title: "VK Skool Panel",
  description: "Created by Vikky & Co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoFont.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
