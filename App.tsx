import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Menu,
  X,
  Lock
} from 'lucide-react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import BrandLanding from './pages/BrandLanding';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';
import { Aviso } from './types';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link to="/" className="flex flex-col group">
              <span className="text-4xl md:text-5xl font-panasonic text-[#004598] leading-none transition-transform group-hover:scale-[1.01]">Feranclima</span>
              <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-700 font-black mt-1">Servicio Técnico Oficial</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-600 hover:text-[#004598] font-semibold transition-colors">Inicio</Link>
            <Link to="/#servicios" className="text-slate-600 hover:text-[#004598] font-semibold transition-colors">Servicios</Link>
            <Link to="/#marcas" className="text-slate-600 hover:text-[#004598] font-semibold transition-colors">Marcas</Link>
            {/* Solo mostramos el enlace al Panel si el usuario está autenticado */}
            {isAuthenticated && (
              <Link to="/admin" className="text-[#004598] font-black transition-colors uppercase text-xs tracking-widest border border-blue-200 px-3 py-1 rounded-full">
                Panel Coordinador
              </Link>
            )}
            <div className="flex items-center gap-4">
              <a
                href="tel:+34691791206"
                className="flex items-center gap-2 bg-[#004598] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md"
              >
                <Phone size={18} /> Llamar ahora
              </a>
              <a 
                href="https://wa.me/34691791206" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#128C7E] transition-all shadow-lg shadow-green-100"
              >
                <MessageSquare size={18} /> WhatsApp
              </a>
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 focus:outline-none" aria-label="Menú">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-8 flex flex-col space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-bold py-3 border-b border-slate-50">Inicio</Link>
          <Link to="/#servicios" onClick={() => setIsOpen(false)} className="text-lg font-bold py-3 border-b border-slate-50">Servicios</Link>
          <Link to="/#marcas" onClick={() => setIsOpen(false)} className="text-lg font-bold py-3 border-b border-slate-50">Marcas</Link>
          {isAuthenticated && (
            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg font-bold py-3 border-b border-slate-50 text-[#004598]">Panel Coordinador</Link>
          )}
          <div className="flex flex-col gap-3 pt-4">
            <a 
              href="tel:+34691791206"
              className="flex items-center justify-center gap-3 bg-[#004598] text-white px-4 py-5 rounded-2xl font-black shadow-xl active:bg-blue-900 w-full"
            >
              <Phone size={22} /> LLAMAR AHORA
            </a>
            <a 
              href="https://wa.me/34691791206" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-4 py-5 rounded-2xl font-black shadow-xl"
            >
              <MessageSquare size={22} /> WHATSAPP TÉCNICO
            </a>
            
            {/* Enlace Login debajo de WhatsApp */}
            <div className="pt-4 text-center border-t border-slate-100 mt-2">
               <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Lock size={14} /> Acceso Coordinador
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div>
            <h3 className="text-3xl md:text-4xl font-panasonic text-white mb-6 tracking-tight">Feranclima S.L.</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              Especialistas en aire acondicionado, bomba de calor y aerotermia en Madrid. <strong className="text-white">Servicio técnico oficial</strong> con repuestos originales y técnicos certificados por el fabricante.
            </p>
            <div className="flex gap-4">
              <ShieldCheck className="text-[#004598]" size={32} />
              <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">SAT Oficial Especialistas en Eficiencia Energética</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-slate-300">Zonas de Actuación</h4>
            <ul className="text-slate-400 space-y-3 text-sm font-medium">
              <li>• Madrid Capital (Distrito Latina y alrededores)</li>
              <li>• Aluche, Campamento y Carabanchel</li>
              <li>• Pozuelo de Alarcón y Boadilla</li>
              <li>• Móstoles, Alcorcón y Leganés</li>
              <li>• Getafe, Fuenlabrada y Parla</li>
              <li>• Toda la Comunidad de Madrid</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-slate-300">Contacto Directo</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-[#004598] mt-1 flex-shrink-0" size={24} />
                <p className="text-slate-400 font-medium">Calle Escalona, 69<br />28024, Madrid</p>
              </div>
              <a 
                href="tel:+34691791206"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <Phone className="text-[#004598] flex-shrink-0" size={20} />
                </div>
                <span className="text-slate-400 font-bold group-hover:text-white transition-colors text-left">
                  Llamar ahora
                </span>
              </a>
              <a 
                href="https://wa.me/34691791206" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                  <MessageSquare className="text-[#25D366] flex-shrink-0" size={20} />
                </div>
                <span className="text-slate-400 font-bold group-hover:text-white transition-colors text-left">
                  WhatsApp Técnico
                </span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} Feranclima S.L. - Todos los derechos reservados.</p>
          <Link to="/login" className="hover:text-white transition-colors flex items-center gap-2">
            <Lock size={14} /> Acceso Coordinador
          </Link>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [avisos, setAvisos] = useState<Aviso[]>(() => {
    try {
      const saved = localStorage.getItem('avisos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing avisos from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('avisos', JSON.stringify(avisos));
  }, [avisos]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNewAviso = (aviso: Aviso) => {
    setAvisos(prev => [aviso, ...prev]);
  };

  const handleUpdateAviso = (id: string, updates: Partial<Aviso>) => {
    setAvisos(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleDeleteAviso = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este aviso?')) {
      setAvisos(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header isAuthenticated={isAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onNewAviso={handleNewAviso} />} />
            <Route path="/marca/:brandId" element={<BrandLanding onNewAviso={handleNewAviso} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <Admin 
                    avisos={avisos} 
                    onUpdateAviso={handleUpdateAviso} 
                    onDeleteAviso={handleDeleteAviso}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </main>
        <Footer />
        <Chatbot onNewAviso={handleNewAviso} />
      </div>
    </HashRouter>
  );
};

export default App;