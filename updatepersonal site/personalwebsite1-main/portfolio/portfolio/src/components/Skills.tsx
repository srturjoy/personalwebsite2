import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { SiGoogleads, SiMeta, SiYoutube, SiPython, SiMysql, SiGoogleanalytics } from 'react-icons/si';
import { FaFileExcel, FaRobot, FaChartBar, FaDatabase } from 'react-icons/fa';

export default function Skills() {
  const { ref, isInView } = useScrollAnimation(true, "-100px");
  const { t } = useLanguage();

  const skillCategories = [
    {
      titleKey: 'skillsCat1',
      skills: [
        { nameKey: 'skillMetaAds', icon: SiMeta, level: 95 },
        { nameKey: 'skillGoogleAds', icon: SiGoogleads, level: 90 },
        { nameKey: 'skillYouTubeAds', icon: SiYoutube, level: 85 },
        { nameKey: 'skillConvOpt', icon: SiGoogleanalytics, level: 90 },
      ],
    },
    {
      titleKey: 'skillsCat2',
      skills: [
        { nameKey: 'skillPython', icon: SiPython, level: 80 },
        { nameKey: 'skillSQL', icon: SiMysql, level: 85 },
        { nameKey: 'skillPowerBI', icon: FaChartBar, level: 90 },
        { nameKey: 'skillExcel', icon: FaFileExcel, level: 95 },
      ],
    },
    {
      titleKey: 'skillsCat3',
      skills: [
        { nameKey: 'skillAIAuto', icon: FaRobot, level: 85 },
        { nameKey: 'skillMarketingTools', icon: SiGoogleanalytics, level: 90 },
        { nameKey: 'skillWebTech', icon: SiPython, level: 75 },
        { nameKey: 'skillDashboard', icon: FaDatabase, level: 90 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-background border border-border text-foreground text-sm font-semibold uppercase tracking-wider mb-4">
            {t('skillsBadge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('skillsHeading').split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t('skillsHeading').split(' ').pop()}</span>
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-card rounded-2xl border border-card-border p-6 shadow-lg hover:shadow-primary/5 transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">{t(category.titleKey)}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <div key={sIdx} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-secondary text-primary group-hover:text-accent transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-foreground">{t(skill.nameKey)}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.2 + sIdx * 0.1 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
