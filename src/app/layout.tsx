import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Zombies Board Game Companion",
  description: "A companion app for the Marvel Zombies board game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-w-3xl mx-auto`}>
        <h1 className="text-5xl grid place-items-center my-6">
          Marvel Zombies
        </h1>
        {children}
      </body>
    </html>
  );
}
