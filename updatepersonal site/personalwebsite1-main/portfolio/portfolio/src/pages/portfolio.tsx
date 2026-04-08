import PageLayout from '@/components/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, CheckCircle2, TrendingUp, Target, BarChart3, Bot, Search, Globe, Activity } from 'lucide-react';

const filterKeys = [
  { key: 'filterAll', value: 'All' },
  { key: 'filterAds', value: 'Ads' },
  { key: 'filterAnalytics', value: 'Analytics' },
  { key: 'filterAutomation', value: 'Automation' },
  { key: 'filterSEO', value: 'SEO' },
  { key: 'filterTracking', value: 'Tracking' },
];

const projects = [
  {
    id: 1, key: 'proj1', category: 'Ads', categoryKey: 'filterAds', metrics: 'ROAS 7x | 300% Growth', span: 'lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&auto=format&fit=crop&q=80',
    Icon: TrendingUp, iconColor: 'text-blue-500',
  },
  {
    id: 2, key: 'proj2', category: 'Ads', categoryKey: 'filterAds', metrics: '500+ Leads | $12 CPL', span: '',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    Icon: Target, iconColor: 'text-purple-500',
  },
  {
    id: 3, key: 'proj3', category: 'Analytics', categoryKey: 'filterAnalytics', metrics: '32hrs/wk Saved', span: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    Icon: BarChart3, iconColor: 'text-green-500',
  },
  {
    id: 4, key: 'proj4', category: 'Automation', categoryKey: 'filterAutomation', metrics: '40% Open Rate', span: '',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
    Icon: Bot, iconColor: 'text-orange-500',
  },
  {
    id: 5, key: 'proj5', category: 'Ads', categoryKey: 'filterAds', metrics: 'ROAS 5.2x | $320K Rev', span: '',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
    Icon: Globe, iconColor: 'text-cyan-500',
  },
  {
    id: 6, key: 'proj6', category: 'Tracking', categoryKey: 'filterTracking', metrics: '100% Data Accuracy', span: '',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&auto=format&fit=crop&q=80',
    Icon: Activity, iconColor: 'text-pink-500',
  },
  {
    id: 7, key: 'proj7', category: 'SEO', categoryKey: 'filterSEO', metrics: '180% Organic Growth', span: 'lg:col-span-2',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&auto=format&fit=crop&q=80',
    Icon: Search, iconColor: 'text-yellow-500',
  },
];

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <PageLayout>
      <section className="py-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[50vw] h-[40vw] bg-primary/8 rounded-full blur-[140px]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
                {t('portfolioBadge')}
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
                {t('portfolioHeading').split(' ')[0]}{' '}
                <span className="text-gradient">{t('portfolioHeading').split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('portfolioSubtext')}</p>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 justify-center mb-10">
            {filterKeys.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveCategory(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === filter.value
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border'
                }`}
              >
                {t(filter.key)}
              </button>
            ))}
          </motion.div>

          {/* Masonry-style grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => {
                const Icon = project.Icon;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className={`group cursor-pointer ${project.span}`}
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="h-full bg-card border border-card-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)] flex flex-col">
                      <div className="relative overflow-hidden h-52">
                        <img
                          src={project.image}
                          alt={t(`${project.key}Title`)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-primary/80 text-white backdrop-blur-sm border-0 text-xs">{t(project.categoryKey)}</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className={`w-9 h-9 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${project.iconColor}`} />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-4">
                          <span className="text-xs font-bold text-accent bg-card/75 backdrop-blur-sm px-2.5 py-1 rounded-full">{project.metrics}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">{t(`${project.key}Title`)}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{t(`${project.key}Desc`)}</p>
                        <div className="mt-4 flex items-center text-sm font-bold text-primary group-hover:text-accent transition-colors gap-1">
                          {t('viewProject')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4 bg-background/85 backdrop-blur-lg"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-card border border-card-border rounded-3xl shadow-2xl overflow-hidden my-auto"
            >
              <div className="h-64 w-full relative overflow-hidden">
                <img src={activeProject.image} alt={t(`${activeProject.key}Title`)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <X className="w-4 h-4 text-foreground" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <Badge className="bg-primary text-white border-0 mb-2">{t(activeProject.categoryKey)}</Badge>
                  <h3 className="text-2xl font-display font-bold text-foreground">{t(`${activeProject.key}Title`)}</h3>
                  <p className="text-accent font-semibold text-sm">{activeProject.metrics}</p>
                </div>
              </div>

              <div className="p-8 space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{t('challenge')}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(`${activeProject.key}Challenge`)}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{t('solution')}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(`${activeProject.key}Solution`)}</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {t('results')}
                  </h4>
                  <p className="text-foreground font-medium text-sm leading-relaxed">{t(`${activeProject.key}Results`)}</p>
                </div>
                <a href="/contact">
                  <Button size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_20px_rgba(59,130,246,0.4)]" onClick={() => setActiveProject(null)}>
                    {t('bookConsultation')}
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
