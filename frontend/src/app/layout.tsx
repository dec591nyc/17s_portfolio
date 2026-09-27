import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "./notes.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeContext";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yichi Nien | IME 智慧製造工程師 Portfolio",
  description: "Professional portfolio of Yichi Nien — an IME intelligent manufacturing engineer and backend software engineer with expertise in data engineering, ETL pipelines, SQL analytics, Power BI dashboards, and Python automation. Based in Changhua, Taiwan.",
  keywords: ["IME 智慧製造工程師", "IME Intelligent Manufacturing Engineer", "Data Engineer", "ETL Pipeline", "Python Developer", "Power BI", "SQL", "Software Engineer Portfolio", "Changhua Taiwan"],
  authors: [{ name: "Yichi Nien" }],
  openGraph: {
    title: "Yichi Nien | IME 智慧製造工程師 Portfolio",
    description: "IME intelligent manufacturing engineer and software engineer with expertise in data engineering, ETL, SQL analytics, Power BI, and Python automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

