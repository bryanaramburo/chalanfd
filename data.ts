import { BusinessInfo, Service } from './types';

export const LOGO_URL = "https://imgur.com/h4bgj6e";

export const BUSINESS_INFO: BusinessInfo = {
  name: "Chalan & Bro Tint Studio",
  phone: "7708376529",
  email: "chalantint@gmail.com",
  areas: ["Flowery Branch", "Buford", "Oakwood", "Gainesville", "Cumming, GA"],
  established: 2024,
  hours: {
    monThu: "6:00 AM - 11:00 AM",
    friSat: "7:00 AM - 8:00 PM",
    sun: "Closed"
  },
  social: {
    instagram: "https://www.instagram.com/chalantint?igsh=MTNpazRrNmJ0bDBkcg%3D%3D&utm_source=qr",
    tiktok: "https://www.tiktok.com/@chlan.bro.tint.st?_r=1&_t=ZT-936SC1BCcog",
    youtube: "https://youtube.com/@chalanbrotintstudio?si=BCRMRdnL0b5y9pOE"
  },
  warranties: [
    "1 year warranty on all installations (Damages, Scratches, defects)",
    "Lifetime warranty on Ceramic film installations"
  ]
};

export const SERVICES: Service[] = [
  {
    id: "vehicle-tinting",
    title: "Vehicle Window Tinting",
    shortDescription: "Our most popular service. Protect your car's interior and stay cool with our premium film options.",
    fullDescription: "Transform your vehicle with our professional tinting services. We offer high-performance films that block up to 99% of UV rays, reduce interior temperatures, and provide unmatched privacy and style. Whether you're looking for standard carbon or high-tech ceramic, we have the perfect solution for your ride.",
    image: "https://i.imgur.com/7UL3kU2.jpeg",
    packages: [
      { name: "Standard All Around (Excluding Windshield)", price: 220, description: "Quality carbon film with 1 year warranty." },
      { name: "Standard All Around (Including Windshield)", price: 320, description: "Complete carbon coverage for full protection." },
      { name: "Ceramic All Around (Excluding Windshield)", price: 320, description: "Premium ceramic film with lifetime warranty." },
      { name: "Ceramic All Around (Including Windshield)", price: 420, description: "Ultimate ceramic package for max heat rejection." }
    ]
  },
  {
    id: "architectural-tinting",
    title: "Architectural Window Tinting",
    shortDescription: "Enhance privacy and energy efficiency for your home or office with our architectural solutions.",
    fullDescription: "Our architectural tinting services provide home and business owners with significant energy savings and improved comfort. Our professional-grade films reduce glare on screens, protect furniture from UV fading, and add a layer of safety and security to your glass surfaces.",
    image: "https://i.imgur.com/77KH0Iq.jpeg",
    packages: [
      { name: "Custom Quote", price: 0, description: "Pricing varies based on specific needs. Contact us for a free personalized quote!" }
    ]
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    shortDescription: "Restore clarity to oxidized, foggy headlights for improved visibility and safety.",
    fullDescription: "Oxidized, yellowed headlights don't just look bad—they're a safety hazard. Our multi-stage restoration process removes years of haze and seals the lens with a UV-resistant coating to keep them clear for years to come.",
    image: "https://i.imgur.com/sX7l4Ym.jpeg",
    packages: [
      { name: "Standard Restoration", price: 100, description: "Full cleaning and UV sealing for both headlights. Charge is $100 a set." }
    ]
  },
  {
    id: "headlight-wrapping",
    title: "Headlight/Taillight Tinting",
    shortDescription: "Stylize and protect your vehicle's lights with our durable, tinted, or clear wrap films.",
    fullDescription: "Give your vehicle a custom look with our headlight and taillight tinting service. We use premium vinyl films available in various shades of smoke, stealth, or clear to protect your lenses from rock chips and road debris while adding a sleek, custom aesthetic.",
    image: "https://i.imgur.com/KLcun0m.jpeg",
    packages: [
      { name: "Premium Tint Set", price: 120, description: "Professional tint application for a set of lights. Charge is $120 per set." }
    ]
  }
];
