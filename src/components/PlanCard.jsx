import React from 'react';
import { BadgeDollarSign } from 'lucide-react';

export default function PlanCard({ plan }) {
  return plan === 'free' ? (
    <div className="w-full p-4 bg-yellow-100 rounded-lg border border-yellow-300">
      <h2 className="text-lg font-semibold text-yellow-600">Estás en el plan gratuito</h2>
      <p className="text-sm text-yellow-800">
        Desbloquea temas premium, más enlaces y estadísticas avanzadas.
      </p>
      <a
        href="/precios"
        className="mt-3 inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded w-full"
      >
        <BadgeDollarSign size={18} className="mr-2" />
        Ver planes y actualizar
      </a>
    </div>
  ) : (
    <div className="w-full p-4 bg-green-100 rounded-lg border border-green-300">
      <h2 className="text-lg font-semibold text-green-600">¡Tienes el plan PRO!</h2>
      <p className="text-sm text-green-800">Accede a todas las funciones premium.</p>
    </div>
  );
}
