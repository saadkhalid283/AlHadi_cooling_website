import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
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
      <main id="main" className="pb-16 sm:pb-0">
        <Hero />
        <Services />
        <WhyUs />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCall />
    </div>
  );
}
