import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin } from 'lucide-react';
import heroImage from "@assets/WhatsApp_Image_2025-05-25_at_16.58.04_8738e8a7_1775597921748.jpg";

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Hero() {
  const { t } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);

  const titleKeys = ['heroTitle1', 'heroTitle2', 'heroTitle3', 'heroTitle4'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titleKeys.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background hero-premium-bg">

      {/* Premium dark-mode orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -28, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[10%] w-[35vw] h-[35vw] bg-primary/20 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{ y: [0, 32, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[10%] right-[8%] w-[40vw] h-[40vw] bg-accent/15 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-[60%] left-[60%] w-[20vw] h-[20vw] bg-primary/15 rounded-full blur-[100px]"
        />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Text side */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            <MapPin className="mr-2 h-4 w-4" />
            {t('availableFor')}
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4">
            <span className="text-foreground">{t('name')}</span>
          </motion.h1>

          {/* Rotating animated title */}
          <motion.div variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-semibold text-gradient mb-6 h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {t(titleKeys[titleIndex])}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            {t('tagline')}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              onClick={() => scrollTo('portfolio')}
              data-testid="button-view-portfolio"
              className="w-full sm:w-auto text-base font-semibold rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_24px_rgba(59,130,246,0.5)] transition-shadow hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]"
            >
              {t('viewPortfolio')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo('contact')}
              data-testid="button-hire-me"
              className="w-full sm:w-auto text-base font-semibold rounded-full px-8 border-border hover:bg-secondary hover:border-primary/50 transition-all"
            >
              {t('hireMe')}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo('contact')}
              data-testid="button-contact-me"
              className="w-full sm:w-auto text-base font-semibold rounded-full px-8 hover:bg-primary/10 text-primary"
            >
              {t('contactMe')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex justify-center lg:justify-end relative"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Glow ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-60 blur-xl animate-pulse" />
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full p-[3px] bg-gradient-to-tr from-primary to-accent shadow-[0_0_60px_rgba(6,182,212,0.35)]">
              <div className="absolute inset-0 rounded-full bg-background m-[3px]" />
              <img
                src={heroImage}
                alt="Siddiqur Rahman"
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-background"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => scrollTo('trust')}
      >
        <span className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">{t('scrollDown')}</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
