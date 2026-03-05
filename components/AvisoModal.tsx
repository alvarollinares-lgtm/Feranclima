
import React, { useState } from 'react';
import { X, Zap, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_BRANDS, DEVICE_TYPES, Aviso, Brand, DeviceType, TimePreference } from '../types';

interface AvisoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewAviso: (aviso: Aviso) => void;
  initialBrand?: Brand;
}

const AvisoModal: React.FC<AvisoModalProps> = ({ isOpen, onClose, onNewAviso, initialBrand }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono1: '',
    telefono2: '',
    email: '',
    direccion: '',
    portalPiso: '',
    codigoPostal: '',
    poblacion: '',
    marca: initialBrand || 'Fujitsu' as Brand,
    tipoAparato: 'Split Pared' as DeviceType,
    descripcion: '',
    preferenciaHoraria: 'Mañanas (9-14h)' as TimePreference
  });

  if (!isOpen) return null;

  const handleZipCode = (zip: string) => {
    setFormData(prev => ({ ...prev, codigoPostal: zip }));
    if (zip.startsWith('280')) setFormData(prev => ({ ...prev, poblacion: 'Madrid' }));
    else if (zip.startsWith('28100')) setFormData(prev => ({ ...prev, poblacion: 'Alcobendas' }));
    else if (zip.startsWith('2893')) setFormData(prev => ({ ...prev, poblacion: 'Móstoles' }));
    else if (zip.startsWith('2822')) setFormData(prev => ({ ...prev, poblacion: 'Pozuelo de Alarcón' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAviso: Aviso = {
      ...formData,
      id: `AV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fechaEntrada: new Date().toISOString(),
      estado: 'Pendiente'
    };
    onNewAviso(newAviso);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        nombre: '',
        telefono1: '',
        telefono2: '',
        email: '',
        direccion: '',
        portalPiso: '',
        codigoPostal: '',
        poblacion: '',
        marca: initialBrand || 'Fujitsu',
        tipoAparato: 'Split Pared',
        descripcion: '',
        preferenciaHoraria: 'Mañanas (9-14h)'
      });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 sm:p-12">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
                <CheckCircle2 size={56} />
              </div>
              <h3 className="text-3xl font-bold mb-4">¡Aviso Registrado!</h3>
              <p className="text-slate-600 text-lg max-w-md mx-auto">
                Hemos recibido su solicitud correctamente en Feranclima S.L. Un técnico se pondrá en contacto con usted en breve.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 mb-2">Solicitar Técnico {initialBrand && `para ${initialBrand}`}</h2>
                <p className="text-slate-500 font-medium">Formulario de aviso para reparaciones de aire acondicionado, bomba de calor o aerotermia.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Nombre del Titular</label>
                    <input 
                      required
                      type="text" 
                      value={formData.nombre}
                      onChange={e => setFormData({...formData, nombre: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Teléfono de Contacto</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.telefono1}
                      onChange={e => setFormData({...formData, telefono1: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg"
                      placeholder="917 11 55 22"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Dirección de la Visita</label>
                    <input 
                      required
                      type="text" 
                      value={formData.direccion}
                      onChange={e => setFormData({...formData, direccion: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg"
                      placeholder="Calle Escalona, Número..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">C. Postal</label>
                    <input 
                      required
                      type="text" 
                      maxLength={5}
                      value={formData.codigoPostal}
                      onChange={e => handleZipCode(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg"
                      placeholder="28024"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Marca del Equipo</label>
                    <select 
                      value={formData.marca}
                      onChange={e => setFormData({...formData, marca: e.target.value as Brand})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg appearance-none cursor-pointer"
                    >
                      {OFFICIAL_BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Preferencia Horaria</label>
                    <select 
                      value={formData.preferenciaHoraria}
                      onChange={e => setFormData({...formData, preferenciaHoraria: e.target.value as any})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg appearance-none cursor-pointer"
                    >
                      <option value="Mañanas (9-14h)">Mañanas (9-14h)</option>
                      <option value="Tardes (16-19h)">Tardes (16-19h)</option>
                      <option value="Indiferente">Indiferente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Descripción del Problema</label>
                  <textarea 
                    required
                    rows={3}
                    value={formData.descripcion}
                    onChange={e => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all text-lg"
                    placeholder="Ej: Aire Fujitsu gotea o Aerotermia marca error..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-4 text-xl transform active:scale-95"
                >
                  <Zap size={24} className="fill-current" />
                  ENVIAR AVISO A TÉCNICOS
                </button>
                
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                  Feranclima S.L. • Especialistas en Bombas de Calor • Madrid
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvisoModal;
