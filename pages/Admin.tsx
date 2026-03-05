
import React, { useState } from 'react';
import { 
  Printer, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Filter, 
  User,
  MapPin,
  Smartphone,
  CheckSquare,
  Square,
  Layout,
  LogOut
} from 'lucide-react';
import { Aviso } from '../types';
import PrintableSheet from '../components/PrintableSheet';
import RouteSummarySheet from '../components/RouteSummarySheet';

interface AdminProps {
  avisos: Aviso[];
  onUpdateAviso: (id: string, updates: Partial<Aviso>) => void;
  onDeleteAviso: (id: string) => void;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ avisos, onUpdateAviso, onDeleteAviso, onLogout }) => {
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [printQueue, setPrintQueue] = useState<Aviso[]>([]);
  const [includeSummary, setIncludeSummary] = useState(true);

  const filteredAvisos = avisos.filter(aviso => {
    const brandMatch = filterBrand === 'all' || aviso.marca === filterBrand;
    const statusMatch = filterStatus === 'all' || aviso.estado === filterStatus;
    return brandMatch && statusMatch;
  });

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAvisos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAvisos.map(a => a.id)));
    }
  };

  const handlePrintSingle = (aviso: Aviso) => {
    setPrintQueue([aviso]);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintSelected = () => {
    const selectedAvisos = filteredAvisos.filter(a => selectedIds.has(a.id));
    if (selectedAvisos.length === 0) return;
    setPrintQueue(selectedAvisos);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintAllFiltered = () => {
    if (filteredAvisos.length === 0) return;
    setPrintQueue(filteredAvisos);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="no-print max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">Panel de Coordinación</h1>
            <p className="text-slate-500 font-medium">Gestión de avisos técnicos y rutas para Feranclima S.L.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            {/* Bulk Actions Indicator */}
            {selectedIds.size > 0 && (
              <div className="flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl animate-in slide-in-from-right-10 border border-slate-700">
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Seleccionados</span>
                  <span className="text-lg font-black">{selectedIds.size} Avisos</span>
                </div>
                
                <div className="h-10 w-px bg-slate-700 mx-2"></div>

                <div className="flex gap-2">
                  <label className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      checked={includeSummary} 
                      onChange={e => setIncludeSummary(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-xs font-bold uppercase">Hoja de Ruta</span>
                  </label>
                  
                  <button 
                    onClick={handlePrintSelected}
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all shadow-lg shadow-cyan-900/20"
                  >
                    <Printer size={16} /> Imprimir Ruta
                  </button>
                </div>
              </div>
            )}

            {!selectedIds.size && (
              <div className="flex flex-wrap gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-xl">
                  <Filter size={16} className="text-slate-400" />
                  <select 
                    className="bg-transparent text-sm font-semibold outline-none py-2 cursor-pointer"
                    value={filterBrand}
                    onChange={e => setFilterBrand(e.target.value)}
                  >
                    <option value="all">Todas las Marcas</option>
                    <option value="Panasonic">Panasonic</option>
                    <option value="Fujitsu">Fujitsu</option>
                    <option value="Daitsu">Daitsu</option>
                    <option value="Hiyasu">Hiyasu</option>
                    <option value="General">General</option>
                    <option value="Gree">Gree</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-xl">
                  <Clock size={16} className="text-slate-400" />
                  <select 
                    className="bg-transparent text-sm font-semibold outline-none py-2 cursor-pointer"
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Asignado">Asignados</option>
                    <option value="Finalizado">Finalizados</option>
                  </select>
                </div>

                <button 
                  onClick={handlePrintAllFiltered}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-black uppercase hover:bg-slate-800 transition-all shadow-md"
                >
                  <Printer size={16} /> Imprimir Filtrados
                </button>
              </div>
            )}
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-black uppercase hover:bg-red-100 transition-all ml-2"
              title="Cerrar Sesión"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-5 w-10">
                    <button onClick={toggleSelectAll} className="text-slate-400 hover:text-cyan-600 transition-colors">
                      {selectedIds.size === filteredAvisos.length && filteredAvisos.length > 0 ? <CheckSquare size={22} className="text-cyan-600" /> : <Square size={22} />}
                    </button>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identificación</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Cliente y Contacto</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Ubicación / CP</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Equipamiento</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAvisos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                          <Layout size={32} />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No hay avisos para mostrar</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAvisos.map(aviso => (
                    <tr key={aviso.id} className={`hover:bg-slate-50 transition-colors group ${selectedIds.has(aviso.id) ? 'bg-cyan-50/40' : ''}`}>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleSelect(aviso.id)} className="text-slate-400 hover:text-cyan-600 transition-colors">
                          {selectedIds.has(aviso.id) ? <CheckSquare size={22} className="text-cyan-600" /> : <Square size={22} />}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-black text-slate-900">{new Date(aviso.fechaEntrada).toLocaleDateString('es-ES')}</div>
                        <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">{aviso.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <User size={14} className="text-slate-400" />
                          <div className="text-sm font-bold text-slate-900">{aviso.nombre}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone size={14} className="text-slate-400" />
                          <div className="text-xs text-slate-500 font-black">{aviso.telefono1}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={14} className="text-slate-400" />
                          <div className="text-sm text-slate-800 font-medium line-clamp-1">{aviso.direccion}</div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase ml-6">{aviso.codigoPostal} - {aviso.poblacion}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="inline-block px-2 py-0.5 rounded-md bg-cyan-100 border border-cyan-200 text-cyan-800 text-[10px] font-black uppercase mb-1">{aviso.marca}</div>
                        <div className="text-xs text-slate-500 font-medium">{aviso.tipoAparato}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => onUpdateAviso(aviso.id, { estado: aviso.estado === 'Finalizado' ? 'Pendiente' : 'Finalizado' })}
                            className={`p-2.5 rounded-xl transition-all ${aviso.estado === 'Finalizado' ? 'bg-green-100 text-green-600 shadow-sm' : 'bg-slate-100 text-slate-400 hover:bg-white hover:text-cyan-600 hover:shadow-md'}`}
                            title="Cambiar estado"
                          >
                            <CheckCircle size={20} />
                          </button>
                          <button 
                            onClick={() => handlePrintSingle(aviso)}
                            className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all hover:shadow-lg"
                            title="Imprimir Hoja Individual"
                          >
                            <Printer size={20} />
                          </button>
                          <button 
                            onClick={() => onDeleteAviso(aviso.id)}
                            className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all hover:shadow-md"
                            title="Eliminar aviso"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Printing Portals */}
      {printQueue.length > 0 && (
        <div className="print-only">
          {includeSummary && printQueue.length > 1 && <RouteSummarySheet avisos={printQueue} />}
          {printQueue.map((aviso) => (
            <PrintableSheet key={aviso.id} aviso={aviso} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
