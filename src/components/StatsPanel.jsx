import React from 'react';

export default function StatsPanel() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl bg-gradient-to-br from-green-100 via-white to-green-50 border border-green-200 shadow-lg p-6 text-center hover:scale-[1.01] transition-transform">
        <p className="text-sm text-gray-600 mb-2">Vistas totales</p>
        <p className="text-4xl font-bold text-green-700">12</p>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-blue-100 via-white to-blue-50 border border-blue-200 shadow-lg p-6 text-center hover:scale-[1.01] transition-transform">
        <p className="text-sm text-gray-600 mb-2">Clicks totales</p>
        <p className="text-4xl font-bold text-blue-700">5</p>
      </div>
    </div>
  );
}
