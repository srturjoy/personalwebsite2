import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Experience() {
  const { ref, isInView } = useScrollAnimation(true, "-100px");
  const { t } = useLanguage();

  const experiences = [
    {
      company: "Boosting Agency BD",
      companyBn: "বুস্টিং এজেন্সি বিডি",
      role: "Founder & CEO",
      roleBn: "প্রতিষ্ঠাতা ও সিইও",
      duration: "2022 - Present",
      durationBn: "২০২২ - বর্তমান",
      achievements: {
        en: [
          "Founded and scaled a full-service digital marketing agency serving 30+ local and international clients.",
          "Oversee performance marketing, analytics, and AI automation verticals for agency-wide client accounts.",
          "Generated over $1.5M in tracked revenue for clients through data-driven campaigns."
        ],
        bn: [
          "৩০+ স্থানীয় ও আন্তর্জাতিক ক্লায়েন্টকে সেবা দেওয়া একটি পূর্ণ-সেবা ডিজিটাল মার্কেটিং এজেন্সি প্রতিষ্ঠা ও পরিচালনা।",
          "এজেন্সি-ব্যাপী ক্লায়েন্ট অ্যাকাউন্টের জন্য পারফরম্যান্স মার্কেটিং, অ্যানালিটিক্স তত্ত্বাবধান।",
          "ডেটা-চালিত ক্যাম্পেইনের মাধ্যমে ক্লায়েন্টদের জন্য $১.৫M+ ট্র্যাক করা রাজস্ব তৈরি।"
        ]
      },
      badge: "Founder",
      color: "border-l-accent"
    },
    {
      company: "Algonest",
      companyBn: "অ্যালগোনেস্ট",
      role: "Senior Social Media Marketer & Brand Strategist",
      roleBn: "সিনিয়র সোশ্যাল মিডিয়া মার্কেটার ও ব্র্যান্ড কৌশলবিদ",
      duration: "2023 - Present",
      durationBn: "২০২৩ - বর্তমান",
      achievements: {
        en: [
          "Managed omni-channel campaigns exceeding $1M in total ad spend.",
          "Developed automated reporting pipelines reducing manual work by 15 hours/week.",
          "Scaled client ROAS by an average of 45% through advanced audience segmentation."
        ],
        bn: [
          "$১M-এরও বেশি মোট বিজ্ঞাপন ব্যয়ের সর্বচ্যানেল ক্যাম্পেইন পরিচালনা।",
          "স্বয়ংক্রিয় রিপোর্টিং পাইপলাইন তৈরি করে সাপ্তাহিক ১৫ ঘণ্টা ম্যানুয়াল কাজ হ্রাস।",
          "উন্নত অডিয়েন্স সেগমেন্টেশনের মাধ্যমে ক্লায়েন্ট ROAS গড়ে ৪৫% বৃদ্ধি।"
        ]
      },
      badge: "Full-time",
      color: "border-l-primary"
    },
    {
      company: "Robo Tech Valley",
      companyBn: "রোবো টেক ভ্যালি",
      role: "Digital Marketing Specialist",
      roleBn: "ডিজিটাল মার্কেটিং বিশেষজ্ঞ",
      duration: "2021 - 2023",
      durationBn: "২০২১ - ২০২৩",
      achievements: {
        en: [
          "Spearheaded lead generation campaigns acquiring 50k+ B2B leads.",
          "Optimized landing pages leading to a 3x increase in conversion rates.",
          "Implemented CRM integrations for seamless lead tracking and nurturing."
        ],
        bn: [
          "৫০k+ B2B লিড অর্জনের লিড জেনারেশন ক্যাম্পেইনে নেতৃত্ব দেওয়া।",
          "ল্যান্ডিং পেজ অপ্টিমাইজেশনের মাধ্যমে রূপান্তর হার ৩ গুণ বৃদ্ধি।",
          "নিরবচ্ছিন্ন লিড ট্র্যাকিংয়ের জন্য CRM ইন্টিগ্রেশন বাস্তবায়ন।"
        ]
      },
      badge: "Full-time",
      color: "border-l-purple-500"
    },
    {
      company: "Freelance / Consulting",
      companyBn: "ফ্রিল্যান্স / পরামর্শ",
      role: "Performance Marketing Consultant",
      roleBn: "পারফরম্যান্স মার্কেটিং পরামর্শদাতা",
      duration: "2020 - Present",
      durationBn: "২০২০ - বর্তমান",
      achievements: {
        en: [
          "Consulted for 20+ international e-commerce and SaaS brands.",
          "Audited and restructured underperforming ad accounts, restoring profitability within 30 days.",
          "Built custom data studio dashboards for executive teams."
        ],
        bn: [
          "২০+ আন্তর্জাতিক ই-কমার্স ও SaaS ব্র্যান্ডের জন্য পরামর্শ প্রদান।",
          "দুর্বল পারফরমিং বিজ্ঞাপন অ্যাকাউন্ট অডিট ও পুনর্গঠন করে ৩০ দিনের মধ্যে মুনাফা পুনরুদ্ধার।",
          "নির্বাহী দলের জন্য কাস্টম ডেটা স্টুডিও ড্যাশবোর্ড তৈরি।"
        ]
      },
      badge: "Freelance",
      color: "border-l-green-500"
    },
  ];

  const { language } = useLanguage();
  const lang = language as 'en' | 'bn';

  return (
    <section id="experience" className="py-24 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold uppercase tracking-wider mb-4">
            {t('experienceBadge')}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('experienceHeading').split(' ')[0]}{' '}
            <span className="text-gradient">{t('experienceHeading').split(' ').slice(1).join(' ')}</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative" ref={ref}>
          <motion.div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-12 md:pl-20"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              >
                <motion.div
                  className="absolute left-[11px] md:left-[27px] top-1.5 w-3 h-3 bg-background border-2 border-primary rounded-full z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                >
                  <div className="absolute inset-0 bg-primary/50 rounded-full animate-ping" />
                </motion.div>

                <div className={`bg-card/40 backdrop-blur-sm border border-card-border border-l-2 ${exp.color} rounded-2xl p-6 hover:border-primary/30 transition-colors shadow-sm`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {lang === 'bn' ? exp.roleBn : exp.role}
                      </h3>
                      <div className="text-lg font-medium text-primary mt-1">
                        {lang === 'bn' ? exp.companyBn : exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">{exp.badge}</span>
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full whitespace-nowrap">
                        {lang === 'bn' ? exp.durationBn : exp.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {exp.achievements[lang].map((achievement, i) => (
                      <li key={i} className="text-muted-foreground flex items-start">
                        <span className="text-accent mr-2 mt-1.5 text-xs">▹</span>
                        <span className="text-sm md:text-base leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
