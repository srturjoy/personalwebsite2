import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from "@assets/WhatsApp_Image_2025-05-25_at_16.58.04_8738e8a7_1775597921748.jpg";
import techImage from "@assets/WhatsApp_Image_2026-04-06_at_15.00.40_1775597921746.jpeg";

export default function About() {
  const { ref, isInView } = useScrollAnimation(true, "-100px");
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-md mx-auto">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border shadow-2xl relative">
                <img
                  src={heroImage}
                  alt="Siddiqur Rahman"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -right-10 w-48 h-48 rounded-xl overflow-hidden border border-border shadow-xl hidden md:block"
              >
                <img src={techImage} alt="Tech Visualization" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-2">
              {t('aboutBadge')}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t('aboutHeading').split('Through')[0]}<span className="text-gradient">Through Data.</span>
            </h2>

            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
            </div>

            {/* Boosting Agency BD badge */}
            <div className="flex items-center gap-3 py-3 px-4 bg-primary/10 border border-primary/30 rounded-xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-xs">BD</span>
              </div>
              <div>
                <span className="text-primary font-bold text-sm">Boosting Agency BD</span>
                <p className="text-xs text-muted-foreground">{t('heroTitle4')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border border-border rounded-xl p-4 bg-card/50 backdrop-blur-sm">
                <h4 className="text-foreground font-bold mb-1">{t('availability')}</h4>
                <p className="text-sm text-muted-foreground">{t('availabilityValue')}</p>
              </div>
              <div className="border border-border rounded-xl p-4 bg-card/50 backdrop-blur-sm">
                <h4 className="text-foreground font-bold mb-1">{t('languages')}</h4>
                <p className="text-sm text-muted-foreground">{t('languagesValue')}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
