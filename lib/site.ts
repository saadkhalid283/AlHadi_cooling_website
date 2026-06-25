/**
 * Single source of truth for business contact details.
 * Change a number/address here and it updates everywhere on the site.
 */

const PHONE_E164 = "+966580294257"; // calls + WhatsApp (same number)
const WHATSAPP_DIGITS = "966580294257"; // wa.me requires no '+'

export const site = {
  name: {
    en: "AlHadi Cooling",
    ar: "الهادي للتبريد",
  },
  tagline: {
    en: "AC & Appliance Repair in Jeddah",
    ar: "صيانة المكيفات والأجهزة في جدة",
  },
  phoneE164: PHONE_E164,
  phoneDisplay: "+966 58 029 4257",
  telHref: `tel:${PHONE_E164}`,
  whatsappDigits: WHATSAPP_DIGITS,
  /** Pre-filled WhatsApp message; pass a service to deep-link a booking intent. */
  whatsappHref: (message?: string) =>
    `https://wa.me/${WHATSAPP_DIGITS}${
      message ? `?text=${encodeURIComponent(message)}` : ""
    }`,
  email: "alhadicooling@gmail.com",
  emailHref: "mailto:alhadicooling@gmail.com",
  address: {
    en: "2863 Amr Bin Ghaziyah St, Al Safa District, Jeddah 23452, Saudi Arabia",
    ar: "2863 شارع عمرو بن غزية، حي الصفا، جدة 23452، المملكة العربية السعودية",
  },
  city: { en: "Jeddah", ar: "جدة" },
  hours: {
    en: "8:00 AM to 12:00 AM, every day",
    ar: "٨:٠٠ صباحًا حتى ١٢:٠٠ منتصف الليل، طوال الأسبوع",
  },
  emergency: {
    en: "24/7 emergency service available",
    ar: "خدمة طوارئ متوفرة على مدار الساعة",
  },
  stats: {
    yearsExperience: 16,
    jobsDone: 2000,
  },
  // Google Maps embed (provided by client - used as-is).
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.899633670323!2d39.19785147389449!3d21.589840468273966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d11eb9e6e9f5%3A0xe6be88548d400737!2sAl%20Saraya%20Refrigeration!5e0!3m2!1sen!2s!4v1782401887746!5m2!1sen!2s",
  mapDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=21.589840468273966,39.19785147389449",
} as const;
