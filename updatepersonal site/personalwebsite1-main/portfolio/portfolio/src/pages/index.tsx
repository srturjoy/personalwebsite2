import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStats from "@/components/TrustStats";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://siddiqurrahman.com/#person",
      "name": "Siddiqur Rahman",
      "alternateName": "Turjoy",
      "jobTitle": "Digital Marketing Strategist & Performance Marketing Specialist",
      "description": "Results-driven Digital Marketing Strategist and Founder of Boosting Agency BD. Expert in Meta Ads, Google Ads, Data Analytics, and AI Marketing Automation.",
      "email": "turjoy144@gmail.com",
      "telephone": "+8801518961899",
      "url": "https://siddiqurrahman.com",
      "sameAs": ["https://wa.me/8801518961899"],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD"
      },
      "knowsAbout": [
        "Performance Marketing", "Meta Ads", "Google Ads", "YouTube Ads",
        "Lead Generation", "E-commerce Marketing", "Marketing Analytics",
        "SQL", "Python", "Power BI", "GA4", "Server-Side Tracking",
        "AI Marketing Automation", "SEO", "Digital Marketing Strategy"
      ],
      "founder": {
        "@type": "Organization",
        "@id": "https://siddiqurrahman.com/#agency"
      }
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://siddiqurrahman.com/#agency",
      "name": "Boosting Agency BD",
      "description": "Full-service digital marketing agency based in Dhaka, Bangladesh, specializing in performance marketing, lead generation, and AI-powered marketing automation.",
      "founder": { "@id": "https://siddiqurrahman.com/#person" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "BD"
      },
      "serviceType": [
        "Performance Marketing", "Lead Generation", "E-commerce Scaling",
        "Marketing Analytics", "AI Marketing Automation", "SEO"
      ],
      "areaServed": ["BD", "US", "GB", "SG", "CA", "AU"]
    }
  ]
};

export default function Home() {
  useEffect(() => {
    // Inject JSON-LD structured data
    const existing = document.getElementById('json-ld-schema');
    if (existing) return;
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('json-ld-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
