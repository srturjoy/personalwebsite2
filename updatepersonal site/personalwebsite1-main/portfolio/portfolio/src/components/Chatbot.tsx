import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const isBangla = (text: string) => /[\u0980-\u09FF]/.test(text);

const responses = {
  en: {
    services: "Siddiqur offers 5 core services: Performance Marketing, Lead Generation, E-commerce Scaling, Marketing Analytics, and AI Marketing Automation. Check the Services section for details!",
    hire: "Great choice! You can fill out the Contact form below or email directly at turjoy144@gmail.com. He typically responds within 24 hours.",
    price: "Pricing is custom based on scope. Book a free 30-minute consultation call to get a tailored quote — no obligation!",
    experience: "Siddiqur has 5+ years of experience, including roles at Algonest (Senior Social Media Marketer), Robo Tech Valley (Digital Marketing Specialist), and as Founder of Boosting Agency BD.",
    agency: "Boosting Agency BD is Siddiqur's own digital marketing agency based in Dhaka. It provides performance marketing, lead generation, and analytics services to local and international clients.",
    contact: "You can reach Siddiqur at turjoy144@gmail.com or call +8801518961899. He's available for remote and international projects.",
    email: "Thanks! I've noted your email. Siddiqur will reach out within 24 hours.",
    default: "I'll make sure Siddiqur sees this. For a faster response, email turjoy144@gmail.com. Can I get your email so he can follow up?",
  },
  bn: {
    services: "সিদ্দিকুর ৫টি মূল সেবা প্রদান করেন: পারফরম্যান্স মার্কেটিং, লিড জেনারেশন, ই-কমার্স স্কেলিং, মার্কেটিং অ্যানালিটিক্স এবং AI মার্কেটিং অটোমেশন। বিস্তারিত জানতে সেবা বিভাগটি দেখুন!",
    hire: "চমৎকার সিদ্ধান্ত! নিচের যোগাযোগ ফর্ম পূরণ করুন অথবা সরাসরি turjoy144@gmail.com-এ ইমেইল করুন। তিনি সাধারণত ২৪ ঘণ্টার মধ্যে সাড়া দেন।",
    price: "মূল্য প্রজেক্টের পরিধির উপর নির্ভর করে কাস্টম হয়। একটি বিনামূল্যে ৩০-মিনিটের পরামর্শ কলের জন্য বুক করুন এবং কাস্টম কোট পান!",
    experience: "সিদ্দিকুরের ৫+ বছরের অভিজ্ঞতা রয়েছে, যার মধ্যে রয়েছে Algonest-এ সিনিয়র সোশ্যাল মিডিয়া মার্কেটার, Robo Tech Valley-তে ডিজিটাল মার্কেটিং বিশেষজ্ঞ এবং বুস্টিং এজেন্সি বিডি-র প্রতিষ্ঠাতা হিসেবে ভূমিকা।",
    agency: "বুস্টিং এজেন্সি বিডি হলো সিদ্দিকুরের নিজস্ব ডিজিটাল মার্কেটিং এজেন্সি যা ঢাকায় অবস্থিত। এটি স্থানীয় ও আন্তর্জাতিক ক্লায়েন্টদের পারফরম্যান্স মার্কেটিং সেবা প্রদান করে।",
    contact: "সিদ্দিকুরের সাথে যোগাযোগ করুন: turjoy144@gmail.com অথবা +8801518961899। তিনি রিমোট এবং আন্তর্জাতিক প্রজেক্টের জন্য উপলব্ধ।",
    email: "ধন্যবাদ! আমি আপনার ইমেইল নোট করেছি। সিদ্দিকুর ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।",
    default: "সিদ্দিকুর অবশ্যই এটি দেখবেন। দ্রুত সাড়া পেতে turjoy144@gmail.com-এ ইমেইল করুন। আপনার ইমেইল জানাতে পারবেন কি?",
  },
};

function getBotResponse(text: string, lang: 'en' | 'bn'): string {
  const useBn = isBangla(text) || lang === 'bn';
  const r = useBn ? responses.bn : responses.en;
  const lower = text.toLowerCase();

  if (lower.includes('service') || lower.includes('সেবা') || lower.includes('offer') || lower.includes('কী করেন')) return r.services;
  if (lower.includes('hire') || lower.includes('নিয়োগ') || lower.includes('work') || lower.includes('কাজ')) return r.hire;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('মূল্য') || lower.includes('দাম') || lower.includes('charge')) return r.price;
  if (lower.includes('experience') || lower.includes('অভিজ্ঞতা') || lower.includes('background') || lower.includes('career') || lower.includes('career')) return r.experience;
  if (lower.includes('agency') || lower.includes('boosting') || lower.includes('এজেন্সি')) return r.agency;
  if (lower.includes('contact') || lower.includes('যোগাযোগ') || lower.includes('phone') || lower.includes('email') || lower.includes('reach')) return r.contact;
  if (lower.includes('@')) return r.email;
  return r.default;
}

export default function Chatbot() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: t('chatbotGreeting'), sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Re-init greeting when language changes
  useEffect(() => {
    setMessages([{ id: '1', text: t('chatbotGreeting'), sender: 'bot' }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = (text?: string) => {
    const val = (text ?? inputValue).trim();
    if (!val) return;
    setInputValue('');

    const userMsg: Message = { id: Date.now().toString(), text: val, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botText = getBotResponse(val, language as 'en' | 'bn');
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: botText, sender: 'bot' }]);
    }, 800);
  };

  const predefinedQuestions = [t('chatbotQ1'), t('chatbotQ2'), t('chatbotQ3')];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
            isOpen ? 'bg-secondary text-foreground' : 'bg-primary text-primary-foreground'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={!isOpen ? {
            boxShadow: ["0 0 0 0 rgba(59,130,246,0)", "0 0 0 18px rgba(59,130,246,0.3)", "0 0 0 0 rgba(59,130,246,0)"]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          data-testid="button-chatbot-toggle"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[70vh] bg-card border border-card-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/10 p-4 flex items-center gap-3 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">AI Assistant</h4>
                <div className="flex items-center text-xs text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                  {language === 'bn' ? 'অনলাইন' : 'Online'}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/40">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[82%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.sender === 'user' ? 'bg-secondary text-foreground' : 'bg-primary/20 text-primary'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-card border border-border text-foreground rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 bg-background/40 border-t border-border/50">
                {predefinedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors border border-border whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-card border-t border-border flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                placeholder={language === 'bn' ? 'বার্তা লিখুন...' : 'Type a message...'}
                className="flex-1 bg-background border-border text-sm"
                data-testid="input-chatbot-message"
              />
              <Button
                size="icon"
                onClick={() => handleSend()}
                className="bg-primary text-primary-foreground shrink-0"
                data-testid="button-chatbot-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
