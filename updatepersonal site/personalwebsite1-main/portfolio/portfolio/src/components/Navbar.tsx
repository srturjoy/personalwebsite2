import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'experience', path: '/experience' },
  { key: 'contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-background/70 backdrop-blur-2xl border-b border-white/10 dark:border-white/[0.06] shadow-lg shadow-black/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-gradient hover:opacity-90 transition-opacity">
          SR.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.key} className="relative">
                  <Link
                    href={item.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg block ${
                      active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t(item.key)}
                    {active && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center space-x-2 border-l border-border/60 pl-4 ml-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hover:bg-secondary/80"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="font-semibold rounded-full text-xs px-3 hover:bg-secondary/80 gap-1.5"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === 'en' ? 'বাং' : 'EN'}
            </Button>

            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-5 text-sm shadow-[0_0_16px_rgba(59,130,246,0.4)] hover:shadow-[0_0_28px_rgba(59,130,246,0.6)] transition-shadow">
                {t('hireMe')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile header controls */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full w-9 h-9"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="font-semibold text-xs px-2 rounded-full"
          >
            <Globe className="h-3.5 w-3.5 mr-1" />
            {language === 'en' ? 'বাং' : 'EN'}
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-background/90 backdrop-blur-2xl border-t border-border/40"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.key}
                    href={item.path}
                    className={`flex items-center py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-border/40">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-primary text-primary-foreground font-semibold rounded-xl">
                    {t('hireMe')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
