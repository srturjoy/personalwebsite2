import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, TrendingUp, BarChart3, Bot, Zap, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ServiceKey = 'svc1' | 'svc2' | 'svc3' | 'svc4' | 'svc5';

const serviceConfig: { key: ServiceKey; icon: React.ElementType; color: string; accentColor: string }[] = [
  { key: 'svc1', icon: TrendingUp, color: 'text-blue-500', accentColor: 'from-blue-500/20 to-blue-600/5' },
  { key: 'svc2', icon: Target, color: 'text-cyan-500', accentColor: 'from-cyan-500/20 to-cyan-600/5' },
  { key: 'svc3', icon: Zap, color: 'text-purple-500', accentColor: 'from-purple-500/20 to-purple-600/5' },
  { key: 'svc4', icon: BarChart3, color: 'text-green-500', accentColor: 'from-green-500/20 to-green-600/5' },
  { key: 'svc5', icon: Bot, color: 'text-orange-500', accentColor: 'from-orange-500/20 to-orange-600/5' },
];

export default function Services() {
  const { ref, isInView } = useScrollAnimation(true, "-50px");
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<ServiceKey | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
            {t('servicesBadge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground max-w-2xl mx-auto">
            {t('servicesHeading').split('Digital')[0]}<span className="text-gradient">Digital Success</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">{t('servicesSubtext')}</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceConfig.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div key={svc.key} variants={itemVariants} className="h-full">
                <Card
                  className="h-full bg-card/40 backdrop-blur-md border-card-border hover:border-primary/60 transition-all duration-400 hover:-translate-y-3 hover:shadow-[0_16px_48px_rgba(59,130,246,0.15)] group cursor-pointer relative overflow-hidden"
                  onClick={() => setActiveModal(svc.key)}
                >
                  {/* Hover glow reveal */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${svc.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  <CardHeader className="relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border mb-4 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300">
                      <Icon className={`w-6 h-6 ${svc.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{t(`${svc.key}Title`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base text-muted-foreground mb-6">{t(`${svc.key}Desc`)}</CardDescription>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveModal(svc.key); }}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-accent transition-colors group/btn"
                    >
                      {t('learnMore')}
                      <span className="ml-1 group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeModal && (() => {
          const svc = serviceConfig.find(s => s.key === activeModal)!;
          const Icon = svc.icon;
          return (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
              onClick={() => setActiveModal(null)}
            >
              <motion.div
                key="modal-content"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-card border border-card-border rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r from-primary to-accent`} />

                <div className="p-8">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-secondary hover:bg-border flex items-center justify-center transition-colors"
                    data-testid="button-close-modal"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>

                  <div className={`w-14 h-14 rounded-2xl bg-background flex items-center justify-center border border-border mb-5 shadow-inner`}>
                    <Icon className={`w-7 h-7 ${svc.color}`} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{t(`${svc.key}Title`)}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed mb-8">{t(`${svc.key}Detail`)}</p>

                  <div className="border-t border-border pt-6">
                    <a
                      href="#contact"
                      onClick={() => setActiveModal(null)}
                      className="inline-block"
                    >
                      <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-shadow font-semibold">
                        {t('bookConsultation')}
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
