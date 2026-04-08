import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { useEffect, useRef } from 'react';

const testimonials = [
  {
    name: "James Wilson",
    company: "TechFlow Solutions, USA",
    text: "Siddiqur completely transformed our customer acquisition model. His data-driven approach lowered our CAC by 40% while doubling lead volume in just 3 months. An exceptional strategic mind.",
    rating: 5,
    initials: "JW",
    color: "from-blue-500 to-blue-700",
    flag: "🇺🇸",
  },
  {
    name: "রাফি আহমেদ",
    company: "ফ্যাশন হাব বিডি, ঢাকা",
    text: "সিদ্দিকুর ভাই আমাদের ফেসবুক ক্যাম্পেইন পুরোপুরি বদলে দিয়েছেন। মাত্র ৩ মাসে বিক্রি ৪ গুণ বেড়েছে এবং খরচ অর্ধেক হয়ে গেছে। সত্যিকারের পেশাদার মার্কেটার।",
    rating: 5,
    initials: "RA",
    color: "from-green-500 to-green-700",
    flag: "🇧🇩",
  },
  {
    name: "Sarah Chen",
    company: "Elevate E-commerce, Singapore",
    text: "I've worked with many media buyers, but Siddiqur stands out. He doesn't just run ads; he looks at the entire business ecosystem. The dashboard he built is now central to our operations.",
    rating: 5,
    initials: "SC",
    color: "from-purple-500 to-purple-700",
    flag: "🇸🇬",
  },
  {
    name: "মাহমুদ হোসেন",
    company: "RoboTech Ventures, চট্টগ্রাম",
    text: "ডেটা অ্যানালিটিক্সে সিদ্দিকুরের দক্ষতা অসাধারণ। তিনি আমাদের জন্য একটি Power BI ড্যাশবোর্ড তৈরি করেছেন যা আমাদের সাপ্তাহিক ৩০ ঘণ্টা সাশ্রয় করছে। অত্যন্ত সুপারিশযোগ্য।",
    rating: 5,
    initials: "MH",
    color: "from-cyan-500 to-cyan-700",
    flag: "🇧🇩",
  },
  {
    name: "Marcus Thorne",
    company: "Apex Growth Agency, UK",
    text: "The AI automation systems Siddiqur implemented saved my team 20 hours a week. He understands the technical side of marketing better than anyone I've met. Highly recommend.",
    rating: 5,
    initials: "MT",
    color: "from-emerald-500 to-emerald-700",
    flag: "🇬🇧",
  },
  {
    name: "নাফিসা করিম",
    company: "লিড জেনারেশন বিডি, সিলেট",
    text: "Siddiqur ভাইয়ের সাথে কাজ করে আমাদের B2B লিড জেনারেশন ক্যাম্পেইন সম্পূর্ণ পরিবর্তন হয়ে গেছে। CPL ৮০% কমেছে এবং মানসম্পন্ন লিডের সংখ্যা ৫ গুণ বেড়েছে।",
    rating: 5,
    initials: "NK",
    color: "from-pink-500 to-pink-700",
    flag: "🇧🇩",
  },
  {
    name: "David Park",
    company: "Nexus SaaS, Canada",
    text: "What sets Siddiqur apart is his ability to connect marketing strategy with real business outcomes. He helped us achieve 220% pipeline growth in 90 days using AI-powered outreach. Genuinely impressed.",
    rating: 5,
    initials: "DP",
    color: "from-orange-500 to-orange-700",
    flag: "🇨🇦",
  },
];

export default function Testimonials() {
  const { ref, isInView } = useScrollAnimation(true, "-50px");
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const SPEED = 0.5;

  // Infinite marquee via requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      posRef.current -= SPEED;
      const half = track.scrollWidth / 2;
      if (Math.abs(posRef.current) >= half) posRef.current = 0;
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const pause = () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
    const resume = () => { animRef.current = requestAnimationFrame(animate); };

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
    };
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-secondary/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 mb-12">
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
            {t('testimonialsBadge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('testimonialsHeading').split(' ')[0]}{' '}
            <span className="text-gradient">{t('testimonialsHeading').split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
            {doubled.map((testimonial, index) => (
              <div
                key={index}
                className="w-80 flex-shrink-0 bg-card border border-card-border rounded-2xl p-6 relative hover:border-primary/40 transition-colors"
              >
                <div className="absolute top-5 right-5 text-2xl">{testimonial.flag}</div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-inner flex-shrink-0`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm">{testimonial.name}</h4>
                    <span className="text-primary text-xs font-medium">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
