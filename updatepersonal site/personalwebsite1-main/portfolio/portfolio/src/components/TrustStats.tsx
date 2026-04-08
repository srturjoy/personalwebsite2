import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

function Counter({ from, to, prefix = '', suffix = '', duration = 2, inView }: {
  from: number; to: number; prefix?: string; suffix?: string; duration?: number; inView: boolean;
}) {
  const [count, setCount] = useState(from);
  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) window.requestAnimationFrame(step);
      else setCount(to);
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);
  return <span>{prefix}{count}{suffix}</span>;
}

export default function TrustStats() {
  const { ref, isInView } = useScrollAnimation();
  const { t } = useLanguage();

  const stats = [
    { labelKey: 'statsCampaigns', value: 200, suffix: '+' },
    { labelKey: 'statsAdSpend', value: 2, prefix: '$', suffix: 'M+' },
    { labelKey: 'statsLeads', value: 500, suffix: 'K+' },
    { labelKey: 'statsGrowth', value: 340, suffix: '%' },
  ];

  return (
    <section id="trust" className="py-20 bg-background relative z-10 -mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-card-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50 pointer-events-none" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 text-gradient">
                  <Counter from={0} to={stat.value} prefix={stat.prefix} suffix={stat.suffix} inView={isInView} />
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
