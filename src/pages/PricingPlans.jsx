// PricingPlans.jsx
import React from "react";

export default function Planes() {
  return (
    <section className="bg-black text-white py-16 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Elige tu plan</h2>
        <p className="text-gray-400 mb-10">
          Mejora tu perfil con funciones exclusivas y más impacto.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Plan Gratuito */}
          <div className="border border-white/10 rounded-xl p-6 bg-white/5">
            <h3 className="text-xl font-semibold mb-2">Plan Gratuito</h3>
            <p className="text-3xl font-bold mb-4">
              $0<span className="text-sm font-normal">/mes</span>
            </p>
            <ul className="text-sm text-left space-y-2 mb-6">
              <li>✅ Hasta 3 enlaces</li>
              <li>✅ Personalización básica</li>
              <li>✅ Perfil público en AI BioLink</li>
            </ul>
            <button className="w-full bg-gray-700 text-white py-2 rounded">
              Tu plan actual
            </button>
          </div>

          {/* Plan PRO Mensual */}
          <div className="border border-green-500 rounded-xl p-6 bg-gradient-to-br from-green-600/20 via-black to-green-900/40 shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              PRO Mensual
            </h3>
            <p className="text-3xl font-bold mb-4 text-green-200">
              $99<span className="text-sm font-normal">/mes</span>
            </p>
            <ul className="text-sm text-left space-y-2 mb-6">
              <li>🚀 Enlaces ilimitados</li>
              <li>🎨 Temas premium</li>
              <li>📈 Estadísticas en tiempo real</li>
              <li>📎 Botones con íconos</li>
              <li>🔗 Dominio personalizado</li>
            </ul>
            <a
              href="https://buy.stripe.com/test_dDxxxxxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded transition-all"
            >
              Actualizar mensual
            </a>
          </div>

          {/* Plan PRO Anual */}
          <div className="border border-yellow-500 rounded-xl p-6 bg-gradient-to-br from-yellow-700/30 via-black to-yellow-900/40 shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-300">
              PRO Anual
            </h3>
            <p className="text-3xl font-bold mb-4 text-yellow-200">
              $999<span className="text-sm font-normal">/año</span>
            </p>
            <p className="text-xs text-yellow-100 mb-4">
              💰 Ahorra $189 comparado con pagar mensual
            </p>
            <ul className="text-sm text-left space-y-2 mb-6">
              <li>🚀 Todo lo del plan mensual</li>
              <li>🎁 Acceso anticipado a nuevas funciones</li>
              <li>💡 Soporte prioritario</li>
            </ul>
            <a
              href="https://buy.stripe.com/test_cBxxxxxxxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded transition-all"
            >
              Actualizar anual
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
