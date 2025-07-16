import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Link,
  Settings,
  Moon,
  Sun,
  Menu,
  Store,
  BarChart3,
  FileLock2,
  ChevronDown,
  ChevronRight,
  Crown,
  Sparkles,
  User,
  LogOut,
  Bell,
  Gift,
  Zap,
  TrendingUp,
  Shield,
  Users,
  Palette,
  Globe,
  MousePointer,
  DollarSign,
  Package,
  Image,
  MessageSquare,
  Calendar,
  Share2,
  Lock,
  HelpCircle,
  X,
  ChevronLeft,
} from 'lucide-react';

export default function Sidebar({
  menuOpen,
  toggleMenu,
  darkMode,
  toggleDarkMode,
  plan = 'free',
  onCollapseChange,
}) {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [expandedSections, setExpandedSections] = useState({
    principal: true,
    analytics: false,
    content: false,
    tienda: false,
    account: false,
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Detectar tamaño de pantalla y configurar comportamiento responsivo
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // Cambié a 1024px para mejor experiencia
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      setIsMobile(mobile);

      // Auto-colapsar en tablets para mejor uso del espacio
      if (tablet && !isCollapsed) {
        setIsCollapsed(true);
      }

      // En móvil, resetear estado de colapso
      if (mobile) {
        setIsCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isCollapsed]);

  // Notificar cambios de colapso al componente padre
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed && !isMobile);
    }
  }, [isCollapsed, isMobile, onCollapseChange]);

  // Cerrar menú de usuario cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  // Manejar animaciones
  const handleCollapseToggle = () => {
    if (isMobile) {
      if (toggleMenu) toggleMenu();
    } else {
      setIsAnimating(true);
      setIsCollapsed(!isCollapsed);

      // Cerrar menú de usuario si está abierto
      setShowUserMenu(false);

      // Expandir sección principal automáticamente al descolapsar
      if (isCollapsed) {
        setExpandedSections((prev) => ({
          ...prev,
          principal: true,
        }));
      }

      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const isActive = (path) => currentPath === path;
  const navigate = (path) => {
    setCurrentPath(path);
    console.log(`Navigating to: ${path}`);
    if (isMobile && toggleMenu) {
      toggleMenu();
    }
  };

  const toggleSection = (section) => {
    // En modo colapsado, no permitir expandir/contraer secciones
    if (isCollapsed && !isMobile) return;

    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const planConfig = {
    free: {
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      glowClass: 'animate-pulse',
      icon: Gift,
      badge: 'FREE',
      features: ['Hasta 5 enlaces', 'Tema básico', 'Analíticas básicas'],
    },
    pro: {
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      glowClass: 'animate-pulse',
      icon: Crown,
      badge: 'PRO',
      features: [
        'Enlaces ilimitados',
        'Temas premium',
        'Analíticas avanzadas',
        'Tienda digital',
        'Contenido +18',
      ],
    },
    enterprise: {
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      glowClass: 'animate-pulse',
      icon: Sparkles,
      badge: 'ENTERPRISE',
      features: ['Todo de PRO', 'API personalizada', 'Soporte prioritario', 'Marca blanca'],
    },
  };

  const currentPlan = planConfig[plan] || planConfig.free;

  const menuItems = [
    {
      section: 'Principal',
      key: 'principal',
      icon: LayoutDashboard,
      items: [
        {
          path: '/dashboard',
          icon: LayoutDashboard,
          label: 'Panel Principal',
          description: 'Vista general de tu perfil',
        },
        {
          path: '/enlaces',
          icon: Link,
          label: 'Mis Enlaces',
          description: 'Gestiona tus enlaces',
          badge: '12',
        },
        {
          path: '/apariencia',
          icon: Palette,
          label: 'Apariencia',
          description: 'Personaliza tu página',
        },
        {
          path: '/pagina',
          icon: Globe,
          label: 'Mi Página',
          description: 'Vista previa pública',
          external: true,
        },
      ],
    },
    {
      section: 'Analíticas',
      key: 'analytics',
      icon: BarChart3,
      items: [
        {
          path: '/analytics',
          icon: BarChart3,
          label: 'Estadísticas',
          description: 'Rendimiento detallado',
        },
        {
          path: '/visitors',
          icon: Users,
          label: 'Visitantes',
          description: 'Análisis de audiencia',
        },
        {
          path: '/clicks',
          icon: MousePointer,
          label: 'Clics',
          description: 'Tracking de interacciones',
        },
        {
          path: '/performance',
          icon: TrendingUp,
          label: 'Rendimiento',
          description: 'Métricas avanzadas',
          pro: true,
        },
      ],
    },
    {
      section: 'Contenido',
      key: 'content',
      icon: Image,
      items: [
        {
          path: '/multimedia',
          icon: Image,
          label: 'Multimedia',
          description: 'Fotos, videos, audio',
        },
        {
          path: '/social',
          icon: Share2,
          label: 'Redes Sociales',
          description: 'Integración social',
        },
        {
          path: '/contacto',
          icon: MessageSquare,
          label: 'Contacto',
          description: 'Formularios y chat',
        },
        {
          path: '/eventos',
          icon: Calendar,
          label: 'Eventos',
          description: 'Calendario y citas',
          pro: true,
        },
      ],
    },
  ];

  const storeItems = [
    { path: '/tienda', icon: Store, label: 'Dashboard', description: 'Panel de control' },
    {
      path: '/productos',
      icon: Package,
      label: 'Productos',
      description: 'Catálogo digital',
      badge: '5',
    },
    { path: '/ventas', icon: DollarSign, label: 'Ventas', description: 'Historial de compras' },
    {
      path: '/contenido-18',
      icon: FileLock2,
      label: 'Contenido +18',
      description: 'Contenido restringido',
    },
  ];

  const accountItems = [
    { path: '/precios', icon: Crown, label: 'Planes y Precios', description: 'Mejora tu cuenta' },
    { path: '/ajustes', icon: Settings, label: 'Configuración', description: 'Ajustes de cuenta' },
    {
      path: '/notificaciones',
      icon: Bell,
      label: 'Notificaciones',
      description: 'Alertas y avisos',
      badge: notifications > 0 ? notifications : null,
    },
    { path: '/ayuda', icon: HelpCircle, label: 'Ayuda y Soporte', description: 'Centro de ayuda' },
  ];

  const MenuItem = ({ item, isSubItem = false }) => {
    const isItemActive = isActive(item.path);
    const isDisabled = item.pro && plan === 'free';
    const collapsed = isCollapsed && !isMobile;

    return (
      <div className="relative group">
        <button
          onClick={() => !isDisabled && navigate(item.path)}
          disabled={isDisabled}
          className={`w-full flex items-center gap-3 text-sm font-medium px-3 py-3 rounded-xl transition-all duration-300 ease-out relative overflow-hidden ${
            isSubItem ? 'ml-6 py-2' : ''
          } ${
            isItemActive
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
              : isDisabled
                ? 'text-gray-400 cursor-not-allowed opacity-50'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-750 hover:text-gray-900 dark:hover:text-white hover:shadow-md hover:transform hover:scale-[1.01]'
          }`}
        >
          {/* Efecto de hover animado */}
          {!isItemActive && !isDisabled && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          <div
            className={`flex items-center gap-3 flex-1 relative z-10 ${collapsed ? 'justify-center' : ''}`}
          >
            <item.icon
              size={18}
              className={`${isItemActive ? 'text-white' : ''} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
            />

            <div
              className={`transition-all duration-300 ease-out ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}
            >
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate transition-all duration-300">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap transition-all duration-300 ${
                        isItemActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.pro && (
                    <Crown
                      size={12}
                      className="text-amber-400 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
                    />
                  )}
                </div>
                <div
                  className={`text-xs opacity-60 truncate transition-all duration-300 ${isItemActive ? 'text-white' : 'text-gray-500'}`}
                >
                  {item.description}
                </div>
              </div>
            </div>
          </div>

          {item.external && (
            <div
              className={`opacity-50 flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-50'}`}
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          )}
        </button>

        {/* Tooltip mejorado para modo colapsado */}
        {collapsed && (
          <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-gray-700">
            <div className="font-medium">{item.label}</div>
            <div className="text-gray-300 text-xs mt-1">{item.description}</div>
            {item.badge && (
              <div className="mt-1">
                <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>
            )}
            {/* Flecha del tooltip */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-800"></div>
          </div>
        )}

        {/* Overlay PRO mejorado */}
        {isDisabled && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-xl backdrop-blur-sm transition-all duration-300">
            <div className="text-center">
              <Lock size={16} className="mx-auto mb-1 text-amber-400 animate-pulse" />
              {!collapsed && (
                <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">PRO</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const SectionHeader = ({ title, icon: Icon, expanded, onToggle, count, sectionKey }) => {
    const collapsed = isCollapsed && !isMobile;
    const isClickable = !collapsed;

    if (collapsed) {
      return (
        <div className="flex justify-center mb-4 group">
          <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors duration-300">
            <Icon size={16} className="text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={() => isClickable && onToggle()}
        disabled={!isClickable}
        className={`w-full flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-3 px-3 py-2 rounded-lg transition-all duration-300 ${
          isClickable
            ? 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
            : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon
            size={14}
            className={`transition-transform duration-300 ${expanded ? 'text-blue-500' : ''}`}
          />
          <span className="truncate">{title}</span>
          {count && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0 animate-pulse">
              {count}
            </span>
          )}
        </div>
        {isClickable && (
          <div className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} />
          </div>
        )}
      </button>
    );
  };

  // Ancho del sidebar con transiciones suaves
  const sidebarWidth = isMobile ? 'w-80' : isCollapsed ? 'w-20' : 'w-80';

  return (
    <>
      {/* Overlay para mobile con transición */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isMobile && menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      <aside
        className={`
          ${sidebarWidth}
          ${isMobile ? (menuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
          fixed lg:relative top-0 left-0 h-screen 
          bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-800 
          transition-all duration-300 ease-in-out 
          z-50 
          overflow-hidden
          flex flex-col
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
      >
        {/* Header mejorado */}
        <div className="flex-shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 transition-transform duration-300 hover:scale-105">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div
                className={`min-w-0 flex-1 transition-all duration-300 ${isCollapsed && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}
              >
                <h1 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                  BioLink
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    {' '}
                    IA
                  </span>
                </h1>
                <div className="flex items-center gap-2">
                  <currentPlan.icon
                    size={12}
                    className={`${currentPlan.color} transition-transform duration-300`}
                  />
                  <span
                    className={`text-xs font-bold ${currentPlan.color} ${currentPlan.glowClass}`}
                  >
                    {currentPlan.badge}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCollapseToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 flex-shrink-0 hover:scale-105"
            >
              {isMobile ? (
                <X size={16} />
              ) : isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
          </div>
        </div>

        {/* User Profile mejorado */}
        <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="relative user-menu-container">
            <button
              onClick={() => !isCollapsed && setShowUserMenu(!showUserMenu)}
              disabled={isCollapsed && !isMobile}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
                isCollapsed && !isMobile
                  ? 'justify-center cursor-default'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-[1.02]'
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-500 transition-all duration-300 group-hover:scale-105">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg"></div>
                {notifications > 0 && (
                  <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center animate-pulse">
                    <span className="text-xs text-white font-bold">{notifications}</span>
                  </div>
                )}
              </div>
              <div
                className={`flex-1 text-left min-w-0 transition-all duration-300 ${isCollapsed && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}
              >
                <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                  Luis Sánchez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Shield size={12} className="text-blue-500" />
                  <span className="truncate">Administrador</span>
                </p>
              </div>
              <div
                className={`transition-all duration-300 ${isCollapsed && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 flex-shrink-0 ${showUserMenu ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {/* User Menu Dropdown mejorado */}
            {showUserMenu && !(isCollapsed && !isMobile) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in slide-in-from-top-2 duration-300">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                  <User
                    size={16}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <span>Mi Perfil</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
                  <Settings
                    size={16}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                  <span>Configuración</span>
                </button>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 group">
                  <LogOut
                    size={16}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation mejorada */}
        <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Main Menu */}
          {menuItems.map((section) => (
            <div key={section.key} className="space-y-2">
              <SectionHeader
                title={section.section}
                icon={section.icon}
                expanded={expandedSections[section.key]}
                onToggle={() => toggleSection(section.key)}
                sectionKey={section.key}
              />

              {/* Animación de expansión/contracción mejorada */}
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  expandedSections[section.key] || (isCollapsed && !isMobile)
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-1 py-1">
                  {section.items.map((item) => (
                    <MenuItem key={item.path} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Store Section mejorada */}
          <div className="space-y-2">
            <SectionHeader
              title="Tienda Digital"
              icon={Store}
              expanded={expandedSections.tienda}
              onToggle={() => toggleSection('tienda')}
              sectionKey="tienda"
            />
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                expandedSections.tienda || (isCollapsed && !isMobile)
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {plan === 'pro' ? (
                <div className="space-y-1 py-1">
                  {storeItems.map((item) => (
                    <MenuItem key={item.path} item={item} />
                  ))}
                </div>
              ) : (
                !(isCollapsed && !isMobile) && (
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Crown className="text-amber-500 flex-shrink-0 animate-pulse" size={20} />
                      <span className="font-semibold text-amber-700 dark:text-amber-300">
                        Upgrade to PRO
                      </span>
                    </div>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mb-3">
                      Desbloquea la tienda digital y monetiza tu contenido
                    </p>
                    <button
                      onClick={() => navigate('/precios')}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    >
                      Actualizar Ahora
                    </button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-2">
            <SectionHeader
              title="Cuenta"
              icon={User}
              expanded={expandedSections.account}
              onToggle={() => toggleSection('account')}
              sectionKey="account"
            />
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                expandedSections.account || (isCollapsed && !isMobile)
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="space-y-1 py-1">
                {accountItems.map((item) => (
                  <MenuItem key={item.path} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Dark Mode Toggle mejorado */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] group ${
                isCollapsed && !isMobile ? 'justify-center' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`transition-all duration-300 ${darkMode ? 'rotate-180' : 'rotate-0'}`}
                >
                  {darkMode ? (
                    <Sun
                      size={18}
                      className="group-hover:text-yellow-500 transition-colors duration-300"
                    />
                  ) : (
                    <Moon
                      size={18}
                      className="group-hover:text-blue-500 transition-colors duration-300"
                    />
                  )}
                </div>
              </div>
              <span
                className={`transition-all duration-300 ${
                  isCollapsed && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'
                }`}
              >
                {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </span>
            </button>
          </div>
        </nav>

        {/* Footer mejorado */}
        <div
          className={`flex-shrink-0 px-4 py-4 border-t border-gray-200 dark:border-gray-800 transition-all duration-300 ${
            isCollapsed && !isMobile
              ? 'opacity-0 h-0 overflow-hidden py-0'
              : 'opacity-100 h-auto py-4'
          }`}
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>© 2024 BioLink IA</p>
            <p className="mt-1">Versión 2.0.1</p>
          </div>
        </div>

        {/* Custom Scrollbar Styles mejorados */}
        <style jsx>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 3px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, 0.3);
            border-radius: 3px;
            transition: background 0.3s ease;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(156, 163, 175, 0.5);
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:active {
            background: rgba(156, 163, 175, 0.7);
          }

          /* Animaciones personalizadas */
          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-in {
            animation: slideInFromTop 0.3s ease-out;
          }

          .slide-in-from-top-2 {
            animation: slideInFromTop 0.3s ease-out;
          }

          /* Efectos de glassmorphism para elementos premium */
          .glass-effect {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          /* Animación de pulso personalizada */
          @keyframes customPulse {
            0%,
            100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }

          .custom-pulse {
            animation: customPulse 2s ease-in-out infinite;
          }

          /* Transiciones suaves para elementos interactivos */
          .smooth-transition {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Efectos de hover mejorados */
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow:
              0 10px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }

          /* Animación de entrada escalonada */
          @keyframes staggerIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .stagger-in {
            animation: staggerIn 0.4s ease-out;
          }

          /* Responsive breakpoints personalizados */
          @media (max-width: 1024px) {
            .sidebar-responsive {
              width: 280px;
            }
          }

          @media (max-width: 768px) {
            .sidebar-responsive {
              width: 100%;
              max-width: 320px;
            }
          }
        `}</style>
      </aside>
    </>
  );
}

// Demo Component para mostrar el sidebar
function SidebarDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [plan, setPlan] = useState('free');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          plan={plan}
          onCollapseChange={setSidebarCollapsed}
        />

        {/* Contenido principal */}
        <main
          className={`flex-1 overflow-hidden transition-all duration-300 ${
            sidebarCollapsed ? 'ml-0' : 'ml-0'
          }`}
        >
          <div className="h-full p-6">
            {/* Header de la página principal */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleMenu}
                  className="lg:hidden p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Menu size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="free">Plan Free</option>
                  <option value="pro">Plan Pro</option>
                  <option value="enterprise">Plan Enterprise</option>
                </select>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Sidebar: {sidebarCollapsed ? 'Colapsado' : 'Expandido'}
                </div>
              </div>
            </div>

            {/* Contenido de demo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Estadísticas Principales
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Vista general de tu rendimiento
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    Sistema funcionando correctamente
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enlaces Activos
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">12</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Enlaces funcionando</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Visitantes Hoy
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  1,234
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">+15% vs ayer</p>
              </div>
            </div>

            {/* Instrucciones */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Funcionalidades Mejoradas
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>
                  • <strong>Transiciones suaves:</strong> Animaciones fluidas al expandir/contraer
                </li>
                <li>
                  • <strong>Responsividad mejorada:</strong> Comportamiento adaptativo según el
                  dispositivo
                </li>
                <li>
                  • <strong>Tooltips informativos:</strong> Información detallada en modo colapsado
                </li>
                <li>
                  • <strong>Efectos hover:</strong> Interacciones visuales mejoradas
                </li>
                <li>
                  • <strong>Gestión de estado:</strong> Memoria inteligente de secciones expandidas
                </li>
                <li>
                  • <strong>Auto-colapso en tablets:</strong> Optimización automática del espacio
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
