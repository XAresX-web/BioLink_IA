import React from 'react';
import { LayoutDashboard, Link, BadgeDollarSign, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

export default function Sidebar({ menuOpen, toggleMenu }) {
  return (
    <aside
      className={`md:w-64 w-full md:block ${menuOpen ? 'block' : 'hidden'} md:relative absolute bg-gray-100 border-r border-gray-200 p-6 z-50`}
    >
      <h1 className="text-2xl font-bold mb-6">
        BioLink<span className="text-gray-500"> IA</span>
        <sup className="text-xs ml-1 text-gray-400">PRO</sup>
      </h1>
      <nav className="space-y-4">
        <button className="flex items-center gap-2 text-sm font-medium text-black bg-gray-200 px-4 py-2 rounded">
          <LayoutDashboard size={16} /> Panel
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
          <Link size={16} /> Enlaces
        </button>
        <button
          onClick={() => navigate('/precios')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <BadgeDollarSign size={16} /> Planes
        </button>
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
          <Settings size={16} /> Ajustes
        </button>
      </nav>
    </aside>
  );
}
