import { site } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";

const URL = "https://alhadicooling.com";

/**
 * Structured data for Google rich results. FAQ schema is built from the Arabic
 * dictionary to match the default server-rendered content. Server component.
 */
export function JsonLd() {
  const t = getDictionary("ar");

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${URL}/#business`,
    name: site.name.en,
    alternateName: site.name.ar,
    description:
      "AlHadi Cooling provides fast, reliable AC installation, repair, maintenance and gas refill, plus refrigerator, washing machine, freezer and water cooler repair across Jeddah. 24/7 emergency service.",
    url: URL,
    telephone: site.phoneE164,
    email: site.email,
    image: `${URL}/og.png`,
    logo: `${URL}/icon-512.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2863 Amr Bin Ghaziyah St, Al Safa District",
      addressLocality: "Jeddah",
      addressRegion: "Makkah Province",
      postalCode: "23452",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.5898380279541,
      longitude: 39.20042419433594,
    },
    hasMap: site.mapDirectionsHref,
    areaServed: { "@type": "City", name: "Jeddah" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "24:00",
      },
    ],
    knowsLanguage: ["ar", "en"],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
