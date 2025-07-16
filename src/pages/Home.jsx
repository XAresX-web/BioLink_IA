import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  ArrowRight,
  User,
  Star,
  Zap,
  Shield,
  Users,
  CheckCircle,
  Play,
  MousePointer,
  Globe,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

const Home = ({ user, login, logout }) => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Testimonios rotativos
  const testimonials = [
    {
      text: 'Aumenté mis seguidores 300% en 2 meses',
      author: 'María González',
      role: 'Content Creator',
      rating: 5,
    },
    {
      text: 'La mejor herramienta para mi negocio online',
      author: 'Carlos Ruiz',
      role: 'Emprendedor',
      rating: 5,
    },
    {
      text: 'Súper fácil de usar y muy profesional',
      author: 'Ana Torres',
      role: 'Influencer',
      rating: 5,
    },
  ];

  // Estadísticas en tiempo real
  const [stats, setStats] = useState({
    users: 47683,
    links: 892456,
    clicks: 12847392,
  });

  // Efectos de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible({
        hero: true,
        features: true,
        cta: true,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Rotación de testimonios
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Contador de estadísticas
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        users: prev.users + Math.floor(Math.random() * 3),
        links: prev.links + Math.floor(Math.random() * 8),
        clicks: prev.clicks + Math.floor(Math.random() * 50),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Seguimiento del mouse para efectos
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] text-white relative overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl animate-ping"></div>

        {/* Efecto de cursor */}
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-green-400/20 to-lime-400/20 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div
            className={`text-center space-y-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Badge de credibilidad */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              Plataforma #1 en Latinoamérica
            </div>

            {/* Título principal */}
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 drop-shadow-lg">
                AI BioLink
              </span>
              <span className="block text-3xl md:text-4xl font-bold text-white mt-2">
                Tu identidad digital inteligente
              </span>
            </h1>

            {/* Subtítulo persuasivo */}
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Convierte tus redes sociales en una{' '}
              <span className="text-green-400 font-semibold">máquina de conversión</span> con IA.
              Centraliza todo tu contenido, impulsa tus ventas y construye tu marca personal.
            </p>

            {/* Estadísticas en tiempo real */}
            <div className="flex flex-wrap justify-center gap-8 py-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {stats.users.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-400">Creadores activos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lime-400">
                  {stats.links.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-400">Enlaces creados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">
                  {stats.clicks.toLocaleString()}+
                </div>
                <div className="text-sm text-gray-400">Clicks generados</div>
              </div>
            </div>

            {/* Testimonios rotativos */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/10">
              <div className="flex items-center justify-center mb-3">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg italic text-gray-200 mb-4">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div className="text-sm">
                <span className="font-semibold text-green-400">
                  {testimonials[currentTestimonial].author}
                </span>
                <span className="text-gray-400"> - {testimonials[currentTestimonial].role}</span>
              </div>
            </div>

            {/* CTA Section */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {user ? (
                <div className="space-y-4">
                  {/* Usuario logueado */}
                  <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 font-medium">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    ¡Bienvenido de vuelta, {user.displayName}!
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigate('/Dashboard')}
                      className="group relative px-8 py-4 bg-gradient-to-r from-green-400 to-lime-400 hover:from-green-500 hover:to-lime-500 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
                    >
                      <span className="flex items-center">
                        Ir al Dashboard
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    <button
                      onClick={logout}
                      className="px-6 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-red-500/20 hover:border-red-500/40"
                    >
                      <LogOut className="mr-2 h-4 w-4 inline" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* CTA principal */}
                  <button
                    onClick={login}
                    className="group relative px-10 py-5 bg-gradient-to-r from-green-400 to-lime-400 hover:from-green-500 hover:to-lime-500 text-black font-bold text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 inline-flex items-center"
                  >
                    <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
                    Crear mi BioLink Gratis
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Garantías */}
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-green-400" />
                      100% Gratis
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                      Configuración en 2 minutos
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-400" />
                      Sin tarjeta de crédito
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div
            className={`mt-20 transition-all duration-1000 delay-500 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-lime-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">IA Integrada</h3>
                <p className="text-gray-400">
                  Optimización automática de contenido y sugerencias personalizadas para maximizar
                  tu alcance.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-lime-500/30 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analíticas Avanzadas</h3>
                <p className="text-gray-400">
                  Dashboards inteligentes con insights accionables sobre tu audiencia y rendimiento.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MousePointer className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">Súper Fácil</h3>
                <p className="text-gray-400">
                  Interfaz intuitiva con drag & drop. Crea tu perfil profesional en minutos, no
                  horas.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Preview */}
          <div className="mt-20 text-center">
            <button className="group inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-green-500/30 transition-all duration-300 hover:scale-105 text-gray-300 hover:text-white">
              <Play className="w-5 h-5 mr-2" />
              Ver demo de 60 segundos
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Datos encriptados
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Soporte 24/7
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Disponible globalmente
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              4.9/5 en reviews
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 text-center text-sm text-gray-500 border-t border-white/10 pt-8">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <a href="#" className="hover:text-green-400 transition-colors">
                Términos
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Soporte
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                Blog
              </a>
            </div>
            <p>Todos los derechos reservados · AI BioLink © {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
