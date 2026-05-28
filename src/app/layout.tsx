import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme-provider";
import SignupTracker from "@/components/signup-tracker";
import NaverTracker from "@/components/naver-tracker";
import MetaTracker from "@/components/meta-tracker";
import WelcomeModal from "@/components/welcome-modal";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sunday Play",
              url: "https://sundayplay.life",
              description: "주일학교 교사와 교회 리더를 위한 레크레이션 큐레이션 플랫폼",
            }),
          }}
        />
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
        <script src="//wcs.naver.net/wcslog.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (!wcs_add) var wcs_add = {};
              wcs_add["wa"] = "s_41a53eaf5c29";
              if (!_nasa) var _nasa = {};
              if (window.wcs) {
                wcs.inflow();
                wcs_do();
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2029527677989065');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2029527677989065&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Suspense fallback={null}>
            <SignupTracker />
          </Suspense>
          <NaverTracker />
          <MetaTracker />
          <WelcomeModal />
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
