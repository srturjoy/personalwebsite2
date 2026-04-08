import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'bn';

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

const translations: Translations = {
  name: { en: 'Siddiqur Rahman', bn: 'সিদ্দিকুর রহমান' },
  tagline: {
    en: 'I help brands grow and scale using data-driven marketing, advanced analytics, and AI-powered automation.',
    bn: 'আমি ডেটা-চালিত মার্কেটিং, উন্নত বিশ্লেষণ এবং AI-চালিত অটোমেশন ব্যবহার করে ব্র্যান্ডগুলিকে বৃদ্ধি এবং স্কেল করতে সাহায্য করি।',
  },
  hireMe: { en: 'Hire Me', bn: 'আমাকে নিয়োগ করুন' },
  viewPortfolio: { en: 'View Portfolio', bn: 'পোর্টফোলিও দেখুন' },
  contactMe: { en: 'Contact Me', bn: 'যোগাযোগ করুন' },
  contact: { en: 'Contact', bn: 'যোগাযোগ' },
  home: { en: 'Home', bn: 'হোম' },
  about: { en: 'About', bn: 'সম্পর্কে' },
  skills: { en: 'Skills', bn: 'দক্ষতা' },
  services: { en: 'Services', bn: 'সেবা' },
  portfolio: { en: 'Portfolio', bn: 'পোর্টফোলিও' },
  experience: { en: 'Experience', bn: 'অভিজ্ঞতা' },
  scrollDown: { en: 'Scroll', bn: 'স্ক্রোল' },
  availableFor: { en: 'Dhaka, Bangladesh | Available for Remote', bn: 'ঢাকা, বাংলাদেশ | রিমোটে উপলব্ধ' },
  heroTitle1: { en: 'Digital Marketing Strategist', bn: 'ডিজিটাল মার্কেটিং কৌশলবিদ' },
  heroTitle2: { en: 'Performance Marketing Specialist', bn: 'পারফরম্যান্স মার্কেটিং বিশেষজ্ঞ' },
  heroTitle3: { en: 'Data Analyst & AI Specialist', bn: 'ডেটা অ্যানালিস্ট ও AI বিশেষজ্ঞ' },
  heroTitle4: { en: 'Founder, Boosting Agency BD', bn: 'প্রতিষ্ঠাতা, বুস্টিং এজেন্সি বিডি' },

  // About
  aboutBadge: { en: 'About Me', bn: 'আমার সম্পর্কে' },
  aboutHeading: { en: 'Engineering Growth Through Data.', bn: 'ডেটার মাধ্যমে প্রবৃদ্ধি তৈরি করা।' },
  aboutP1: {
    en: "I am Siddiqur Rahman, a results-driven Digital Marketing Strategist and the Founder of Boosting Agency BD, based in Dhaka. My approach isn't just about running ads — it's about building scalable, data-backed revenue engines.",
    bn: 'আমি সিদ্দিকুর রহমান, একজন ফলাফলমুখী ডিজিটাল মার্কেটিং কৌশলবিদ এবং বুস্টিং এজেন্সি বিডি-এর প্রতিষ্ঠাতা, ঢাকায় অবস্থিত। আমার পদ্ধতি শুধু বিজ্ঞাপন চালানোর মধ্যে সীমাবদ্ধ নয় — এটি ডেটা-সমর্থিত রাজস্ব ইঞ্জিন তৈরির বিষয়ে।',
  },
  aboutP2: {
    en: 'With deep expertise in Performance Marketing and Data Analytics, I bridge the gap between creative strategy and technical execution. I leverage Python, SQL, and AI-powered automation to uncover hidden insights, optimize conversion rates, and drive exponential growth for brands worldwide.',
    bn: 'পারফরম্যান্স মার্কেটিং ও ডেটা অ্যানালিটিক্সে গভীর দক্ষতার সাথে, আমি সৃজনশীল কৌশল এবং প্রযুক্তিগত বাস্তবায়নের মধ্যে সেতুবন্ধন করি। আমি Python, SQL, এবং AI-চালিত অটোমেশন ব্যবহার করে লুকানো অন্তর্দৃষ্টি উন্মোচন করি এবং বিশ্বব্যাপী ব্র্যান্ডের জন্য দ্রুত বৃদ্ধি চালাই।',
  },
  availability: { en: 'Availability', bn: 'উপলব্ধতা' },
  availabilityValue: { en: 'Remote, Freelance, Consulting', bn: 'রিমোট, ফ্রিল্যান্স, পরামর্শ' },
  languages: { en: 'Languages', bn: 'ভাষা' },
  languagesValue: { en: 'English, Bengali', bn: 'ইংরেজি, বাংলা' },

  // Stats
  statsCampaigns: { en: 'Campaigns Managed', bn: 'পরিচালিত ক্যাম্পেইন' },
  statsAdSpend: { en: 'Ad Spend Handled', bn: 'বিজ্ঞাপন ব্যয় পরিচালিত' },
  statsLeads: { en: 'Leads Generated', bn: 'লিড তৈরি' },
  statsGrowth: { en: 'Avg. Conversion Growth', bn: 'গড় রূপান্তর বৃদ্ধি' },

  // Skills
  skillsBadge: { en: 'Technical Arsenal', bn: 'প্রযুক্তিগত অস্ত্রাগার' },
  skillsHeading: { en: 'Tools of the Trade', bn: 'পেশার হাতিয়ার' },
  skillsTradeHighlight: { en: 'Trade', bn: 'হাতিয়ার' },
  digitalMarketing: { en: 'Digital Marketing', bn: 'ডিজিটাল মার্কেটিং' },
  dataAnalytics: { en: 'Data Analytics', bn: 'ডেটা অ্যানালিটিক্স' },
  technicalAI: { en: 'Technical & AI', bn: 'প্রযুক্তি ও AI' },

  // Services
  servicesBadge: { en: 'Services', bn: 'সেবা' },
  servicesHeading: { en: 'Architecting Digital Success', bn: 'ডিজিটাল সাফল্যের স্থপতি' },
  servicesSubtext: {
    en: 'Comprehensive solutions designed to elevate your brand, optimize your spend, and dominate your market.',
    bn: 'আপনার ব্র্যান্ডকে উন্নত করতে, ব্যয় অপ্টিমাইজ করতে এবং আপনার বাজারে আধিপত্য বিস্তার করতে সমন্বিত সমাধান।',
  },
  learnMore: { en: 'Learn More', bn: 'আরও জানুন' },
  bookConsultation: { en: 'Book a Free Consultation', bn: 'বিনামূল্যে পরামর্শ বুক করুন' },
  closeModal: { en: 'Close', bn: 'বন্ধ করুন' },

  svc1Title: { en: 'Performance Marketing', bn: 'পারফরম্যান্স মার্কেটিং' },
  svc1Desc: { en: 'Data-driven ad campaigns across Meta, Google, and YouTube designed for maximum ROI and scalable growth.', bn: 'Meta, Google, এবং YouTube জুড়ে ডেটা-চালিত বিজ্ঞাপন প্রচারণা সর্বোচ্চ ROI এবং স্কেলযোগ্য বৃদ্ধির জন্য ডিজাইন করা হয়েছে।' },
  svc1Detail: {
    en: 'We build full-funnel performance campaigns engineered to scale profitably. Starting from precise audience research and creative strategy, we deploy and continuously optimize campaigns across Meta (Facebook/Instagram), Google Search & Display, and YouTube. Every decision is backed by real-time data — from bid strategy and budget allocation to creative split-testing. Our campaigns are designed to turn paid traffic into predictable, scalable revenue.',
    bn: 'আমরা লাভজনকভাবে স্কেল করার জন্য ফুল-ফানেল পারফরম্যান্স ক্যাম্পেইন তৈরি করি। সুনির্দিষ্ট অডিয়েন্স গবেষণা এবং ক্রিয়েটিভ কৌশল থেকে শুরু করে, Meta, Google এবং YouTube-এ ক্যাম্পেইন পরিচালনা ও ক্রমাগত অপ্টিমাইজ করা হয়। প্রতিটি সিদ্ধান্ত রিয়েল-টাইম ডেটা দ্বারা সমর্থিত।',
  },
  svc2Title: { en: 'Lead Generation', bn: 'লিড জেনারেশন' },
  svc2Desc: { en: 'High-converting funnel strategies and targeted ads to capture qualified B2B and B2C leads consistently.', bn: 'উচ্চ-রূপান্তরকারী ফানেল কৌশল এবং লক্ষ্যভিত্তিক বিজ্ঞাপন দিয়ে ধারাবাহিকভাবে যোগ্য B2B এবং B2C লিড সংগ্রহ করুন।' },
  svc2Detail: {
    en: 'Stop chasing unqualified prospects. We design and deploy full lead generation ecosystems — from multi-step landing pages and retargeting sequences to automated CRM nurturing flows. Whether you need 100 enterprise-grade B2B leads or 10,000 B2C leads at a target CPL, we engineer the funnel to get you there consistently. Average CPL reduction of 35-60% in the first 90 days.',
    bn: 'অযোগ্য সম্ভাবনা তাড়া করা বন্ধ করুন। আমরা সম্পূর্ণ লিড জেনারেশন ইকোসিস্টেম ডিজাইন এবং স্থাপন করি — মাল্টি-স্টেপ ল্যান্ডিং পেজ থেকে CRM নার্চারিং পর্যন্ত। প্রথম ৯০ দিনে গড় CPL ৩৫-৬০% হ্রাস পায়।',
  },
  svc3Title: { en: 'E-commerce Scaling', bn: 'ই-কমার্স স্কেলিং' },
  svc3Desc: { en: 'End-to-end e-commerce growth strategies, optimizing catalog sales, dynamic retargeting, and reducing CAC.', bn: 'এন্ড-টু-এন্ড ই-কমার্স প্রবৃদ্ধি কৌশল, ক্যাটালগ বিক্রয় অপ্টিমাইজেশন, ডায়নামিক রিটার্গেটিং এবং CAC হ্রাস।' },
  svc3Detail: {
    en: 'E-commerce growth is a system, not a campaign. We audit your entire funnel — from product feed quality and dynamic catalog ads to post-purchase upsell sequences. We implement advanced CAPI tracking, Advantage+ shopping campaigns, and cross-channel retargeting to maximize ROAS. We have scaled brands from 4-figure to 6-figure monthly revenues while maintaining profitable ROAS targets.',
    bn: 'ই-কমার্স বৃদ্ধি একটি সিস্টেম, একটি ক্যাম্পেইন নয়। আমরা আপনার সম্পূর্ণ ফানেল অডিট করি — প্রোডাক্ট ফিড থেকে পোস্ট-পার্চেজ আপসেল পর্যন্ত। আমরা ব্র্যান্ডগুলিকে মাসিক ৬ সংখ্যার রাজস্বে স্কেল করেছি।',
  },
  svc4Title: { en: 'Marketing Analytics', bn: 'মার্কেটিং অ্যানালিটিক্স' },
  svc4Desc: { en: 'Deep data analysis using SQL and PowerBI. I turn raw data into actionable dashboards and insights.', bn: 'SQL এবং PowerBI ব্যবহার করে গভীর ডেটা বিশ্লেষণ। আমি কাঁচা ডেটাকে কার্যকরী ড্যাশবোর্ড এবং অন্তর্দৃষ্টিতে রূপান্তরিত করি।' },
  svc4Detail: {
    en: 'You cannot optimize what you cannot measure. We build end-to-end analytics infrastructure: server-side tracking via GA4 + Meta CAPI, custom SQL pipelines to clean and unify data from all platforms, and live Power BI dashboards your team will actually use. We also provide weekly insights reports that highlight what\'s working, what\'s leaking, and what to do about it.',
    bn: 'আপনি যা পরিমাপ করতে পারবেন না তা অপ্টিমাইজ করতে পারবেন না। আমরা এন্ড-টু-এন্ড অ্যানালিটিক্স অবকাঠামো তৈরি করি: GA4 + Meta CAPI ট্র্যাকিং, কাস্টম SQL পাইপলাইন এবং লাইভ Power BI ড্যাশবোর্ড।',
  },
  svc5Title: { en: 'AI Marketing Automation', bn: 'AI মার্কেটিং অটোমেশন' },
  svc5Desc: { en: 'Implementing AI tools and automated workflows to streamline operations, personalize outreach, and save time.', bn: 'AI সরঞ্জাম এবং স্বয়ংক্রিয় ওয়ার্কফ্লো প্রয়োগ করে অপারেশন সুশৃঙ্খল করুন, আউটরিচ ব্যক্তিগতকৃত করুন এবং সময় বাঁচান।' },
  svc5Detail: {
    en: 'The future of marketing is automated and intelligent. We implement end-to-end AI-powered marketing systems: Python-based lead scoring models, GPT-powered personalized email sequences, automated creative testing pipelines, and AI chatbots for 24/7 lead qualification. Our clients routinely save 15-25 hours per week in manual marketing tasks, allowing their teams to focus on strategy.',
    bn: 'মার্কেটিং-এর ভবিষ্যৎ স্বয়ংক্রিয় এবং বুদ্ধিমান। আমরা AI-চালিত মার্কেটিং সিস্টেম বাস্তবায়ন করি: Python-ভিত্তিক লিড স্কোরিং, GPT-চালিত ইমেইল সিকোয়েন্স এবং AI চ্যাটবট। আমাদের ক্লায়েন্টরা প্রতি সপ্তাহে ১৫-২৫ ঘণ্টা সাশ্রয় করেন।',
  },

  // Portfolio
  portfolioBadge: { en: 'Case Studies', bn: 'কেস স্টাডি' },
  portfolioHeading: { en: 'Proven Results', bn: 'প্রমাণিত ফলাফল' },
  viewProject: { en: 'View Project', bn: 'প্রজেক্ট দেখুন' },
  filterAll: { en: 'All', bn: 'সব' },
  filterAds: { en: 'Ads', bn: 'বিজ্ঞাপন' },
  filterAnalytics: { en: 'Analytics', bn: 'অ্যানালিটিক্স' },
  filterAutomation: { en: 'Automation', bn: 'অটোমেশন' },
  challenge: { en: 'Challenge', bn: 'চ্যালেঞ্জ' },
  solution: { en: 'Solution', bn: 'সমাধান' },
  results: { en: 'Results & ROI', bn: 'ফলাফল ও ROI' },

  proj1Title: { en: 'Facebook Ads Scaling', bn: 'ফেসবুক অ্যাডস স্কেলিং' },
  proj1Desc: { en: 'Scaled an e-commerce brand\'s revenue from $10k to $50k/mo maintaining a 7x ROAS.', bn: 'একটি ই-কমার্স ব্র্যান্ডের রাজস্ব $১০k থেকে $৫০k/মাসে স্কেল করা হয়েছে ৭x ROAS বজায় রেখে।' },
  proj1Challenge: { en: 'A Dhaka-based fashion e-commerce brand was stuck at $10k/month revenue with a declining ROAS of 2.1x. Their ad account had no structure, creative fatigue was rampant, and they had zero retargeting in place.', bn: 'একটি ঢাকা-ভিত্তিক ফ্যাশন ব্র্যান্ড $১০k/মাস রাজস্বে আটকে ছিল এবং ROAS ২.১x-এ কমছিল।' },
  proj1Solution: { en: 'Restructured the full ad account into a 3-stage funnel (TOF/MOF/BOF), implemented Advantage+ Shopping Campaigns, built 12 custom audience segments, and launched a 5-step dynamic retargeting sequence. Created 40+ ad creatives in 3 weeks.', bn: 'সম্পূর্ণ অ্যাড অ্যাকাউন্ট ৩-স্তরের ফানেলে পুনর্গঠন করা হয়েছে, Advantage+ ক্যাম্পেইন বাস্তবায়ন করা হয়েছে এবং ১২টি কাস্টম অডিয়েন্স সেগমেন্ট তৈরি করা হয়েছে।' },
  proj1Results: { en: '7x ROAS sustained over 4 months | Revenue scaled from $10k → $50k/month | CAC reduced by 52% | 300% YoY revenue growth achieved.', bn: '৪ মাস ধরে ৭x ROAS বজায় | রাজস্ব $১০k → $৫০k/মাস | CAC ৫২% হ্রাস | ৩০০% বার্ষিক রাজস্ব বৃদ্ধি।' },

  proj2Title: { en: 'B2B Lead Generation', bn: 'B2B লিড জেনারেশন' },
  proj2Desc: { en: 'Designed a multi-funnel LinkedIn & Meta ads strategy for a SaaS company.', bn: 'একটি SaaS কোম্পানির জন্য মাল্টি-ফানেল LinkedIn ও Meta অ্যাড কৌশল ডিজাইন করা হয়েছে।' },
  proj2Challenge: { en: 'A B2B SaaS company needed qualified enterprise leads but their existing Google Ads were producing leads at $180 CPL with a close rate under 5%. They had no LinkedIn presence and no structured nurturing process.', bn: 'একটি B2B SaaS কোম্পানির যোগ্য এন্টারপ্রাইজ লিড দরকার ছিল কিন্তু তাদের CPL ছিল $১৮০।' },
  proj2Solution: { en: 'Built a LinkedIn Lead Gen campaign targeting C-suite and VP-level decision makers in 3 verticals, combined with a Meta retargeting sequence. Created a 7-email nurture sequence with HubSpot integration and a custom lead scoring model in Python.', bn: 'LinkedIn-এ C-suite কর্মকর্তাদের টার্গেট করে ক্যাম্পেইন তৈরি করা হয়েছে এবং HubSpot ইন্টিগ্রেশনের সাথে ৭-ইমেইল নার্চার সিকোয়েন্স তৈরি করা হয়েছে।' },
  proj2Results: { en: '500+ qualified leads in 60 days | CPL reduced from $180 to $12 | Sales close rate improved from 5% to 23% | Pipeline value generated: $380,000.', bn: '৬০ দিনে ৫০০+ যোগ্য লিড | CPL $১৮০ থেকে $১২-তে হ্রাস | বিক্রয় বন্ধের হার ৫% থেকে ২৩%-এ উন্নীত।' },

  proj3Title: { en: 'Marketing Dashboard', bn: 'মার্কেটিং ড্যাশবোর্ড' },
  proj3Desc: { en: 'Built a fully automated Power BI dashboard aggregating data from 5 different ad platforms.', bn: '৫টি ভিন্ন অ্যাড প্ল্যাটফর্ম থেকে ডেটা একত্রিত করে সম্পূর্ণ স্বয়ংক্রিয় Power BI ড্যাশবোর্ড তৈরি করা হয়েছে।' },
  proj3Challenge: { en: 'A multi-brand agency was spending 30+ hours per week manually pulling reports from Meta, Google, TikTok, LinkedIn, and GA4 into Excel. No single source of truth existed and decisions were made on 3-day-old data.', bn: 'একটি মাল্টি-ব্র্যান্ড এজেন্সি সপ্তাহে ৩০+ ঘণ্টা ম্যানুয়ালি রিপোর্ট টানতে ব্যয় করছিল।' },
  proj3Solution: { en: 'Built a unified SQL data warehouse pulling from all 5 platforms via API. Created a live Power BI dashboard with 12 pages covering spend, ROAS, CPL, conversion attribution, and creative performance. Automated daily refresh with Python scripts.', bn: 'API-এর মাধ্যমে সমস্ত ৫টি প্ল্যাটফর্ম থেকে ডেটা টেনে একটি SQL ডেটা ওয়্যারহাউস তৈরি করা হয়েছে এবং ১২-পৃষ্ঠার লাইভ Power BI ড্যাশবোর্ড তৈরি করা হয়েছে।' },
  proj3Results: { en: '32 hours/week saved in manual reporting | Real-time data across all platforms | Decision-making lag reduced from 3 days to 0 | Client satisfaction score: 9.8/10.', bn: 'ম্যানুয়াল রিপোর্টিংয়ে সাপ্তাহিক ৩২ ঘণ্টা সাশ্রয় | সমস্ত প্ল্যাটফর্মে রিয়েল-টাইম ডেটা | সিদ্ধান্ত গ্রহণের বিলম্ব ৩ দিন থেকে ০-তে হ্রাস।' },

  proj4Title: { en: 'AI Outreach Automation', bn: 'AI আউটরিচ অটোমেশন' },
  proj4Desc: { en: 'Implemented a Python-based automated email sequence customized with AI.', bn: 'AI দিয়ে কাস্টমাইজড Python-ভিত্তিক স্বয়ংক্রিয় ইমেইল সিকোয়েন্স বাস্তবায়ন করা হয়েছে।' },
  proj4Challenge: { en: 'A consulting firm was manually sending 200+ personalized outreach emails per day. Open rates were 12%, reply rates were 1.2%, and the sales team was burning out from repetitive tasks with no scalable system.', bn: 'একটি পরামর্শ ফার্ম প্রতিদিন ২০০+ ব্যক্তিগতকৃত ইমেইল ম্যানুয়ালি পাঠাচ্ছিল। ওপেন রেট ছিল ১২%।' },
  proj4Solution: { en: 'Built a Python + GPT-4 automated outreach system that scrapes prospect data, personalizes emails using AI based on LinkedIn profiles and company news, and auto-schedules sends through SendGrid. Integrated with HubSpot CRM for tracking.', bn: 'Python + GPT-4 ব্যবহার করে একটি স্বয়ংক্রিয় আউটরিচ সিস্টেম তৈরি করা হয়েছে যা LinkedIn প্রোফাইলের উপর ভিত্তি করে ইমেইল ব্যক্তিগতকৃত করে।' },
  proj4Results: { en: '40% email open rate (industry avg: 20%) | 8.5% reply rate (up from 1.2%) | 10 hours/week saved per sales rep | Pipeline growth of 220% in 90 days.', bn: '৪০% ইমেইল ওপেন রেট | ৮.৫% রিপ্লাই রেট (১.২% থেকে) | প্রতি বিক্রয় প্রতিনিধির জন্য সাপ্তাহিক ১০ ঘণ্টা সাশ্রয়।' },

  // Experience
  experienceBadge: { en: 'Career Journey', bn: 'ক্যারিয়ার যাত্রা' },
  experienceHeading: { en: 'Professional Experience', bn: 'পেশাদার অভিজ্ঞতা' },

  // Testimonials
  testimonialsBadge: { en: 'Client Stories', bn: 'ক্লায়েন্টের অভিজ্ঞতা' },
  testimonialsHeading: { en: 'Client Endorsements', bn: 'ক্লায়েন্টের মতামত' },

  // Contact
  contactBadge: { en: 'Get In Touch', bn: 'যোগাযোগ করুন' },
  contactHeading: { en: "Let's Build Something Great", bn: 'আসুন কিছু দুর্দান্ত তৈরি করি' },
  contactSubtext: {
    en: "Ready to scale your brand? Send a message and I'll get back to you within 24 hours.",
    bn: 'আপনার ব্র্যান্ড স্কেল করতে প্রস্তুত? একটি বার্তা পাঠান এবং আমি ২৪ ঘণ্টার মধ্যে ফিরে আসব।',
  },
  yourName: { en: 'Your Name', bn: 'আপনার নাম' },
  yourEmail: { en: 'Your Email', bn: 'আপনার ইমেইল' },
  yourMessage: { en: 'Your Message', bn: 'আপনার বার্তা' },
  sendMessage: { en: 'Send Message', bn: 'বার্তা পাঠান' },
  contactEmail: { en: 'Email', bn: 'ইমেইল' },
  contactPhone: { en: 'Phone', bn: 'ফোন' },
  contactLocation: { en: 'Location', bn: 'অবস্থান' },
  contactLocationValue: { en: 'Dhaka, Bangladesh', bn: 'ঢাকা, বাংলাদেশ' },

  // Footer
  footerCopy: { en: '© 2026 Siddiqur Rahman. All rights reserved.', bn: '© ২০২৬ সিদ্দিকুর রহমান। সর্বস্বত্ব সংরক্ষিত।' },
  footerTagline: { en: 'Digital Marketing Strategist & Founder, Boosting Agency BD', bn: 'ডিজিটাল মার্কেটিং কৌশলবিদ ও প্রতিষ্ঠাতা, বুস্টিং এজেন্সি বিডি' },

  // Chatbot
  chatbotGreeting: {
    en: "Hi! I'm the AI Assistant for Siddiqur Rahman. How can I help you today?",
    bn: 'হ্যালো! আমি সিদ্দিকুর রহমানের AI সহকারী। আমি কীভাবে আপনাকে সাহায্য করতে পারি?',
  },
  chatbotQ1: { en: 'What services do you offer?', bn: 'আপনি কী সেবা দেন?' },
  chatbotQ2: { en: 'How can I hire Siddiqur?', bn: 'কীভাবে নিয়োগ করব?' },
  chatbotQ3: { en: 'Tell me about your experience', bn: 'অভিজ্ঞতা সম্পর্কে বলুন' },

  // WhatsApp Contact
  sendWhatsApp: { en: 'Send via WhatsApp', bn: 'WhatsApp-এ পাঠান' },
  whatsappNote: { en: "Opens WhatsApp directly — fastest response!", bn: 'সরাসরি WhatsApp খুলবে — সবচেয়ে দ্রুত সাড়া!' },
  whatsappDisclaimer: { en: 'You will be redirected to WhatsApp to complete the message.', bn: 'আপনাকে বার্তা সম্পূর্ণ করতে WhatsApp-এ নির্দেশিত করা হবে।' },

  // Portfolio page
  portfolioSubtext: {
    en: 'Real campaigns. Real data. Measurable ROI across 7 in-depth case studies.',
    bn: 'বাস্তব ক্যাম্পেইন। বাস্তব ডেটা। ৭টি বিস্তারিত কেস স্টাডিতে পরিমাপযোগ্য ROI।',
  },
  filterSEO: { en: 'SEO', bn: 'SEO' },
  filterTracking: { en: 'Tracking', bn: 'ট্র্যাকিং' },

  // Case Study 5 — Google Ads
  proj5Title: { en: 'Google Ads Search Campaign', bn: 'গুগল অ্যাডস সার্চ ক্যাম্পেইন' },
  proj5Desc: { en: "Scaled a SaaS brand's Google Ads to 5.2x ROAS generating $320K in tracked revenue.", bn: 'একটি SaaS ব্র্যান্ডের Google Ads ৫.২x ROAS-এ স্কেল করে $৩২০K ট্র্যাকড রাজস্ব তৈরি করা হয়েছে।' },
  proj5Challenge: { en: 'A B2B SaaS company had been spending $15K/month on Google Ads with a 1.8x ROAS. Their account had excessive broad match keywords, zero negative keyword lists, poor Quality Scores, and no bid strategy beyond manual CPC. Cost per acquisition was $230 against a $150 target.', bn: 'একটি SaaS কোম্পানি প্রতি মাসে $১৫K Google Ads-এ ব্যয় করছিল মাত্র ১.৮x ROAS সহ। অ্যাকাউন্টে অতিরিক্ত ব্রড ম্যাচ কীওয়ার্ড এবং কোনো নেগেটিভ কীওয়ার্ড লিস্ট ছিল না।' },
  proj5Solution: { en: 'Rebuilt the account from scratch: restructured into 12 SKAGs (Single Keyword Ad Groups), implemented a comprehensive 400+ negative keyword list, enabled tCPA bidding with a 45-day warm-up period, created custom intent audiences for RLSA, and built a Looker Studio dashboard for weekly performance review.', bn: 'অ্যাকাউন্ট সম্পূর্ণ পুনর্নির্মাণ: ১২টি SKAG-এ পুনর্গঠন, ৪০০+ নেগেটিভ কীওয়ার্ড তালিকা, tCPA বিডিং এবং RLSA কাস্টম অডিয়েন্স বাস্তবায়ন।' },
  proj5Results: { en: '5.2x ROAS (up from 1.8x) | $320K in tracked revenue over 6 months | CPA reduced from $230 → $89 | Quality Score improved from avg 4.2 → 8.7 | 23% reduction in wasted spend.', bn: '৫.২x ROAS (১.৮x থেকে) | ৬ মাসে $৩২০K ট্র্যাকড রাজস্ব | CPA $২৩০ থেকে $৮৯-এ হ্রাস | কোয়ালিটি স্কোর ৪.২ থেকে ৮.৭-এ উন্নীত।' },

  // Case Study 6 — GA4 + Server-Side Tracking
  proj6Title: { en: 'GA4 + Server-Side Tracking', bn: 'GA4 + সার্ভার-সাইড ট্র্যাকিং' },
  proj6Desc: { en: 'Eliminated 38% data loss by migrating to full server-side tracking stack, achieving 100% attribution accuracy.', bn: 'সম্পূর্ণ সার্ভার-সাইড ট্র্যাকিংয়ে মাইগ্রেট করে ৩৮% ডেটা ক্ষয় দূর করা হয়েছে।' },
  proj6Challenge: { en: 'A high-traffic e-commerce site was losing 38% of conversion data due to iOS 14.5+ tracking restrictions, ad-blockers, and cookie consent friction. Marketing decisions were based on severely incomplete data, causing systematic budget misallocation.', bn: 'একটি হাই-ট্র্যাফিক ই-কমার্স সাইট iOS 14.5+ রেস্ট্রিকশন এবং অ্যাড-ব্লকারের কারণে ৩৮% কনভার্সন ডেটা হারাচ্ছিল।' },
  proj6Solution: { en: 'Migrated from client-side GTM to a server-side tagging infrastructure on Google Cloud Run. Implemented Meta CAPI (Conversions API) with event deduplication logic, GA4 server-side streaming, enhanced e-commerce schema, and built a custom consent management layer fully compliant with GDPR/PDPA.', bn: 'ক্লায়েন্ট-সাইড GTM থেকে Google Cloud Run-এ সার্ভার-সাইড ট্যাগিং ইনফ্রাস্ট্রাকচারে মাইগ্রেট। Meta CAPI এবং GA4 সার্ভার-সাইড স্ট্রিমিং বাস্তবায়ন।' },
  proj6Results: { en: '100% data accuracy restored | 38% previously lost conversions now captured | Meta Ads ROAS improved by 29% (better signal quality) | Ad spend reallocation saved $4,200/month | Full GDPR compliance achieved.', bn: '১০০% ডেটা নির্ভুলতা পুনরুদ্ধার | পূর্বে হারানো ৩৮% কনভার্সন এখন ক্যাপচার হচ্ছে | Meta Ads ROAS ২৯% উন্নত | মাসিক $৪,২০০ সাশ্রয়।' },

  // Case Study 7 — SEO
  proj7Title: { en: 'SEO Content Strategy', bn: 'SEO কন্টেন্ট কৌশল' },
  proj7Desc: { en: 'Drove 180% organic traffic growth and 95% increase in keyword rankings for a fintech startup.', bn: 'একটি ফিনটেক স্টার্টআপের জন্য ১৮০% অর্গানিক ট্র্যাফিক বৃদ্ধি এবং ৯৫% কীওয়ার্ড র্যাংকিং উন্নয়ন।' },
  proj7Challenge: { en: 'A Dhaka-based fintech startup had near-zero organic presence despite 18 months of operation. Domain authority was 8, they ranked for zero commercial keywords, and 100% of traffic came from paid channels — making them completely dependent on ad spend for growth.', bn: 'ঢাকা-ভিত্তিক একটি ফিনটেক স্টার্টআপের ১৮ মাস পরিচালনা সত্ত্বেও অর্গানিক উপস্থিতি প্রায় শূন্য ছিল। ডোমেইন অথরিটি ছিল মাত্র ৮।' },
  proj7Solution: { en: 'Conducted a full technical SEO audit and keyword gap analysis across 3 competitors. Built a 6-month editorial calendar targeting 120 high-intent keywords across informational, commercial, and transactional stages. Implemented schema markup, internal linking architecture, Core Web Vitals optimization, and a targeted backlink acquisition campaign across 40 BD finance publications.', bn: 'সম্পূর্ণ টেকনিক্যাল SEO অডিট এবং ৩ প্রতিযোগীর বিপরীতে কীওয়ার্ড গ্যাপ বিশ্লেষণ। ১২০টি হাই-ইন্টেন্ট কীওয়ার্ড টার্গেট করে ৬ মাসের এডিটোরিয়াল ক্যালেন্ডার তৈরি।' },
  proj7Results: { en: '180% increase in organic traffic (0 → 12,400 monthly sessions) | 95% of target keywords now rank on page 1 | Domain authority: 8 → 31 | Organic leads now represent 35% of total pipeline | Paid ad dependency reduced by 40%.', bn: '১৮০% অর্গানিক ট্র্যাফিক বৃদ্ধি (মাসিক ০ → ১২,৪০০ সেশন) | ৯৫% টার্গেট কীওয়ার্ড ১ম পৃষ্ঠায় | ডোমেইন অথরিটি ৮ → ৩১।' },

  // Skills section translations
  skillsCat1: { en: 'Digital Marketing', bn: 'ডিজিটাল মার্কেটিং' },
  skillsCat2: { en: 'Data Analytics', bn: 'ডেটা অ্যানালিটিক্স' },
  skillsCat3: { en: 'Technical & AI', bn: 'প্রযুক্তি ও AI' },
  skillMetaAds: { en: 'Meta Ads', bn: 'মেটা অ্যাডস' },
  skillGoogleAds: { en: 'Google Ads', bn: 'গুগল অ্যাডস' },
  skillYouTubeAds: { en: 'YouTube Ads', bn: 'ইউটিউব অ্যাডস' },
  skillConvOpt: { en: 'Conversion Opt.', bn: 'কনভার্সন অপ্ট.' },
  skillPython: { en: 'Python', bn: 'পাইথন' },
  skillSQL: { en: 'SQL', bn: 'SQL' },
  skillPowerBI: { en: 'Power BI', bn: 'পাওয়ার BI' },
  skillExcel: { en: 'Adv. Excel', bn: 'অ্যাডভ. এক্সেল' },
  skillAIAuto: { en: 'AI Automation', bn: 'AI অটোমেশন' },
  skillMarketingTools: { en: 'Marketing Tools', bn: 'মার্কেটিং টুলস' },
  skillWebTech: { en: 'Web Analytics', bn: 'ওয়েব অ্যানালিটিক্স' },
  skillDashboard: { en: 'Dashboarding', bn: 'ড্যাশবোর্ডিং' },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'bn' : 'en'));

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
