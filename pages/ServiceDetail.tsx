import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVICES, BUSINESS_INFO } from '../data';
import { ChevronLeft, ChevronRight, Calendar, Clock, ShieldCheck, CheckCircle2, Send, Loader2, Info } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);

  const isArchitectural = id === 'architectural-tinting';

  const [bookingStep, setBookingStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [bookedSlots, setBookedSlots] = useState<{date: string, time: string}[]>(() => {
    const saved = localStorage.getItem('chalan_bro_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [bookingData, setBookingData] = useState({
    date: '', time: '', name: '', email: '', phone: '', package: '', price: 0, message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const triggerSMS = (bodyContent: string) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const separator = isIOS ? '&' : '?';
    const cleanPhone = BUSINESS_INFO.phone.replace(/\D/g, '');
    const smsUrl = `sms:+1${cleanPhone}${separator}body=${encodeURIComponent(bodyContent)}`;
    window.location.href = smsUrl;
  };

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(new Date(year, month, d));
    return days;
  }, [currentMonth]);

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0;
  };

  // Generate time slots based on day of week and hours of operation
  const getTimeSlotsForDate = (dateStr: string): string[] => {
    if (!dateStr) return [];
    const date = new Date(dateStr + 'T12:00:00'); // Add time to avoid timezone issues
    const dayOfWeek = date.getDay();

    // Sunday (0) - Closed
    if (dayOfWeek === 0) return [];

    // Friday (5) and Saturday (6) - 7:00 AM - 8:00 PM
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return [
        '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
      ];
    }

    // Monday (1) - Thursday (4) - 6:00 AM - 11:00 AM
    return ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM'];
  };

  if (!service) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const body = 
      `CONFIRMED APPOINTMENT\n` +
      `Service: ${service.title}\n` +
      `Package: ${bookingData.package}\n` +
      `Price: $${bookingData.price}\n` +
      `Date: ${bookingData.date}\n` +
      `Time: ${bookingData.time}\n` +
      `Customer: ${bookingData.name}\n` +
      `Phone: ${bookingData.phone}\n` +
      `Payment: Due after service`;

    triggerSMS(body);

    const newBooking = { date: bookingData.date, time: bookingData.time };
    const updatedBookings = [...bookedSlots, newBooking];
    setBookedSlots(updatedBookings);
    localStorage.setItem('chalan_bro_bookings', JSON.stringify(updatedBookings));
    
    setTimeout(() => {
      setBookingStep(3);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const body = 
      `NEW ARCHITECTURAL INQUIRY\n` +
      `Name: ${bookingData.name}\n` +
      `Phone: ${bookingData.phone}\n` +
      `Email: ${bookingData.email}\n` +
      `Details: ${bookingData.message}`;

    triggerSMS(body);

    setTimeout(() => {
      setSent(true);
      setIsSubmitting(false);
      setTimeout(() => setSent(false), 5000);
    }, 1000);
  };

  return (
    <div className="pt-32 md:pt-40 lg:pt-48 pb-24 min-h-screen">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all mb-12 group font-bold text-xs tracking-widest uppercase py-2"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to all services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          <div className="space-y-12">
            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                 <div className="flex items-center gap-3 bg-brand px-6 py-2 rounded-full font-anton text-sm uppercase tracking-widest text-white">
                   <ShieldCheck size={18} /> Premium Installation
                 </div>
              </div>
            </div>
            
            <div className="space-y-6 text-left">
              <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-brand">{service.title}</h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            <div className="space-y-8">
              <h2 className="font-anton text-2xl uppercase tracking-[0.2em] text-white border-b border-white/10 pb-4">PACKAGES & PRICING</h2>
              <div className="grid grid-cols-1 gap-4">
                {service.packages.map((pkg, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      setSelectedPackage(pkg.name);
                      setSelectedPrice(pkg.price);
                      setBookingData(prev => ({ ...prev, package: pkg.name, price: pkg.price }));
                    }}
                    className={`p-6 md:p-8 bg-zinc-900/50 border rounded-[1.5rem] flex flex-col sm:flex-row justify-between items-center gap-6 transition-all text-left w-full ${selectedPackage === pkg.name ? 'border-brand ring-1 ring-brand' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <div className="space-y-2 text-center sm:text-left">
                      <p className={`font-anton text-2xl tracking-wide uppercase ${selectedPackage === pkg.name ? 'text-brand' : 'text-white'}`}>{pkg.name}</p>
                      <p className="text-sm text-zinc-500 font-medium">{pkg.description}</p>
                    </div>
                    <div className={`text-3xl font-anton px-8 py-3 rounded-xl border shrink-0 ${selectedPackage === pkg.name ? 'bg-brand text-white border-brand' : 'bg-zinc-800 text-white border-white/5'}`}>
                      {pkg.price > 0 ? `$${pkg.price}` : "QUOTE"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-40 bg-zinc-900/40 backdrop-blur-md p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-10">
              {isArchitectural ? (
                <div className="space-y-10 text-left">
                  <div className="text-center space-y-4">
                    <h2 className="font-anton text-4xl uppercase tracking-widest text-white">SEND INQUIRY</h2>
                    <p className="text-zinc-500 text-sm">Fill out the form below. Clicking "Send Inquiry" will prepare an SMS text to the studio team.</p>
                  </div>
                  
                  {/* Payment Notice */}
                  <div className="flex items-center gap-3 p-4 bg-brand/5 border border-brand/20 rounded-xl">
                    <Info size={20} className="text-brand shrink-0" />
                    <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Note: Payment is collected after service is completed.</p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-5">
                    <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 font-bold text-white focus:ring-2 focus:ring-brand/40 min-h-[56px]" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} />
                    <input type="tel" required placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 font-bold text-white focus:ring-2 focus:ring-brand/40 min-h-[56px]" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                    <textarea rows={4} required placeholder="Project details..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 font-bold text-white focus:ring-2 focus:ring-brand/40 resize-none" value={bookingData.message} onChange={(e) => setBookingData({...bookingData, message: e.target.value})} />
                    <button type="submit" disabled={isSubmitting} className="w-full py-6 rounded-xl bg-brand hover:bg-brand-hover font-anton text-2xl uppercase tracking-widest text-white min-h-[64px] transition-all active:scale-95">
                      {isSubmitting ? <><Loader2 className="animate-spin" /> Preparing...</> : sent ? "Ready to Send!" : "Send Inquiry"}
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  {bookingStep === 1 && (
                    <div className="space-y-8 text-left animate-in fade-in">
                      <h2 className="font-anton text-4xl uppercase tracking-widest text-white text-center">BOOK APPOINTMENT</h2>
                      
                      {/* Payment Notice */}
                      <div className="flex items-center gap-3 p-4 bg-brand/5 border border-brand/20 rounded-xl">
                        <Info size={20} className="text-brand shrink-0" />
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Note: Payment is collected after service is completed.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                          <div className="flex items-center justify-between mb-6">
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-white hover:text-brand transition-colors"><ChevronLeft size={24} /></button>
                            <h3 className="font-anton text-xl uppercase text-white">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                            <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-white hover:text-brand transition-colors"><ChevronRight size={24} /></button>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[10px] font-black text-zinc-600">{d}</div>)}
                            {calendarDays.map((date, i) => (
                              <button
                                key={i}
                                disabled={isDateDisabled(date)}
                                onClick={() => date && setBookingData(prev => ({ ...prev, date: date.toISOString().split('T')[0], time: '' }))}
                                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${!date ? '' : isDateDisabled(date) ? 'text-zinc-800' : bookingData.date === date.toISOString().split('T')[0] ? 'bg-brand text-white shadow-lg' : 'text-zinc-300 hover:bg-white/10'}`}
                              >
                                {date?.getDate()}
                              </button>
                            ))}
                          </div>
                        </div>

                        {bookingData.date && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 animate-in fade-in">
                            {getTimeSlotsForDate(bookingData.date).map(slot => (
                              <button key={slot} onClick={() => setBookingData({...bookingData, time: slot})} className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${bookingData.time === slot ? 'bg-brand border-brand text-white' : 'bg-white/5 border-white/10 text-zinc-500'}`}>{slot}</button>
                            ))}
                          </div>
                        )}
                        <button onClick={() => setBookingStep(2)} disabled={!bookingData.date || !bookingData.time || !selectedPackage} className="w-full mt-4 bg-brand hover:bg-brand-hover disabled:bg-zinc-800 disabled:text-zinc-600 py-6 rounded-xl font-anton text-2xl uppercase tracking-widest text-white transition-all min-h-[64px]">
                          Continue
                        </button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <form onSubmit={handleBookingSubmit} className="space-y-8 text-left animate-in slide-in-from-right-4">
                      <div className="text-center">
                        <button type="button" onClick={() => setBookingStep(1)} className="text-[10px] font-black text-brand uppercase mb-4">← Change Date</button>
                        <h2 className="font-anton text-4xl uppercase text-white">CONTACT INFO</h2>
                      </div>
                      
                      {/* Payment Notice */}
                      <div className="flex items-center gap-3 p-4 bg-brand/5 border border-brand/20 rounded-xl">
                        <Info size={20} className="text-brand shrink-0" />
                        <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Note: Payment is collected after service is completed.</p>
                      </div>

                      <div className="space-y-4">
                        <input type="text" required placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 font-bold text-white focus:ring-2 focus:ring-brand/40 min-h-[56px]" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} />
                        <input type="tel" required placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 font-bold text-white focus:ring-2 focus:ring-brand/40 min-h-[56px]" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} />
                        <div className="bg-zinc-800 p-8 rounded-2xl border border-white/5 mt-8">
                           <div className="flex justify-between items-center mb-6">
                             <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Selected Total</span>
                             <span className="font-anton text-4xl text-white">${selectedPrice}</span>
                           </div>
                           <button type="submit" disabled={isSubmitting} className="w-full bg-brand hover:bg-brand-hover py-6 rounded-xl font-anton text-2xl text-white uppercase tracking-widest transition-all min-h-[64px] active:scale-95">
                             {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Booking"}
                           </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {bookingStep === 3 && (
                    <div className="text-center space-y-12 py-10 animate-in zoom-in">
                      <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-3xl flex items-center justify-center mx-auto">
                        <CheckCircle2 size={40} />
                      </div>
                      <h2 className="font-anton text-5xl text-white uppercase tracking-widest">SENDING!</h2>
                      <p className="text-zinc-500 text-sm">Your booking text is ready to send. Check your messaging app to complete the request.</p>
                      <button onClick={() => navigate('/')} className="w-full border border-white/10 py-5 rounded-xl font-anton text-xl text-white min-h-[56px]">Return Home</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
