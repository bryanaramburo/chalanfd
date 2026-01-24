import { BUSINESS_INFO, LOGO_URL, SERVICES } from '../data';
import { ChevronDown, Instagram, Menu, Phone, X, Youtube } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll for glassmorphism effect if needed, but keeping it transparent as requested
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 h-28 lg:h-36 ${
        scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          {/* Logo - Circular with enhanced glow effect */}
          <Link 
            to="/" 
            className="flex items-center group shrink-0 relative z-[120]" 
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative p-1">
              {/* High intensity hover glow - circular */}
              <div className="absolute -inset-2 bg-brand/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              {/* Constant soft base glow - circular */}
              <div className="absolute inset-0 bg-brand rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
              
              {/* Logo Container - Reverted to Circular */}
              <div className="h-20 w-20 lg:h-28 lg:w-28 rounded-full border-2 border-brand bg-white overflow-hidden shadow-[0_0_20px_rgba(125,182,157,0.4)] relative z-10 flex items-center justify-center transition-all group-hover:scale-105 duration-500">
                <img 
                  src={LOGO_URL} 
                  alt="Chalan & Bro Tint Studio Logo" 
                  className="w-full h-full object-cover scale-[1.45] transition-transform duration-500"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-2 font-bold text-xs uppercase tracking-[0.3em] hover:text-brand transition-colors py-8 text-white drop-shadow-md">
                Services <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`absolute top-[80%] left-1/2 -translate-x-1/2 w-72 bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 ${isServicesOpen ? 'opacity-100 translate-y-4 pointer-events-auto' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
                {SERVICES.map((s) => (
                  <Link 
                    key={s.id} 
                    to={`/service/${s.id}`}
                    className="block px-8 py-5 hover:bg-brand/10 hover:text-brand transition-all border-b border-white/5 last:border-0 font-bold text-xs uppercase tracking-widest text-white/80"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            <button onClick={() => handleNavClick('about')} className="font-bold text-xs uppercase tracking-[0.3em] hover:text-brand transition-colors text-white drop-shadow-md">About Us</button>
            <button onClick={() => handleNavClick('contact')} className="font-bold text-xs uppercase tracking-[0.3em] hover:text-brand transition-colors text-white drop-shadow-md">Contact</button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-6 relative z-[120]">
            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden lg:flex items-center gap-2 bg-brand hover:bg-brand-hover px-8 py-4 rounded-2xl font-anton text-base transition-all active:scale-95 uppercase tracking-widest text-white shadow-xl shadow-brand/20"
            >
              <Phone size={18} /> Call Now
            </a>

            <a 
              href={`tel:${BUSINESS_INFO.phone}`}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white active:scale-90 transition-all shadow-lg"
              aria-label="Call Now"
            >
              <Phone size={24} />
            </a>

            <button 
              className="lg:hidden text-white w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 active:scale-90 transition-all shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[105] bg-black transition-all duration-500 lg:hidden flex flex-col ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`flex-1 overflow-y-auto px-6 pt-44 pb-12 transition-transform duration-500 ease-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-10'
        }`}>
          <div className="flex flex-col gap-12 max-w-lg mx-auto">
            <div className="space-y-6">
              <span className="text-brand uppercase text-[10px] font-black tracking-[0.5em] block border-b border-white/10 pb-4">Our Expertise</span>
              <div className="flex flex-col gap-5">
                {SERVICES.map((s) => (
                  <Link 
                    key={s.id} 
                    to={`/service/${s.id}`} 
                    className="text-2xl font-anton uppercase tracking-widest text-white hover:text-brand transition-colors flex items-center justify-between group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {s.title}
                    <ChevronDown size={20} className="-rotate-90 text-zinc-700 group-hover:text-brand transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="text-zinc-600 uppercase text-[10px] font-black tracking-[0.5em] block border-b border-white/10 pb-4">Explore</span>
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => handleNavClick('about')} 
                  className="text-4xl font-anton uppercase text-left tracking-wider text-white active:text-brand"
                >
                  About Us
                </button>
                <button 
                  onClick={() => handleNavClick('contact')} 
                  className="text-4xl font-anton uppercase text-left tracking-wider text-white active:text-brand"
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <span className="text-zinc-600 uppercase text-[10px] font-black tracking-[0.5em] block border-b border-white/10 pb-4">Social Media</span>
              <div className="flex gap-6">
                <a 
                  href={BUSINESS_INFO.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand/20 transition-all active:scale-90"
                >
                  <Instagram size={24}/>
                </a>
                <a 
                  href={BUSINESS_INFO.social.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand/20 transition-all active:scale-90"
                >
                  <Youtube size={24}/>
                </a>
                <a 
                  href={BUSINESS_INFO.social.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-sm hover:bg-brand/20 transition-all active:scale-90"
                >
                  TT
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`p-6 border-t border-white/10 bg-zinc-950/80 backdrop-blur-md transition-transform duration-500 delay-100 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <a 
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center justify-center gap-4 w-full bg-brand text-white py-5 rounded-2xl font-anton text-2xl uppercase tracking-widest shadow-2xl active:scale-[0.98] transition-all"
          >
            <Phone size={24} /> Call Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;