import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Robust SMS trigger for mobile browsers
  const triggerSMS = (bodyContent: string) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isIOS ? '&' : '?';
    const cleanPhone = BUSINESS_INFO.phone.replace(/\D/g, '');
    const smsUrl = `sms:+1${cleanPhone}${separator}body=${encodeURIComponent(bodyContent)}`;
    
    // Use window.location.href for most reliable redirection
    window.location.href = smsUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    const body = 
      `NEW STUDIO INQUIRY\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Message: ${formData.message}`;

    triggerSMS(body);

    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div className="space-y-12 text-left">
            <div>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-lg mb-12">
                Whether you prefer a call, a text, or an email, our team is standing by to provide you with the best tinting experience in Georgia.
              </p>
            </div>

            {/* Exact Screenshot Match: Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a 
                href={`tel:${BUSINESS_INFO.phone}`} 
                className="p-8 rounded-[1.5rem] bg-zinc-900/60 border border-white/5 hover:border-brand/40 transition-all group min-h-[180px] flex flex-col justify-center"
              >
                <div className="w-14 h-14 bg-[#5ba381] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone size={28} className="text-white" />
                </div>
                <p className="font-black text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Call Us Directly</p>
                <p className="font-anton text-4xl tracking-wider text-white">7708376529</p>
              </a>
              
              <button 
                onClick={() => triggerSMS("Hello! I'm interested in a quick quote.")}
                className="p-8 rounded-[1.5rem] bg-zinc-900/60 border border-white/5 hover:border-brand/40 transition-all group min-h-[180px] flex flex-col justify-center text-left"
              >
                <div className="w-14 h-14 bg-[#1a9d4a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare size={28} className="text-white" />
                </div>
                <p className="font-black text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Text for Quick Quote</p>
                <p className="font-anton text-4xl tracking-wider text-white">SMS MESSAGE</p>
              </button>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
              <p className="font-black text-[11px] text-zinc-500 uppercase tracking-[0.2em]">Available Mon-Sat for Same-Day Service</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand/5 rounded-[2.5rem] -z-10 blur-3xl"></div>
            <form onSubmit={handleSubmit} className="bg-zinc-900/50 backdrop-blur-sm p-6 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    disabled={status === 'sending'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all text-white font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="your@email.com"
                    disabled={status === 'sending'}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all text-white font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Phone</label>
                <input 
                  type="tel" 
                  required
                  placeholder="770-000-0000"
                  disabled={status === 'sending'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all text-white font-medium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  disabled={status === 'sending'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all resize-none text-white font-medium"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`w-full py-5 rounded-xl font-anton text-xl uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-white min-h-[56px] ${
                  status === 'sent' ? 'bg-green-600' : 
                  status === 'sending' ? 'bg-brand/50' : 
                  'bg-brand hover:bg-brand-hover shadow-xl shadow-brand/20'
                }`}
              >
                {status === 'sending' ? <><Loader2 className="animate-spin" /> Preparing...</> : status === 'sent' ? <><CheckCircle2 /> Request Ready!</> : <><Send size={20} /> Send Inquiry</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;