import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Link,
  BadgeDollarSign,
  Settings,
  Moon,
  Sun,
  Menu,
  Store,
  BarChart3,
  ShoppingCart,
  FileLock2,
} from 'lucide-react';

export default function Sidebar({ menuOpen, toggleMenu, darkMode, toggleDarkMode, plan }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`md:w-64 w-full md:block ${
        menuOpen ? 'block' : 'hidden'
      } md:fixed md:top-0 md:left-0 md:h-screen absolute bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 p-6 z-50 transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8 text-center">
        BioLink<span className="text-primary font-bold"> IA</span>
        <sup
          className={`text-xs ml-1 font-bold ${
            plan === 'free'
              ? 'text-green-400 animate-glow-free'
              : plan === 'pro'
                ? 'text-yellow-400 animate-glow-pro'
                : 'text-gray-400'
          }`}
        >
          {plan === 'free' ? 'FREE' : 'PRO'}
        </sup>
      </h1>
      {/* User Info */}
      <div className="flex items-center gap-3 mb-6">
        <img src="/avatar.png" alt="Usuario" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-medium text-gray-800 dark:text-white">Luis Sánchez</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
        </div>
      </div>

      {/* Sección principal */}
      <div className="mb-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Principal</p>
        <nav className="space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition ${
              isActive('/dashboard')
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            Panel
          </button>

          <button
            onClick={() => navigate('/enlaces')}
            className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition ${
              isActive('/enlaces')
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
            }`}
          >
            <Link size={18} />
            Enlaces
          </button>
        </nav>
      </div>

      {/* Cuenta */}
      <div className="mt-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Cuenta</p>
        <nav className="space-y-2">
          <button
            onClick={() => navigate('/precios')}
            className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition ${
              isActive('/precios')
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
            }`}
          >
            <BadgeDollarSign size={18} />
            Planes
          </button>

          <button
            onClick={() => navigate('/ajustes')}
            className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition ${
              isActive('/ajustes')
                ? 'bg-primary text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'
            }`}
          >
            <Settings size={18} />
            Ajustes
          </button>

          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white px-4 py-2 rounded-lg transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </nav>
      </div>

      {/* Tienda Pro */}
      <div className="mt-6">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tienda</p>
        <div className="space-y-2">
          <details
            className={`group rounded-lg ${
              plan === 'pro'
                ? 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <summary
              className={`w-full flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg transition list-none ${
                plan === 'pro'
                  ? 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'
                  : 'text-gray-400'
              }`}
            >
              <Store size={18} />
              Tienda Digital
            </summary>

            {plan === 'pro' && (
              <nav className="ml-7 mt-2 flex flex-col gap-2">
                <button
                  onClick={() => navigate('/tienda')}
                  className={`text-left text-sm font-medium px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
                    isActive('/tienda') ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  📊 Panel
                </button>
                <button
                  onClick={() => navigate('/ventas')}
                  className={`text-left text-sm font-medium px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
                    isActive('/ventas') ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  📈 Ventas
                </button>
                <button
                  onClick={() => navigate('/productos')}
                  className={`text-left text-sm font-medium px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
                    isActive('/productos') ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  🛍️ Productos
                </button>
                <button
                  onClick={() => navigate('/contenido-18')}
                  className={`text-left text-sm font-medium px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
                    isActive('/contenido-18') ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  🔞 Contenido +18
                </button>
              </nav>
            )}

            {plan !== 'pro' && (
              <div className="ml-7 mt-2 text-xs text-red-400 italic">
                Función exclusiva de usuarios PRO
              </div>
            )}
          </details>
        </div>
      </div>
    </aside>
  );
}
