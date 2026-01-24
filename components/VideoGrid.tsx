
import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

const VideoGrid: React.FC = () => {
  // Provided Imgur video IDs converted to direct mp4 links
  const videoIds = [
    "m1I2NZu", "tJgdeSo", "3Vnv7JR", "t9ijAc0", 
    "3WfPWbM", "ScBVihT", "dldAey0", "DRqEbFk", 
    "0nP4ZTL", "ImG63Ht", "DNYyVci", "9I3QHIM"
  ];

  const videos = videoIds.map(id => `https://i.imgur.com/${id}.mp4`);

  // Repeat the list to ensure smooth infinite scroll
  const gridItems = [...videos, ...videos];

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-black uppercase tracking-widest mb-6">
            Our Work in Motion
          </div>
          <h2 className="font-anton text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-4">
            BROTHERS <span className="text-brand">IN ACTION</span>
          </h2>
          <p className="text-zinc-500 font-medium text-lg">
            Watch our team deliver precision results. We take pride in every cut, every curve, and every satisfied customer.
          </p>
        </div>
      </div>

      <div className="relative h-[600px] md:h-[1000px] overflow-hidden">
        {/* Gradients to fade edges for a seamless transition */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="h-40 bg-gradient-to-b from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </div>

        <div className="animate-scroll-up px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {gridItems.map((videoSrc, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] relative group overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 shadow-2xl"
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                   <div className="w-12 h-12 rounded-full bg-brand/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-brand/40 text-white">
                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-up-infinite {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up-infinite 60s linear infinite;
        }
      `}</style>

      {/* Social Links */}
      <div className="mt-24 container mx-auto px-4 text-center">
        <h3 className="font-anton text-2xl uppercase tracking-[0.2em] mb-12 text-zinc-400">FOLLOW US FOR MORE CONTENT</h3>
        <div className="flex flex-wrap justify-center gap-10">
          <a href={BUSINESS_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 p-[1px]">
               <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors text-white">
                  <Instagram size={32} />
               </div>
            </div>
            <span className="font-bold text-xs uppercase tracking-widest text-zinc-500">Instagram</span>
          </a>
          <a href={BUSINESS_INFO.social.tiktok} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800 p-[1px] hover:bg-white transition-all">
               <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center font-black text-xl text-white">
                  TT
               </div>
            </div>
            <span className="font-bold text-xs uppercase tracking-widest text-zinc-500">TikTok</span>
          </a>
          <a href={BUSINESS_INFO.social.youtube} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-600/50 flex items-center justify-center hover:bg-red-600 transition-colors text-white">
               <Youtube size={32} />
            </div>
            <span className="font-bold text-xs uppercase tracking-widest text-zinc-500">YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
