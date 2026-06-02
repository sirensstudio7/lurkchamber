import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { ModelViewerScript } from "@/components/ui/ModelViewerScript";
import { hero, site } from "@/lib/content";
import { tiltWarp } from "@/lib/fonts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.metadataBase),
  title: {
    default: `${site.logo} | ${site.tagline}`,
    template: `%s | ${site.logo}`,
  },
  description: hero.subline,
  openGraph: {
    title: site.logo,
    description: hero.subline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${inter.variable} ${tiltWarp.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tilt+Warp&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full overflow-x-clip bg-background text-foreground">
        <ModelViewerScript />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
