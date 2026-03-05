import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  CheckCircle2, 
  Wrench, 
  Zap, 
  Settings, 
  Award,
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Phone
} from 'lucide-react';
import { OFFICIAL_BRANDS, Aviso } from '../types';
import AvisoModal from '../components/AvisoModal';
import { BrandLogo, PanasonicLogo, FujitsuLogo, DaitsuLogo, HiyasuLogo, GeneralLogo, GreeLogo } from '../components/BrandLogos';

interface HomeProps {
  onNewAviso: (aviso: Aviso) => void;
}

const Home: React.FC<HomeProps> = ({ onNewAviso }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [hash]);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-[#004598] text-white overflow-hidden py-16 lg:py-28">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2069" 
            alt="Fondo Clima" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Logo Row - Texto SVG Limpio y Recto */}
          <div className="flex items-center justify-between max-w-4xl mx-auto mb-14 gap-4 md:gap-8">
            <div className="flex-1 flex justify-start">
              <div className="bg-white px-2 py-4 md:p-6 rounded-2xl shadow-2xl flex items-center justify-center w-full max-w-[200px] md:max-w-[280px] h-20 md:h-32 border border-slate-200 hover:scale-105 transition-transform duration-300">
                <PanasonicLogo />
              </div>
            </div>
            
            <div className="flex-shrink-0 hidden lg:block">
              <div className="inline-flex items-center gap-2 bg-[#004598] text-white px-4 py-3 rounded-full border border-white/20 font-black text-xs tracking-[0.2em] uppercase shadow-lg">
                <ShieldCheck size={18} className="text-blue-300" /> SAT OFICIAL
              </div>
            </div>

            <div className="flex-1 flex justify-end">
              <div className="bg-white px-2 py-4 md:p-6 rounded-2xl shadow-2xl flex items-center justify-center w-full max-w-[200px] md:max-w-[280px] h-20 md:h-32 border border-slate-200 hover:scale-105 transition-transform duration-300">
                <FujitsuLogo />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 md:mb-8 leading-tight tracking-tight max-w-4xl mx-auto">
            Servicio Técnico de <span className="text-[#3b82f6]">Climatización</span> Oficial
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Reparación urgente 24h, instalaciones certificadas y mantenimiento oficial en todo Madrid. Expertos en <span className="text-white font-bold">Panasonic</span> y <span className="text-white font-bold">Fujitsu</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16 md:mb-20">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-black py-5 px-10 rounded-2xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4 text-lg md:text-xl z-20 cursor-pointer"
            >
              <Zap size={24} className="fill-current" />
              SOLICITAR TÉCNICO
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="tel:+34691791206"
              className="relative w-full sm:w-auto flex items-center justify-center gap-4 bg-white text-[#004598] hover:bg-blue-50 px-8 py-5 rounded-2xl font-black text-xl md:text-2xl tracking-tighter z-20 group shadow-2xl border-2 border-white cursor-pointer"
            >
              <PhoneCall size={28} className="text-blue-600" />
              LLAMAR AHORA
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto border-t border-white/10 pt-12 md:pt-16 opacity-90">
            <div className="flex flex-col items-center gap-3">
              <Clock className="text-blue-400" size={36} />
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-center">Atención 24h</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Wrench className="text-blue-400" size={36} />
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-center">Recambios Originales</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <MapPin className="text-blue-400" size={36} />
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-center">Sede en Madrid</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Award className="text-blue-400" size={36} />
              <span className="text-xs md:text-sm font-black uppercase tracking-widest text-center">SAT Oficial</span>
            </div>
          </div>
        </div>
      </section>

      <AvisoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onNewAviso={onNewAviso} />

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Soluciones de Climatización</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Servicio técnico oficial para sistemas domésticos e industriales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-10 hover:bg-[#004598] hover:text-white transition-all duration-300 group shadow-lg border border-slate-100 hover:border-[#004598] hover:-translate-y-2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform">
                <Settings className="text-[#004598]" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Mantenimiento</h3>
              <p className="text-slate-500 font-medium group-hover:text-blue-100 leading-relaxed">
                Revisiones periódicas oficiales para alargar la vida útil de su equipo, optimizar el consumo y prevenir averías costosas.
              </p>
            </div>

            <div className="bg-[#004598] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-900/20 transform md:-translate-y-4 border border-blue-700 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Wrench size={120} />
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                <Wrench className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Reparación Urgente</h3>
              <p className="text-blue-100 font-medium leading-relaxed mb-8">
                Diagnóstico y reparación inmediata de averías en aire acondicionado y aerotermia. Asistencia prioritaria 24h en Madrid.
              </p>
              <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                Solicitar Técnico <ArrowRight size={16} />
              </button>
            </div>

            <div className="bg-slate-50 rounded-[2.5rem] p-10 hover:bg-[#004598] hover:text-white transition-all duration-300 group shadow-lg border border-slate-100 hover:border-[#004598] hover:-translate-y-2">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-[#004598]" size={32} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Instalación</h3>
              <p className="text-slate-500 font-medium group-hover:text-blue-100 leading-relaxed">
                Montaje certificado de equipos nuevos con garantía oficial. Asesoramiento técnico para elegir la mejor solución energética.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section id="marcas" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Marcas Oficiales</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Somos servicio técnico autorizado de los principales fabricantes.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {OFFICIAL_BRANDS.map((brand) => (
              <Link 
                key={brand}
                to={`/marca/${brand}`}
                className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center justify-center gap-6 group border border-slate-100"
              >
                <div className="w-full h-16 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <BrandLogo brand={brand} className="w-full h-full" />
                </div>
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-[#004598] transition-colors">
                   <ArrowRight className="text-slate-400 group-hover:text-white transition-colors" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-[#004598] py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight max-w-3xl mx-auto">
            ¿Necesita asistencia técnica inmediata?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#004598] hover:bg-slate-100 font-black py-5 px-10 rounded-2xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
              <Zap size={24} /> SOLICITAR AVISO ONLINE
            </button>
            <a 
              href="tel:+34691791206"
              className="bg-transparent border-2 border-white/30 hover:border-white text-white font-black py-5 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg hover:bg-white/10"
            >
              <PhoneCall size={24} /> 691 791 206
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Floating Buttons - FIXED: No scale transforms to ensure reliable tapping */}
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

export default Home;