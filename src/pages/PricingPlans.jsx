import React, { useState, useEffect } from 'react';
import {
  Check,
  Crown,
  Zap,
  Star,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60); // 72 horas en segundos
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Contador regresivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const testimonials = [
    {
      name: 'María González',
      role: 'Influencer',
      avatar: 'MG',
      review: 'Aumenté mis conversiones 300%',
    },
    {
      name: 'Carlos Ruiz',
      role: 'Coach',
      avatar: 'CR',
      review: 'La mejor inversión para mi negocio',
    },
    {
      name: 'Ana Torres',
      role: 'Artista',
      avatar: 'AT',
      review: 'Herramientas increíbles y fáciles',
    },
    { name: 'Luis Pérez', role: 'CEO', avatar: 'LP', review: 'Soporte excepcional siempre' },
    {
      name: 'Sofia Mendez',
      role: 'Bloguera',
      avatar: 'SM',
      review: 'Resultados desde el primer día',
    },
  ];

  const plans = [
    {
      name: 'Gratuito',
      price: 0,
      originalPrice: null,
      popular: false,
      description: 'Perfecto para comenzar',
      roi: 'Ahorra $0/mes en herramientas',
      features: [
        'Hasta 3 enlaces',
        'Personalización básica',
        'Perfil público',
        'Analíticas básicas',
        'Soporte comunidad',
      ],
      buttonText: 'Plan Actual',
      buttonStyle: 'bg-gray-700 hover:bg-gray-600 text-white cursor-not-allowed',
      cardStyle: 'border-white/10 bg-white/5',
      icon: null,
      badge: null,
    },
    {
      name: 'PRO',
      price: isAnnual ? 79 : 99,
      originalPrice: isAnnual ? 99 : null,
      popular: true,
      description: 'Para creadores serios',
      roi: 'Ahorra $200/mes en herramientas',
      features: [
        'Enlaces ilimitados',
        'Temas premium exclusivos',
        'Estadísticas avanzadas en tiempo real',
        'Botones con íconos personalizados',
        'Dominio personalizado',
        'Soporte prioritario',
        'Integraciones avanzadas',
        'A/B Testing de enlaces',
      ],
      buttonText: `Comenzar PRO ${isAnnual ? 'Anual' : 'Mensual'}`,
      buttonStyle:
        'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl',
      cardStyle:
        'border-purple-500 bg-gradient-to-br from-purple-600/20 via-black to-pink-900/40 shadow-2xl scale-105',
      icon: <Crown className="w-5 h-5" />,
      badge: 'Más Popular',
    },
    {
      name: 'Enterprise',
      price: isAnnual ? 199 : 249,
      originalPrice: isAnnual ? 249 : null,
      popular: false,
      description: 'Para equipos y empresas',
      roi: 'Ahorra $500/mes en herramientas',
      features: [
        'Todo lo del plan PRO',
        'Múltiples usuarios (hasta 10)',
        'Análisis de marca personal',
        'API personalizada',
        'Soporte dedicado 24/7',
        'Onboarding personalizado',
        'Manager de cuenta dedicado',
      ],
      buttonText: 'Contactar Ventas',
      buttonStyle:
        'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl',
      cardStyle: 'border-amber-500 bg-gradient-to-br from-amber-600/20 via-black to-orange-900/40',
      icon: <Shield className="w-5 h-5" />,
      badge: 'Empresas',
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6 min-h-screen relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Oferta limitada */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full inline-flex items-center text-sm font-semibold animate-pulse">
            <Clock className="w-4 h-4 mr-2" />
            Oferta especial termina en: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Header con testimonial social proof */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex -space-x-2">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform cursor-pointer"
                  title={`${testimonial.name} - ${testimonial.review}`}
                >
                  {testimonial.avatar}
                </div>
              ))}
            </div>
            <span className="ml-4 text-sm text-gray-300">
              Únete a <strong className="text-purple-400">50,000+</strong> creadores exitosos
            </span>
          </div>

          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Impulsa tu presencia digital
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Transforma tu perfil en una máquina de conversión que genera resultados reales
          </p>

          {/* Toggle anual/mensual */}
          <div className="flex items-center justify-center mb-8">
            <span
              className={`mr-3 transition-colors ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}
            >
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`ml-3 transition-colors ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}
            >
              Anual
            </span>
            {isAnnual && (
              <span className="ml-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-3 py-1 rounded-full font-semibold animate-bounce">
                Ahorra 20% 🎉
              </span>
            )}
          </div>
        </div>

        {/* Cards de precios */}
        <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative border rounded-3xl p-8 ${plan.cardStyle} hover:scale-[1.02] transition-all duration-300 group cursor-pointer ${
                selectedPlan === index ? 'ring-4 ring-purple-500' : ''
              }`}
              onClick={() => setSelectedPlan(index)}
            >
              {/* Badge popular */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Header del plan */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  {plan.icon}
                  <h3 className="text-2xl font-bold ml-2">{plan.name}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-2">{plan.description}</p>
                <p className="text-green-400 text-xs font-semibold">{plan.roi}</p>
              </div>

              {/* Precio */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  {plan.originalPrice && (
                    <span className="text-2xl text-gray-500 line-through mr-2">
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span className="text-5xl font-bold">${plan.price}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  {plan.price === 0 ? 'Gratis para siempre' : `/${isAnnual ? 'año' : 'mes'}`}
                </span>
                {plan.price > 0 && isAnnual && (
                  <div className="mt-2 text-green-400 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    Ahorra ${(plan.originalPrice || plan.price) * 12 - plan.price * 12}/año
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${plan.buttonStyle} ${
                  plan.popular ? 'transform hover:scale-105 group-hover:animate-pulse' : ''
                } flex items-center justify-center`}
                disabled={plan.name === 'Gratuito'}
              >
                {plan.buttonText}
                {plan.price > 0 && <ArrowRight className="w-4 h-4 ml-2" />}
              </button>

              {/* Guarantee badge */}
              {plan.price > 0 && (
                <div className="text-center mt-4 text-xs text-gray-400">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Garantía de 30 días o tu dinero de vuelta
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Testimonios expandidos */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.review}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculadora de ROI */}
        <div className="mt-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-3xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-center mb-8">Calculadora de ROI</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">$2,400</div>
              <p className="text-gray-300">Ahorro anual promedio</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">300%</div>
              <p className="text-gray-300">Aumento en conversiones</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">4.2x</div>
              <p className="text-gray-300">ROI en 6 meses</p>
            </div>
          </div>
        </div>

        {/* Trust signals mejorados */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8 text-gray-400 text-sm">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 mb-2 text-green-400" />
              <span className="font-semibold">Pagos 100% seguros</span>
              <span className="text-xs">Encriptación SSL</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-8 h-8 mb-2 text-yellow-400" />
              <span className="font-semibold">Activación instantánea</span>
              <span className="text-xs">Sin esperas</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 mb-2 text-blue-400" />
              <span className="font-semibold">Soporte 24/7</span>
              <span className="text-xs">Respuesta en 2 horas</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 mb-2 text-purple-400" />
              <span className="font-semibold">Garantía total</span>
              <span className="text-xs">30 días sin riesgo</span>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">¿Listo para transformar tu presencia digital?</p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105">
            Comenzar ahora - Sin riesgo
          </button>
          <p className="text-xs text-gray-500 mt-4">
            ¿Tienes preguntas?{' '}
            <span className="text-purple-400 cursor-pointer hover:underline">
              Habla con nuestro equipo
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
