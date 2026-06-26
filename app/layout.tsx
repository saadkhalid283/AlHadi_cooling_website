import type { Metadata, Viewport } from "next";
import { Inter, Cairo } from "next/font/google";
import { LanguageProvider } from "@/components/providers/language-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

const description =
  "AlHadi Cooling: fast, reliable AC installation, repair, maintenance and appliance service in Jeddah. 16+ years experience, 2000+ jobs done. 24/7 emergency service.";

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
    <html lang="ar" dir="rtl" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <JsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
