import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeDollarSign, Crown, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function PlanCard({ plan, onNavigate }) {
  const navigate = useNavigate();
  const planConfig = {
    free: {
      title: 'Plan Gratuito',
      subtitle: 'Perfecto para comenzar',
      description: 'Accede a las funciones básicas y descubre el potencial de nuestra plataforma',
      features: [
        'Temas básicos incluidos',
        'Hasta 3 enlaces personalizados',
        'Estadísticas básicas',
        'Soporte por email',
      ],
      gradient: 'from-amber-400 via-orange-500 to-yellow-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      titleColor: 'text-amber-900',
      icon: Sparkles,
      actionText: 'Actualizar a PRO',
      ctaGradient: 'from-amber-500 to-orange-600',
    },
    pro: {
      title: 'Plan PRO',
      subtitle: 'Máximo rendimiento',
      description: 'Disfruta de todas las funciones premium sin limitaciones',
      features: [
        'Temas premium ilimitados',
        'Enlaces ilimitados',
        'Estadísticas avanzadas',
        'Soporte prioritario',
        'Personalización avanzada',
        'Análisis en tiempo real',
      ],
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      titleColor: 'text-emerald-900',
      icon: Crown,
      actionText: 'Gestionar suscripción',
      ctaGradient: 'from-emerald-500 to-teal-600',
    },
  };

  const config = planConfig[plan] || planConfig.free;
  const IconComponent = config.icon;

  return (
    <div
      className={`
      relative w-full max-w-md mx-auto overflow-hidden
      ${config.bgColor} ${config.borderColor}
      border-2 rounded-2xl shadow-lg hover:shadow-xl
      transition-all duration-300 hover:-translate-y-1
      group
    `}
    >
      {/* Gradient overlay effect */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-r ${config.gradient}
        opacity-0 group-hover:opacity-5 transition-opacity duration-300
      `}
      />

      {/* Header with icon */}
      <div className="relative p-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`
            p-3 rounded-full bg-gradient-to-r ${config.gradient}
            shadow-lg group-hover:scale-110 transition-transform duration-300
          `}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {plan === 'pro' && (
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full">
              <Crown className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white">ACTIVO</span>
            </div>
          )}
        </div>

        <h2 className={`text-2xl font-bold ${config.titleColor} mb-1`}>{config.title}</h2>

        <p className={`text-sm font-medium ${config.textColor} opacity-80`}>{config.subtitle}</p>
      </div>

      {/* Content */}
      <div className="relative px-6 pb-6">
        <p className={`${config.textColor} text-sm leading-relaxed mb-6`}>{config.description}</p>

        {/* Features list */}
        <div className="space-y-3 mb-6">
          {config.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`
                w-5 h-5 rounded-full bg-gradient-to-r ${config.gradient}
                flex items-center justify-center flex-shrink-0
              `}
              >
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className={`text-sm ${config.textColor}`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action button */}
        {plan === 'free' && (
          <button
            onClick={() => navigate('/precios')}
            className={`
              w-full py-3 px-4 rounded-xl font-medium text-white
              bg-gradient-to-r ${config.ctaGradient}
              hover:shadow-lg hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-200
              flex items-center justify-center gap-2
              group/btn
            `}
          >
            <BadgeDollarSign className="w-5 h-5" />
            <span>{config.actionText}</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </button>
        )}

        {plan === 'pro' && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate?.('/configuracion')}
              className={`
                w-full py-3 px-4 rounded-xl font-medium text-white
                bg-gradient-to-r ${config.ctaGradient}
                hover:shadow-lg hover:scale-[1.02]
                active:scale-[0.98]
                transition-all duration-200
                flex items-center justify-center gap-2
                group/btn
              `}
            >
              <span>{config.actionText}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>

            <div
              className={`
              text-center text-xs ${config.textColor} opacity-70
              bg-white/50 rounded-lg py-2 px-4
            `}
            >
              ✨ Gracias por confiar en nosotros
            </div>
          </div>
        )}
      </div>

      {/* Subtle animation effect */}
      <div
        className={`
        absolute top-0 left-0 w-full h-1
        bg-gradient-to-r ${config.gradient}
        transform scale-x-0 group-hover:scale-x-100
        transition-transform duration-500 origin-left
      `}
      />
    </div>
  );
}
