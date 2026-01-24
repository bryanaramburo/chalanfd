import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO, SERVICES, LOGO_URL } from '../data';
import { Mail, Phone, MapPin, Instagram, Youtube, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        
        {/* Brand Section - Centered on mobile, left-aligned on large screens */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <Link to="/" className="inline-block group relative" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Interactive high intensity glow - circular */}
            <div className="absolute -inset-4 bg-brand/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            {/* Constant soft base glow - circular */}
            <div className="absolute inset-0 bg-brand/10 rounded-full blur-xl"></div>
            
            {/* Circular logo container with glow border */}
            <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-2 border-brand bg-white overflow-hidden shadow-[0_0_25px_rgba(125,182,157,0.3)] flex items-center justify-center transition-transform group-hover:scale-105 duration-500 relative z-10">
              <img 
                src={LOGO_URL} 
                alt="Chalan & Bro Logo" 
                className="w-full h-full object-cover scale-[1.45]"
              />
            </div>
          </Link>
          <p className="text-zinc-500 leading-relaxed text-sm max-w-xs">
            Setting the standard for window tinting excellence in Georgia since {BUSINESS_INFO.established}. Family-owned and dedicated to precision.
          </p>
          <div className="flex gap-4">
            <a href={BUSINESS_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white text-zinc-400 transition-all border border-white/5">
              <span className="sr-only">Instagram</span>
              <Instagram size={20} />
            </a>
            <a href={BUSINESS_INFO.social.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white text-zinc-400 transition-all border border-white/5">
              <span className="sr-only">YouTube</span>
              <Youtube size={20} />
            </a>
            <a href={BUSINESS_INFO.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand hover:text-white text-zinc-400 transition-all border border-white/5 font-black text-xs">
              TT
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h4 className="font-anton text-2xl mb-8 tracking-[0.2em] uppercase text-white border-b-2 border-brand/30 pb-2">Quick Links</h4>
          <ul className="space-y-4">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to={`/service/${s.id}`} className="text-zinc-500 hover:text-brand transition-colors text-sm font-bold uppercase tracking-widest block">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h4 className="font-anton text-2xl mb-8 tracking-[0.2em] uppercase text-white border-b-2 border-brand/30 pb-2">Service Areas</h4>
          <ul className="space-y-4">
            {BUSINESS_INFO.areas.map((area) => (
              <li key={area} className="text-zinc-500 text-sm flex items-center justify-center sm:justify-start gap-3 font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 bg-brand rounded-full shrink-0"></div> {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Business Hours */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h4 className="font-anton text-2xl mb-8 tracking-[0.2em] uppercase text-white border-b-2 border-brand/30 pb-2">Hours</h4>
          <ul className="space-y-6 w-full max-w-[240px] sm:max-w-none">
            <li className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <Clock size={18} className="text-brand mt-0.5 shrink-0" />
              <div className="text-sm space-y-1">
                <p className="text-zinc-300 font-black uppercase tracking-widest text-[10px]">Mon - Thu</p>
                <p className="text-zinc-500 font-bold">{BUSINESS_INFO.hours.monThu}</p>
                <p className="text-zinc-300 font-black uppercase tracking-widest text-[10px] pt-3">Fri - Sat</p>
                <p className="text-zinc-500 font-bold">{BUSINESS_INFO.hours.friSat}</p>
                <p className="text-zinc-300 font-black uppercase tracking-widest text-[10px] pt-3">Sunday</p>
                <p className="text-red-500/80 font-black uppercase tracking-widest">{BUSINESS_INFO.hours.sun}</p>
              </div>
            </li>
            <li className="pt-6 border-t border-white/5 w-full flex justify-center sm:justify-start">
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-4 text-zinc-400 hover:text-brand transition-colors font-anton text-2xl tracking-widest">
                <Phone size={22} className="text-brand" /> {BUSINESS_INFO.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
        <p className="text-center md:text-left">© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
        <div className="flex gap-8">
          <Link to="/" className="hover:text-brand transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-brand transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;