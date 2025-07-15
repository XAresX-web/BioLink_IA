import React from 'react';
import { Eye, MousePointerClick } from 'lucide-react';

export default function StatsPanel({ views = 0, clicks = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Vistas totales */}
      <div className="flex items-center gap-4 p-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow hover:scale-[1.01] transition-transform">
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200">
          <Eye size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Vistas totales</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white animate-pulse">
            {views.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Clicks totales */}
      <div className="flex items-center gap-4 p-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow hover:scale-[1.01] transition-transform">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">
          <MousePointerClick size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Clics totales</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white animate-pulse">
            {clicks.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
