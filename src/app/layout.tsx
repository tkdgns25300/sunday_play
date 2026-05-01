import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunday Play",
  description:
    "주일학교 교사와 교회 리더를 위한 레크레이션 큐레이션 플랫폼. 대상별·상황별로 적합한 게임을 쉽게 찾고, 상세 진행 가이드와 함께 활용하세요.",
  openGraph: {
    title: "Sunday Play",
    description:
      "이번 주 레크레이션, 고민 끝. 50+개 게임 중 딱 맞는 게임을 찾고 진행 자료까지 한 번에.",
    url: "https://sundayplay.life",
    siteName: "Sunday Play",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunday Play",
    description:
      "이번 주 레크레이션, 고민 끝. 50+개 게임 중 딱 맞는 게임을 찾고 진행 자료까지 한 번에.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8F7J7SNDCZ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8F7J7SNDCZ');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
