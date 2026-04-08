import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 ${className}`}>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}
