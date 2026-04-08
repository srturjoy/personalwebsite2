import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProjectKey = 'proj1' | 'proj2' | 'proj3' | 'proj4';

interface Project {
  id: number;
  key: ProjectKey;
  category: string;
  categoryKey: string;
  metrics: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    key: 'proj1',
    category: 'Ads',
    categoryKey: 'filterAds',
    metrics: 'ROAS 7x | 300% Growth',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    key: 'proj2',
    category: 'Ads',
    categoryKey: 'filterAds',
    metrics: '500+ Leads | $12 CPL',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    key: 'proj3',
    category: 'Analytics',
    categoryKey: 'filterAnalytics',
    metrics: 'Real-time Data | 32hrs Saved',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 4,
    key: 'proj4',
    category: 'Automation',
    categoryKey: 'filterAutomation',
    metrics: '40% Open Rate | 10hrs/wk Saved',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80',
    color: 'from-orange-500 to-red-500',
  },
];

const filterKeys = [
  { key: 'filterAll', value: 'All' },
  { key: 'filterAds', value: 'Ads' },
  { key: 'filterAnalytics', value: 'Analytics' },
  { key: 'filterAutomation', value: 'Automation' },
];

export default function Portfolio() {
  const { ref, isInView } = useScrollAnimation(true, "-50px");
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="portfolio" className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-background border border-border text-foreground text-sm font-semibold uppercase tracking-wider mb-4">
              {t('portfolioBadge')}
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              {t('portfolioHeading').split(' ')[0]} <span className="text-gradient">{t('portfolioHeading').split(' ')[1] || 'Results'}</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card
                className="overflow-hidden bg-card/60 backdrop-blur-sm border-card-border hover:border-primary/50 transition-all duration-300 group h-full flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)]"
                onClick={() => setActiveProject(project)}
              >
                {/* Image with scale-up on hover */}
                <div className="h-56 w-full relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(`${project.key}Title`)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/80 text-white backdrop-blur-sm border-0">{t(project.categoryKey)}</Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="text-xs font-bold text-accent bg-background/70 backdrop-blur-sm px-3 py-1 rounded-full">{project.metrics}</span>
                  </div>
                </div>

                <CardHeader className="flex-1">
                  <CardTitle className="text-2xl mt-2 group-hover:text-primary transition-colors">{t(`${project.key}Title`)}</CardTitle>
                  <CardDescription className="text-base mt-2 text-muted-foreground">{t(`${project.key}Desc`)}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveProject(project); }}
                    className="inline-flex items-center text-sm font-bold text-foreground hover:text-primary transition-colors group/btn"
                    data-testid={`button-view-project-${project.id}`}
                  >
                    {t('viewProject')} <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
              {/* Hero image */}
              <div className="h-60 w-full relative overflow-hidden">
                <img src={activeProject.image} alt={t(`${activeProject.key}Title`)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <Badge className="bg-primary text-white border-0 mb-2">{t(activeProject.categoryKey)}</Badge>
                  <h3 className="text-2xl font-display font-bold text-foreground">{t(`${activeProject.key}Title`)}</h3>
                  <p className="text-accent font-semibold text-sm">{activeProject.metrics}</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Challenge */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{t('challenge')}</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{t(`${activeProject.key}Challenge`)}</p>
                </div>
                {/* Solution */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{t('solution')}</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm">{t(`${activeProject.key}Solution`)}</p>
                </div>
                {/* Results */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {t('results')}
                  </h4>
                  <p className="text-foreground font-medium text-sm leading-relaxed">{t(`${activeProject.key}Results`)}</p>
                </div>
                <a href="#contact" onClick={() => setActiveProject(null)}>
                  <Button size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                    {t('bookConsultation')}
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
