import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Shield } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data';
import VideoGrid from '../components/VideoGrid';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
  const handleServicesScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#050505] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70 sm:opacity-80 scale-100 sm:scale-[1.05] transition-transform duration-1000"
            style={{ objectPosition: 'center 45%' }}
          >
            <source src="https://i.imgur.com/MzrVX3D.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#050505]"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center flex flex-col justify-center items-center min-h-screen pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="space-y-4 mb-8 md:mb-12">
             <div className="inline-block px-4 py-1.5 rounded-full bg-brand/20 border border-brand/40 text-brand text-[10px] md:text-xs font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-top-4 duration-700 backdrop-blur-sm">
                Premium Tint Specialists
             </div>
             <h1 className="font-anton text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[13rem] tracking-tighter leading-[0.85] uppercase animate-in fade-in slide-in-from-bottom-8 duration-1000 drop-shadow-[0_8px_48px_rgba(0,0,0,1)]">
               <span className="text-white block">CHALAN & BRO</span>
               <span className="text-brand block">TINT STUDIO</span>
             </h1>
          </div>

          <p className="text-zinc-200 text-sm md:text-xl lg:text-2xl max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in duration-1000 delay-300 px-4 mb-12 md:mb-16 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Excellence in automotive and architectural tinting. From Flowery Branch to Cumming, we bring elite window protection to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 animate-in fade-in duration-1000 delay-500 mb-16 md:mb-24 w-full max-w-xs sm:max-w-none px-6">
            <Link 
              to="/service/vehicle-tinting" 
              className="bg-brand hover:bg-brand-hover px-10 md:px-14 py-4 md:py-6 rounded-2xl font-anton text-lg md:text-2xl uppercase tracking-widest transition-all active:scale-95 shadow-2xl shadow-brand/40 text-white text-center min-h-[56px] flex items-center justify-center"
            >
              Get Started
            </Link>
            <a 
              href="#services" 
              onClick={handleServicesScroll}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-10 md:px-14 py-4 md:py-6 rounded-2xl font-anton text-lg md:text-2xl uppercase tracking-widest transition-all text-white text-center shadow-lg min-h-[56px] flex items-center justify-center"
            >
              Our Services
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-8 max-w-5xl w-full mx-auto pt-12 pb-6 text-white/70 border-t border-white/10 backdrop-blur-sm rounded-b-2xl">
             {[
               { val: "100%", label: "Accuracy" },
               { val: "LIFETIME", label: "Warranty" },
               { val: "FLAT-RATE", label: "Pricing" },
               { val: "SAME-DAY", label: "Service" }
             ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center">
                 <span className="font-anton text-3xl sm:text-5xl text-white uppercase leading-none mb-2 drop-shadow-md">{stat.val}</span>
                 <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-[#080808]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-20 space-y-4">
            <h2 className="font-anton text-4xl md:text-7xl uppercase tracking-tighter leading-none text-white">
               PROFESSIONAL <br />
               <span className="text-brand italic underline decoration-brand/30 underline-offset-8">SERVICES</span>
            </h2>
            <p className="text-zinc-500 max-w-md mx-auto font-medium">Precision-crafted solutions for every glass surface you own.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="group bg-zinc-900 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-brand transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform text-white">
                      <ShieldCheck size={24} aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex-grow space-y-4 text-left">
                  <h3 className="font-anton text-2xl tracking-wide uppercase leading-none group-hover:text-brand transition-colors text-white">{service.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{service.shortDescription}</p>
                </div>
                <div className="p-8 md:p-10 pt-0 text-left">
                  <Link 
                    to={`/service/${service.id}`}
                    className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.3em] text-brand hover:text-white transition-all group/btn min-h-[44px]"
                  >
                    LEARN MORE <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VideoGrid />

      {/* About Us */}
      <section id="about" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand/10 rounded-[3rem] blur-2xl group-hover:bg-brand/20 transition-all duration-1000"></div>
              <img 
                src="https://i.imgur.com/zfORVRm.jpeg" 
                alt="Family business team" 
                loading="lazy"
                className="rounded-[2.5rem] shadow-2xl relative z-10 grayscale group-hover:grayscale-0 transition-all duration-1000 border border-white/10 w-full object-cover aspect-video lg:aspect-auto"
              />
            </div>
            
            <div className="space-y-8 md:space-y-10 text-left">
              <div className="space-y-4">
                <h2 className="font-anton text-4xl md:text-7xl uppercase tracking-tighter leading-none">
                   FAMILY OWNED <br />
                   <span className="text-brand italic">SINCE 2024.</span>
                </h2>
                <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  "Chalan & Bro Tint Studio was established in late 2024, we are a family-owned company dedicated to providing top-notch tinting services for cars, homes, and architectural spaces."
                </p>
              </div>
              
              <div className="p-6 md:p-8 bg-zinc-900 rounded-3xl border border-white/5 space-y-4 shadow-xl">
                 <h3 className="font-anton text-2xl text-brand uppercase tracking-widest">Our Difference</h3>
                 <p className="text-zinc-400 leading-relaxed font-medium">
                   We believe in delivering excellent results and a trustworthy experience. Upfront, flat-rate pricing—no surprises, just honest work.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8">
                 <div className="flex gap-4">
                    <Shield className="text-brand flex-shrink-0" size={32} />
                    <div className="space-y-1">
                      <p className="font-anton text-lg tracking-wider text-white">WARRANTY</p>
                      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Lifetime Ceramic</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <Zap className="text-brand flex-shrink-0" size={32} />
                    <div className="space-y-1">
                      <p className="font-anton text-lg tracking-wider text-white">SPEED</p>
                      <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Same-day service</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default Home;