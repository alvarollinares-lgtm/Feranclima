
import React from 'react';
import { Aviso } from '../types';

interface RouteSummarySheetProps {
  avisos: Aviso[];
}

const RouteSummarySheet: React.FC<RouteSummarySheetProps> = ({ avisos }) => {
  return (
    <div className="p-10 bg-white text-black min-h-screen page-break border-8 border-slate-100">
      <div className="border-b-4 border-black pb-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tighter mb-1">HOJA DE RUTA - FERANCLIMA S.L.</h1>
          <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Resumen de Intervenciones Climatización</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div className="text-sm text-slate-500 font-bold uppercase">{avisos.length} AVISOS PROGRAMADOS</div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="border border-black p-3 text-left text-xs uppercase">Orden</th>
            <th className="border border-black p-3 text-left text-xs uppercase">Cliente / Teléfono</th>
            <th className="border border-black p-3 text-left text-xs uppercase">Dirección / Zona</th>
            <th className="border border-black p-3 text-left text-xs uppercase">Marca / Equipo</th>
            <th className="border border-black p-3 text-left text-xs uppercase">Horario</th>
            <th className="border border-black p-3 text-left text-xs uppercase">Notas / Estado</th>
          </tr>
        </thead>
        <tbody>
          {avisos.map((aviso, index) => (
            <tr key={aviso.id} className="border border-black">
              <td className="border border-black p-4 text-center font-black text-xl">{index + 1}</td>
              <td className="border border-black p-4">
                <div className="font-bold text-lg leading-tight">{aviso.nombre}</div>
                <div className="text-sm font-mono mt-1">{aviso.telefono1}</div>
              </td>
              <td className="border border-black p-4">
                <div className="font-bold leading-tight">{aviso.direccion}</div>
                <div className="text-xs uppercase font-bold text-slate-600 mt-1">{aviso.codigoPostal} - {aviso.poblacion}</div>
              </td>
              <td className="border border-black p-4">
                <div className="inline-block px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-black uppercase mb-1">{aviso.marca}</div>
                <div className="text-xs">{aviso.tipoAparato}</div>
              </td>
              <td className="border border-black p-4 text-sm font-bold text-center">
                {aviso.preferenciaHoraria}
              </td>
              <td className="border border-black p-4">
                <div className="w-full h-8 border-b border-dashed border-slate-300"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-12 grid grid-cols-2 gap-10">
        <div className="border-2 border-black p-6 rounded-xl">
          <h4 className="text-xs font-black uppercase mb-4 border-b border-black pb-2">Kilometraje y Combustible</h4>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-sm font-bold">KM Salida:</span>
              <span className="w-24 border-b border-black"></span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-sm font-bold">KM Llegada:</span>
              <span className="w-24 border-b border-black"></span>
            </div>
          </div>
        </div>
        <div className="border-2 border-black p-6 rounded-xl">
          <h4 className="text-xs font-black uppercase mb-4 border-b border-black pb-2">Validación Coordinador</h4>
          <div className="mt-8 border-t border-black pt-2 text-center text-[10px] font-bold uppercase text-slate-400">
            Firma y Sello FERANCLIMA S.L.
          </div>
        </div>
      </div>

      <div className="fixed bottom-10 left-10 right-10 flex justify-between text-[10px] font-bold text-slate-400 border-t pt-4">
        <span>© FERANCLIMA S.L. - MADRID</span>
        <span>HOJA DE RUTA GENERADA EL {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default RouteSummarySheet;
