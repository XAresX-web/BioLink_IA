import React from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PlanCard({ plan }) {
  const navigate = useNavigate();

  return plan === 'free' ? (
    <div className="w-full p-4 sm:p-6 bg-yellow-100 rounded-lg border border-yellow-300 shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold text-yellow-600">
        Estás en el plan gratuito
      </h2>
      <p className="text-sm sm:text-base text-yellow-800 mt-2">
        Desbloquea temas premium, más enlaces y estadísticas avanzadas.
      </p>
      <button
        onClick={() => navigate('/precios')}
        className="mt-4 inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded w-full transition-all"
      >
        <BadgeDollarSign size={18} className="mr-2" />
        Ver planes y actualizar
      </button>
    </div>
  ) : (
    <div className="w-full p-4 sm:p-6 bg-green-100 rounded-lg border border-green-300 shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold text-green-600">¡Tienes el plan PRO!</h2>
      <p className="text-sm sm:text-base text-green-800 mt-2">
        Accede a todas las funciones premium.
      </p>
    </div>
  );
}
