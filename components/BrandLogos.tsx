import React from 'react';

// Logo Panasonic: Texto SVG nativo para legibilidad perfecta 100% garantizada
export const PanasonicLogo = () => (
  <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <text x="50%" y="75%" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="80" fill="#004598" letterSpacing="-2">Panasonic</text>
  </svg>
);

// Logo Fujitsu: Texto SVG nativo para legibilidad perfecta 100% garantizada
export const FujitsuLogo = () => (
  <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <text x="50%" y="75%" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="80" fill="#ED1C24" letterSpacing="0">FUJITSU</text>
  </svg>
);

// Logo Daitsu
export const DaitsuLogo = () => (
  <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <text x="50%" y="75%" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="80" fill="#005b9f" letterSpacing="-1">DAITSU</text>
  </svg>
);

// Logo Hiyasu
export const HiyasuLogo = () => (
  <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <text x="50%" y="75%" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="80" fill="#0a3b7c" letterSpacing="1">HIYASU</text>
  </svg>
);

// Logo General
export const GeneralLogo = () => (
  <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <text x="50%" y="75%" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="80" fill="#e3000f" letterSpacing="0">GENERAL</text>
  </svg>
);

// Logo Gree
export const GreeLogo = () => (
  <svg viewBox="0 0 500 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <text x="50%" y="75%" textAnchor="middle" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontWeight="900" fontSize="80" fill="#0066b3" letterSpacing="-1">GREE</text>
  </svg>
);

export const BrandLogo = ({ brand, className = "" }: { brand: string, className?: string }) => {
  switch (brand) {
    case 'Panasonic': return <div className={className}><PanasonicLogo /></div>;
    case 'Fujitsu': return <div className={className}><FujitsuLogo /></div>;
    case 'Daitsu': return <div className={className}><DaitsuLogo /></div>;
    case 'Hiyasu': return <div className={className}><HiyasuLogo /></div>;
    case 'General': return <div className={className}><GeneralLogo /></div>;
    case 'Gree': return <div className={className}><GreeLogo /></div>;
    default: return <span className="text-2xl font-black text-slate-700">{brand}</span>;
  }
};
