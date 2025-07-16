import React, { useEffect, useState, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import UserProfileEditor from '../components/UserProfileEditor';
import StatsPanel from '../components/StatsPanel';
import PlanCard from '../components/PlanCard';
import ProfilePreview from '../components/ProfilePreview';
import {
  Share2,
  Eye,
  Plus,
  Save,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Users,
  Link,
  Bell,
  Settings,
  Download,
  Upload,
  Zap,
  BarChart3,
  Globe,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Home,
  User,
  FileText,
  CreditCard,
  HelpCircle,
  LogOut,
} from 'lucide-react';

export default function Dashboard({ user, db, darkMode, toggleDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentSection, setCurrentSection] = useState('dashboard'); // Para manejar la navegación del sidebar

  // Función para mostrar notificaciones
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Función para manejar la navegación del sidebar
  const handleNavigation = useCallback((section) => {
    setCurrentSection(section);
    setMenuOpen(false); // Cerrar menú móvil al navegar

    // Mapear secciones del sidebar a tabs del dashboard
    switch (section) {
      case 'dashboard':
        setActiveTab('overview');
        break;
      case 'profile':
        setActiveTab('profile');
        break;
      case 'links':
        setActiveTab('links');
        break;
      case 'analytics':
        setActiveTab('analytics');
        break;
      case 'settings':
        setActiveTab('profile');
        break;
      default:
        setActiveTab('overview');
    }
  }, []);

  // Cargar datos con mejor manejo de errores
  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setData(snap.data());
          showNotification('Perfil cargado exitosamente');
        } else {
          const defaultData = {
            plan: 'free',
            enlaces: [],
            nombre: user.displayName || 'Usuario',
            descripcion: '',
            avatar: user.photoURL || '',
          };
          setData(defaultData);
          await setDoc(ref, defaultData);
        }
      } catch (error) {
        console.error('❌ Error al cargar perfil:', error);
        showNotification('Error al cargar el perfil', 'error');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [user, db, showNotification]);

  // Función para guardar cambios
  const handleSave = async () => {
    if (!user || !data) return;

    try {
      setSaving(true);
      const ref = doc(db, 'usuarios', user.uid);
      await setDoc(ref, data);
      showNotification('Cambios guardados exitosamente');
    } catch (error) {
      console.error('❌ Error al guardar:', error);
      showNotification('Error al guardar cambios', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Función para agregar enlace
  const handleAddLink = () => {
    if (!data) return;

    const newLink = {
      id: Date.now().toString(),
      tipo: 'personalizado',
      url: '',
      titulo: 'Nuevo enlace',
      descripcion: '',
      activo: true,
    };

    setData({
      ...data,
      enlaces: [...(data.enlaces || []), newLink],
    });

    showNotification('Enlace agregado');
  };

  // Función para compartir
  const handleShare = async () => {
    const url = `${window.location.origin}/profile/${user.uid}`;

    try {
      await navigator.clipboard.writeText(url);
      showNotification('Enlace copiado al portapapeles');
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification('Enlace copiado al portapapeles');
    }
  };

  // Cerrar menú móvil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Error al cargar el perfil
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No se pudieron cargar los datos del perfil. Intenta recargar la página.
          </p>
        </div>
      </div>
    );
  }

  // Vista previa - Optimizada
  if (mostrarVistaPrevia) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-black">
        {/* Efectos de fondo optimizados */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        </div>

        {/* Header fijo y responsive */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Vista Previa</h1>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Así verán tu perfil los visitantes
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </button>
                <button
                  onClick={() => setMostrarVistaPrevia(false)}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Volver
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido principal centrado */}
        <main className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Simulador de móvil */}
              <div className="relative">
                <div className="bg-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="bg-white dark:bg-gray-900 rounded-[2rem] w-[375px] h-[812px] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gray-400 rounded-full z-10" />

                    {/* Contenido scrolleable */}
                    <div className="h-full overflow-y-auto pt-6">
                      <ProfilePreview data={data} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Información adicional */}
              <div className="w-full lg:w-auto lg:max-w-md space-y-6">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Características
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle, text: 'Diseño responsive', color: 'green' },
                      { icon: Smartphone, text: 'Optimizado para móviles', color: 'blue' },
                      { icon: Globe, text: 'Acceso público', color: 'purple' },
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full bg-${feature.color}-100 dark:bg-${feature.color}-900/20 flex items-center justify-center`}
                        >
                          <feature.icon className={`w-4 h-4 text-${feature.color}-600`} />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Enlace público
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                      <code className="text-sm text-gray-600 dark:text-gray-400 break-all">
                        {window.location.origin}/profile/{user.uid}
                      </code>
                    </div>
                    <button
                      onClick={handleShare}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Navegación por tabs */}
            <div className="mb-8">
              <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                {[
                  { id: 'overview', label: 'Resumen', icon: BarChart3 },
                  { id: 'profile', label: 'Perfil', icon: Users },
                  { id: 'links', label: 'Enlaces', icon: Link },
                  { id: 'analytics', label: 'Analíticas', icon: TrendingUp },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Contenido principal */}
              <div className="xl:col-span-3 space-y-6">
                {/* UserProfileEditor */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                  <UserProfileEditor
                    data={data}
                    setData={setData}
                    showNotification={showNotification}
                  />
                </div>

                {/* StatsPanel debajo del UserProfileEditor */}
                <StatsPanel views={1578} clicks={326} />
              </div>

              {/* Sidebar derecho */}
              <div className="xl:col-span-1 space-y-6">
                {/* Plan */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                  <PlanCard
                    plan={data.plan}
                    onNavigate={(path) => console.log('Navigate to:', path)}
                  />
                </div>

                {/* Acciones rápidas */}
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-purple-600 mr-2" />
                    Acciones
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Download, label: 'Exportar', color: 'blue' },
                      { icon: Upload, label: 'Importar', color: 'purple' },
                      { icon: Bell, label: 'Alertas', color: 'green' },
                      { icon: Settings, label: 'Config', color: 'orange' },
                    ].map((action, index) => (
                      <button
                        key={index}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                      >
                        <action.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 block">
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Configuración del Perfil
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Personaliza tu información y apariencia
                </p>
              </div>
              <UserProfileEditor
                data={data}
                setData={setData}
                showNotification={showNotification}
              />
            </div>
          </div>
        );

      case 'links':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <Link className="w-5 h-5 mr-2" />
                      Gestión de Enlaces
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Administra tus enlaces y redes sociales
                    </p>
                  </div>
                  <button
                    onClick={handleAddLink}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar enlace
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <Link className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Gestión de enlaces disponible próximamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Analíticas y Estadísticas
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Monitorea el rendimiento de tu perfil
                </p>
              </div>
              <div className="p-6">
                <StatsPanel views={1578} clicks={326} />
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Facturación y Planes
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Gestiona tu suscripción y métodos de pago
                </p>
              </div>
              <div className="p-6">
                <PlanCard
                  plan={data.plan}
                  onNavigate={(path) => console.log('Navigate to:', path)}
                />
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Configuración
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Personaliza tu experiencia y preferencias
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Preferencias
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Modo oscuro
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Cambia entre tema claro y oscuro
                          </p>
                        </div>
                        <button
                          onClick={toggleDarkMode}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  Ayuda y Soporte
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Encuentra respuestas y obtén ayuda
                </p>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Centro de ayuda disponible próximamente
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return renderContent();
    }
  };

  // Dashboard principal - Layout optimizado
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Ancho fijo optimizado */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        >
          {data && (
            <Sidebar
              menuOpen={menuOpen}
              toggleMenu={() => setMenuOpen(!menuOpen)}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              plan={data.plan}
              currentSection={currentSection}
              onNavigate={handleNavigation}
              user={user}
            />
          )}
        </aside>

        {/* Overlay para móvil */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}

        {/* Contenido principal - Flex restante */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Header */}
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Botón menú móvil */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors menu-button"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {currentSection === 'dashboard'
                      ? 'Dashboard'
                      : currentSection === 'profile'
                        ? 'Perfil'
                        : currentSection === 'links'
                          ? 'Enlaces'
                          : currentSection === 'analytics'
                            ? 'Analíticas'
                            : currentSection === 'billing'
                              ? 'Facturación'
                              : currentSection === 'settings'
                                ? 'Configuración'
                                : currentSection === 'help'
                                  ? 'Ayuda'
                                  : 'Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentSection === 'dashboard'
                      ? 'Gestiona tu perfil y enlaces'
                      : currentSection === 'profile'
                        ? 'Personaliza tu información'
                        : currentSection === 'links'
                          ? 'Administra tus enlaces'
                          : currentSection === 'analytics'
                            ? 'Monitorea tu rendimiento'
                            : currentSection === 'billing'
                              ? 'Gestiona tu suscripción'
                              : currentSection === 'settings'
                                ? 'Configura tu experiencia'
                                : currentSection === 'help'
                                  ? 'Obtén ayuda y soporte'
                                  : 'Gestiona tu perfil y enlaces'}
                  </p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMostrarVistaPrevia(true)}
                  className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Vista previa</span>
                </button>

                {currentSection === 'dashboard' && (
                  <button
                    onClick={handleAddLink}
                    className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Agregar</span>
                  </button>
                )}

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    saving
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg'
                  } text-white`}
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </div>
          </header>

          {/* Contenido scrolleable */}
          <div className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6 lg:p-8">{renderContent()}</div>
          </div>
        </main>
      </div>

      {/* Notificaciones */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div
            className={`p-4 rounded-lg shadow-lg border backdrop-blur-sm ${
              notification.type === 'success'
                ? 'bg-green-50/90 dark:bg-green-900/90 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                : 'bg-red-50/90 dark:bg-red-900/90 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
