import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, KeyRound } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciales sencillas para el prototipo
    if (username === 'admin' && password === 'feranclima2024') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="bg-[#004598] p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">ACCESO COORDINADOR</h2>
            <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mt-2">Feranclima S.L.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold text-center border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#004598] focus:bg-white transition-all font-semibold text-slate-900"
                placeholder="Identificador"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#004598] focus:bg-white transition-all font-semibold text-slate-900"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#004598] hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            ENTRAR AL SISTEMA
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="px-8 pb-8">
           <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <KeyRound className="text-slate-400 flex-shrink-0 mt-1" size={16} />
              <div className="text-xs text-slate-600">
                <p className="font-bold mb-1 uppercase tracking-wider text-slate-400">Credenciales Demo:</p>
                <p>Usuario: <span className="font-mono font-bold text-slate-800 bg-white px-1 rounded border border-slate-200">admin</span></p>
                <p className="mt-1">Clave: <span className="font-mono font-bold text-slate-800 bg-white px-1 rounded border border-slate-200">feranclima2024</span></p>
              </div>
           </div>
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Área restringida • Solo personal autorizado</p>
        </div>
      </div>
    </div>
  );
};

export default Login;