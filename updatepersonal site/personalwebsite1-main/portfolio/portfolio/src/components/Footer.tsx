import { useLanguage } from '@/contexts/LanguageContext';
import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'experience', href: '#experience' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <footer className="bg-card border-t border-card-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <a href="#home" className="text-3xl font-display font-bold tracking-tighter text-gradient mb-2 block">
              SR.
            </a>
            <p className="text-muted-foreground text-sm max-w-sm mb-2 font-medium">
              {t('footerTagline')}
            </p>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              {t('tagline')}
            </p>
            <div className="flex gap-4">
              {[FaLinkedin, FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4">{t('portfolio')}</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.key}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4">{t('contactBadge')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('contactLocationValue')}</li>
              <li>turjoy144@gmail.com</li>
              <li>+880 1518 961899</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t('footerCopy')}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="text-primary text-xs font-medium">{t('footerTagline')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
