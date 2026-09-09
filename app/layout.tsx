import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Archivo, Cairo } from "next/font/google";
import { LanguageProvider } from "@/components/providers/language-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { ConversionTracking } from "@/components/conversion/conversion-tracking";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Sturdy grotesque for display type - gives the brand a workshop-built
// character rather than the default geometric-sans look.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const description =
  "Certified technicians repairing air conditioners, refrigerators and washing machines across Jeddah. Price agreed before we start, written guarantee on every repair. 16+ years, 2,000+ jobs, 24/7 emergency call-out.";

export const metadata: Metadata = {
  title: `${site.name.en} | ${site.tagline.en}`,
  description,
  metadataBase: new URL("https://alhadicooling.com"),
  alternates: { canonical: "/" },
  keywords: [
    "AC repair Jeddah",
    "AC maintenance Jeddah",
    "AC installation Jeddah",
    "AC gas refill Jeddah",
    "HVAC Jeddah",
    "refrigerator repair Jeddah",
    "washing machine repair Jeddah",
    "fridge repair Jeddah",
    "freezer repair Jeddah",
    "appliance repair Jeddah",
    "صيانة غسالات جدة",
    "صيانة ثلاجات جدة",
    "تكييف جدة",
    "صيانة مكيفات جدة",
    "إصلاح مكيفات جدة",
    "فني تكييف جدة",
    "تعبئة فريون جدة",
    "إصلاح ثلاجات جدة",
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": "SA-02",
    "geo.placename": "Jeddah",
    "geo.position": "21.589838;39.200424",
    ICBM: "21.589838, 39.200424",
  },
  openGraph: {
    type: "website",
    siteName: site.name.en,
    title: `${site.name.en} | ${site.tagline.en}`,
    description,
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AlHadi Cooling: AC & Appliance Repair in Jeddah",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name.en} | ${site.tagline.en}`,
    description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#A1C9F2",
  width: "device-width",
  initialScale: 1,
};

// Set lang/dir before paint to avoid a flash of the wrong direction.
const noFlashScript = `
(function(){try{var l=localStorage.getItem('alhadi-locale')||'ar';var d=l==='ar'?'rtl':'ltr';document.documentElement.lang=l;document.documentElement.dir=d;}catch(e){}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // noFlashScript rewrites lang/dir from localStorage before hydration, so the
    // server's "ar" default legitimately differs from the client on first paint.
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${cairo.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {/* Google tag (gtag.js) - loads on every page, deduped by next/script's default "afterInteractive" strategy */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18342747744"
          strategy="afterInteractive"
        />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18342747744');
          `}
        </Script>
      </head>
      <body>
        <JsonLd />
        <ConversionTracking />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
