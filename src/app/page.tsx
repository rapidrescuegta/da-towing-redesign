import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyUs from "@/components/WhyUs";
import CTABanner from "@/components/CTABanner";
import ServiceAreas from "@/components/ServiceAreas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <CTABanner />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  );
}
