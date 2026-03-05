
import React from 'react';
import { Aviso } from '../types';

interface PrintableSheetProps {
  aviso: Aviso;
}

// Fixed: Added component definition and default export to resolve import error in Admin.tsx
const PrintableSheet: React.FC<PrintableSheetProps> = ({ aviso }) => {
  return (
    <div className="p-12 bg-white text-black min-h-screen page-break">
      <div className="border-b-4 border-black pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-1">FERANCLIMA S.L.</h1>
          <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Servicio Técnico Aire Acondicionado y Aerotermia</p>
          <p className="text-[10px] text-slate-500 font-medium">Calle Escalona, 69, 28024, Madrid - Tel: 691 791 206</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">PARTE DE TRABAJO</div>
          <div className="text-sm font-mono">{aviso.id}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border-2 border-black p-4">
          <div className="text-[10px] font-bold uppercase mb-2 bg-black text-white px-2 py-0.5 inline-block">Datos del Cliente</div>
          <div className="space-y-1">
            <div className="text-xl font-bold">{aviso.nombre}</div>
            <div className="text-lg">{aviso.direccion}</div>
            <div className="text-lg font-bold">{aviso.codigoPostal} - {aviso.poblacion}</div>
            <div className="pt-2 text-2xl font-bold underline decoration-2">{aviso.telefono1} {aviso.telefono2 ? ` / ${aviso.telefono2}` : ''}</div>
            <div className="text-sm italic">{aviso.email}</div>
          </div>
        </div>
        <div className="border-2 border-black p-4">
          <div className="text-[10px] font-bold uppercase mb-2 bg-black text-white px-2 py-0.5 inline-block">Información Técnica</div>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-bold block">MARCA</span>
              <span className="text-2xl font-black uppercase">{aviso.marca}</span>
            </div>
            <div>
              <span className="text-xs font-bold block">EQUIPO</span>
              <span className="text-lg">{aviso.tipoAparato}</span>
            </div>
            <div>
              <span className="text-xs font-bold block">HORARIO PREFERENTE</span>
              <span className="text-sm font-bold">{aviso.preferenciaHoraria}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-black p-4 mb-8">
        <div className="text-[10px] font-bold uppercase mb-2 bg-black text-white px-2 py-0.5 inline-block">Descripción de la Avería (Reportado por cliente)</div>
        <p className="text-lg leading-snug">{aviso.descripcion}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <div className="border-2 border-black p-4 min-h-[200px]">
          <div className="text-[10px] font-bold uppercase mb-2 border border-black px-2 py-0.5 inline-block">Diagnóstico y Trabajo Realizado</div>
        </div>
        <div className="border-2 border-black p-4 min-h-[150px]">
          <div className="text-[10px] font-bold uppercase mb-2 border border-black px-2 py-0.5 inline-block">Materiales / Recambios Utilizados</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-8">
        <div className="border-t border-black pt-4">
          <div className="text-[10px] font-bold uppercase mb-12">Firma del Técnico</div>
          <div className="text-xs text-slate-500">Feranclima S.L. - Madrid</div>
        </div>
        <div className="border-t border-black pt-4">
          <div className="text-[10px] font-bold uppercase mb-12">Firma del Cliente</div>
          <div className="text-xs text-slate-500">Conformidad del servicio realizado</div>
        </div>
      </div>
    </div>
  );
};

export default PrintableSheet;
