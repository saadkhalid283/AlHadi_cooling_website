import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { WorkGallery } from "@/components/sections/work-gallery";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { WhyUs } from "@/components/sections/why-us";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { FloatingWhatsApp } from "@/components/conversion/floating-whatsapp";
import { StickyCall } from "@/components/conversion/sticky-call";
import { SkipLink } from "@/components/ui/skip-link";

export default function Home() {
  return (
    <div id="top">
      <SkipLink />
      <Header />
      {/* Phones reorder visually so proof (job photos + reviews) comes before
          the process explainer; sm+ keeps the original block flow untouched. */}
      <main id="main" className="flex flex-col sm:block">
        <div className="max-sm:order-1"><Hero /></div>
        <div className="max-sm:order-2"><Services /></div>
        <div className="max-sm:order-5"><Process /></div>
        <div className="max-sm:order-6"><WhyUs /></div>
        <div className="max-sm:order-3"><WorkGallery /></div>
        <div className="max-sm:order-4"><Reviews /></div>
        <div className="max-sm:order-7"><Faq /></div>
        <div className="max-sm:order-8"><Contact /></div>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCall />
    </div>
  );
}
