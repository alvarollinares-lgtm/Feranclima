import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  PhoneCall, 
  Clock, 
  Wrench, 
  Award, 
  MessageSquare,
  Phone
} from 'lucide-react';
import { OFFICIAL_BRANDS, Aviso, Brand } from '../types';
import AvisoModal from '../components/AvisoModal';
import { BrandLogo } from '../components/BrandLogos';

interface BrandLandingProps {
  onNewAviso: (aviso: Aviso) => void;
}

const BrandLanding: React.FC<BrandLandingProps> = ({ onNewAviso }) => {
  const { brandId } = useParams<{ brandId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const currentBrand = OFFICIAL_BRANDS.find(b => b.toLowerCase() === brandId?.toLowerCase());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandId]);

  if (!currentBrand) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="animate-in fade-in duration-700">
      {/* Brand Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2069" 
            alt="Fondo Clima" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <Link to="/#marcas" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowRight className="rotate-180" size={16} /> Volver a Marcas
          </Link>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#004598] text-white px-4 py-2 rounded-full border border-white/20 font-black text-xs tracking-[0.2em] uppercase shadow-lg mb-6">
                <ShieldCheck size={16} className="text-blue-300" /> SERVICIO TÉCNICO OFICIAL
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Reparación {currentBrand} <span className="text-[#3b82f6]">Madrid</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light max-w-xl">
                Servicio técnico autorizado para equipos de aire acondicionado y aerotermia {currentBrand}. Garantía oficial, recambios originales y técnicos certificados por la marca.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Zap size={20} className="fill-current" />
                  SOLICITAR TÉCNICO {currentBrand.toUpperCase()}
                </button>
                <a
                  href="tel:+34691791206"
                  className="bg-white text-[#004598] hover:bg-blue-50 py-4 px-8 rounded-xl font-black shadow-lg transition-colors flex items-center justify-center gap-3 cursor-pointer"
                >
                  <PhoneCall size={20} />
                  LLAMAR AHORA
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-white p-12 rounded-[2rem] flex items-center justify-center shadow-2xl">
              <BrandLogo brand={currentBrand} className="w-full h-auto max-w-[250px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <Wrench className="text-[#004598] mb-6" size={40} />
              <h3 className="text-xl font-black mb-4">Averías {currentBrand}</h3>
              <p className="text-slate-600 leading-relaxed">
                Diagnóstico preciso con herramientas oficiales de {currentBrand}. Solución a códigos de error, fugas de gas y fallos electrónicos.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <Award className="text-[#004598] mb-6" size={40} />
              <h3 className="text-xl font-black mb-4">Garantía Oficial</h3>
              <p className="text-slate-600 leading-relaxed">
                Todas nuestras reparaciones cuentan con garantía por escrito y utilizamos exclusivamente repuestos originales {currentBrand}.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <Clock className="text-[#004598] mb-6" size={40} />
              <h3 className="text-xl font-black mb-4">Rapidez y Eficacia</h3>
              <p className="text-slate-600 leading-relaxed">
                Intervención rápida en todo Madrid. Llevamos el stock de repuestos más habituales de {currentBrand} en el vehículo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AvisoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onNewAviso={onNewAviso} 
        initialBrand={currentBrand as Brand} 
      />

       {/* Mobile Floating Buttons - FIXED: No scale transforms */}
       <div 
        className="md:hidden fixed bottom-6 left-4 right-4 z-[9999] flex gap-4 no-print"
       >
        <a 
          href="tel:+34691791206"
          className="flex-1 bg-[#004598] text-white py-5 rounded-2xl font-black text-center shadow-2xl flex items-center justify-center gap-3 active:bg-blue-900 touch-manipulation cursor-pointer"
        >
          <Phone size={24} /> LLAMAR
        </a>
        <a 
          href="https://wa.me/34691791206" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 bg-[#25D366] text-white py-5 rounded-2xl font-black text-center shadow-2xl flex items-center justify-center gap-3 active:bg-[#128C7E] touch-manipulation"
        >
          <MessageSquare size={24} /> WHATSAPP
        </a>
      </div>
    </div>
  );
};

export default BrandLanding;