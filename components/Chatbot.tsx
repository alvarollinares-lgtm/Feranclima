import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { jsPDF } from 'jspdf';
import { Aviso, Brand, DeviceType, TimePreference } from '../types';

interface ChatbotProps {
  onNewAviso: (aviso: Aviso) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ onNewAviso }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Soy Sara, tu asistente virtual de Feranclima. ¿En qué puedo ayudarte hoy? Si tienes una avería, puedo tomar nota de tu aviso.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize Gemini API
  // Vite expone variables que empiezan por VITE_ en import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  // Si en desarrollo/producción por algún motivo necesitamos fallback:
  const finalApiKey = apiKey || (typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : '');
  
  const ai = finalApiKey ? new GoogleGenAI({ apiKey: finalApiKey }) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const registrarAvisoDeclaration: FunctionDeclaration = {
    name: 'registrar_aviso',
    description: 'Registra un nuevo aviso de avería de un cliente. Usa esta función cuando el cliente haya proporcionado todos los datos necesarios.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        nombre: { type: Type.STRING, description: 'Nombre completo del cliente' },
        telefono1: { type: Type.STRING, description: 'Teléfono de contacto principal' },
        direccion: { type: Type.STRING, description: 'Dirección completa de la visita' },
        codigoPostal: { type: Type.STRING, description: 'Código postal (5 dígitos)' },
        poblacion: { type: Type.STRING, description: 'Población o ciudad' },
        marca: { type: Type.STRING, description: 'Marca del equipo (Panasonic, Fujitsu, Daitsu, Hiyasu, General, Gree)' },
        tipoAparato: { type: Type.STRING, description: 'Tipo de aparato (Split Pared, Conductos, Cassette, Aerotermia, Multi-Split, Otro)' },
        descripcion: { type: Type.STRING, description: 'Descripción detallada de la avería' },
        preferenciaHoraria: { type: Type.STRING, description: 'Preferencia horaria (Mañanas (9-14h), Tardes (16-19h), Indiferente)' },
      },
      required: ['nombre', 'telefono1', 'direccion', 'codigoPostal', 'poblacion', 'marca', 'tipoAparato', 'descripcion', 'preferenciaHoraria']
    }
  };

  const generatePDF = (aviso: Aviso): string => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text('FERANCLIMA - PARTE DE TRABAJO', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`ID Aviso: ${aviso.id}`, 20, 30);
    doc.text(`Fecha: ${new Date(aviso.fechaEntrada).toLocaleString()}`, 20, 38);
    
    doc.setFontSize(16);
    doc.text('Datos del Cliente', 20, 50);
    doc.setFontSize(12);
    doc.text(`Nombre: ${aviso.nombre}`, 20, 60);
    doc.text(`Teléfono: ${aviso.telefono1}`, 20, 68);
    doc.text(`Dirección: ${aviso.direccion}`, 20, 76);
    doc.text(`C.P. y Población: ${aviso.codigoPostal} - ${aviso.poblacion}`, 20, 84);
    
    doc.setFontSize(16);
    doc.text('Información Técnica', 20, 100);
    doc.setFontSize(12);
    doc.text(`Marca: ${aviso.marca}`, 20, 110);
    doc.text(`Equipo: ${aviso.tipoAparato}`, 20, 118);
    doc.text(`Preferencia Horaria: ${aviso.preferenciaHoraria}`, 20, 126);
    
    doc.setFontSize(16);
    doc.text('Descripción de la Avería', 20, 142);
    doc.setFontSize(12);
    const splitDesc = doc.splitTextToSize(aviso.descripcion, 170);
    doc.text(splitDesc, 20, 152);
    
    return doc.output('datauristring');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!ai) {
        setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, el servicio de asistencia no está disponible en este momento (Falta clave API).' }]);
        setIsLoading(false);
        return;
      }

      // Build conversation history for context
      const historyText = messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Sara'}: ${m.text}`).join('\n');
      const prompt = `
        Eres Sara, la asistente virtual de Feranclima, un Servicio Técnico Oficial de climatización en Madrid.
        Tu objetivo es ayudar a los clientes y, si tienen una avería, recopilar sus datos para registrar un aviso.
        
        Para registrar un aviso necesitas:
        - Nombre completo
        - Teléfono
        - Dirección completa
        - Código Postal y Población
        - Marca del equipo (Panasonic, Fujitsu, Daitsu, Hiyasu, General, Gree)
        - Tipo de aparato (Split Pared, Conductos, Cassette, Aerotermia, Multi-Split, Otro)
        - Descripción de la avería
        - Preferencia horaria (Mañanas (9-14h), Tardes (16-19h), Indiferente)
        
        Pide los datos poco a poco, de forma conversacional y amable. No pidas todo de golpe.
        Cuando tengas TODOS los datos, llama a la función registrar_aviso.
        
        Historial de la conversación:
        ${historyText}
        Cliente: ${userMessage}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ functionDeclarations: [registrarAvisoDeclaration] }],
          temperature: 0.7,
        }
      });

      const functionCalls = response.functionCalls;
      
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === 'registrar_aviso') {
          const args = call.args as any;
          
          const newAviso: Aviso = {
            id: `AV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            fechaEntrada: new Date().toISOString(),
            nombre: args.nombre,
            telefono1: args.telefono1,
            email: '',
            direccion: args.direccion,
            codigoPostal: args.codigoPostal,
            poblacion: args.poblacion,
            marca: args.marca as Brand,
            tipoAparato: args.tipoAparato as DeviceType,
            descripcion: args.descripcion,
            preferenciaHoraria: args.preferenciaHoraria as TimePreference,
            estado: 'Pendiente'
          };

          // 1. Add to local state
          onNewAviso(newAviso);

          // 2. Generate PDF
          const pdfBase64 = generatePDF(newAviso);

          // 3. Send to backend to email/whatsapp
          try {
            await fetch('/api/send-aviso', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ aviso: newAviso, pdfBase64 })
            });
          } catch (e) {
            console.error("Failed to send to backend", e);
          }

          setMessages(prev => [...prev, { 
            role: 'model', 
            text: `¡Perfecto! He registrado tu aviso con el número de seguimiento ${newAviso.id}. Ya he enviado el parte de trabajo en PDF al responsable técnico por WhatsApp y correo electrónico para que asigne a un técnico lo antes posible. ¿Puedo ayudarte con algo más?` 
          }]);
        }
      } else if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      }

    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo o llama al 91 000 00 00.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[90] bg-white p-1 rounded-full shadow-2xl shadow-cyan-200/50 hover:scale-110 active:scale-95 transition-all group no-print ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Abrir chat con Sara"
      >
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80" 
            alt="Sara" 
            className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Habla con Sara
        </span>
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-28 md:bottom-24 right-4 md:right-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-cyan-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=150&h=150&q=80" 
                  alt="Sara" 
                  className="w-10 h-10 rounded-full object-cover border border-white/50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border border-cyan-600 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold">Sara</h3>
                <p className="text-xs text-cyan-100">Asistente Virtual Feranclima</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-br-sm' 
                    : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-800 shadow-sm border border-slate-100 rounded-2xl rounded-bl-sm p-3 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-cyan-600" />
                  <span className="text-xs text-slate-500">Sara está escribiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent outline-none text-sm py-1"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-cyan-600 hover:text-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed p-1"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
