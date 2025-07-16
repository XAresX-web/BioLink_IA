import React, { useState, useEffect } from 'react';
import {
  Eye,
  MousePointerClick,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Calendar,
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Heart,
  Share2,
  Download,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight,
  Info,
  Filter,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock4,
  Sparkles,
  Crown,
  Gift,
} from 'lucide-react';

export default function StatsPanel({
  views = 1247,
  clicks = 328,
  visitors = 892,
  engagement = 26.3,
  conversionRate = 12.5,
  topCountries = ['Mexico', 'Colombia', 'Argentina'],
  deviceBreakdown = { mobile: 68, desktop: 25, tablet: 7 },
  timeData = [
    { time: '00:00', views: 12, clicks: 3 },
    { time: '04:00', views: 8, clicks: 2 },
    { time: '08:00', views: 45, clicks: 12 },
    { time: '12:00', views: 78, clicks: 23 },
    { time: '16:00', views: 92, clicks: 28 },
    { time: '20:00', views: 65, clicks: 18 },
  ],
  recentActivity = [
    { type: 'view', country: 'Mexico', time: '2 min ago', device: 'mobile' },
    { type: 'click', country: 'Colombia', time: '5 min ago', device: 'desktop' },
    { type: 'view', country: 'Argentina', time: '8 min ago', device: 'mobile' },
  ],
  plan = 'free',
}) {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    views: 0,
    clicks: 0,
    visitors: 0,
    engagement: 0,
  });

  // Animate numbers on mount
  useEffect(() => {
    const animateNumber = (target, key, duration = 2000) => {
      const start = 0;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;

        setAnimatedValues((prev) => ({
          ...prev,
          [key]: current,
        }));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    animateNumber(views, 'views');
    animateNumber(clicks, 'clicks');
    animateNumber(visitors, 'visitors');
    animateNumber(engagement, 'engagement');
  }, [views, clicks, visitors, engagement]);

  const periods = [
    { key: 'today', label: 'Hoy', icon: Clock },
    { key: 'week', label: '7 días', icon: Calendar },
    { key: 'month', label: '30 días', icon: Calendar },
    { key: 'year', label: '1 año', icon: BarChart3 },
  ];

  const getChangeIcon = (change) => {
    if (change > 0) return <ArrowUp size={14} className="text-green-500" />;
    if (change < 0) return <ArrowDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-gray-400" />;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    bgColor,
    description,
    isPro = false,
    formatValue = (v) => Math.round(v).toLocaleString(),
    suffix = '',
  }) => (
    <div className="relative group overflow-hidden bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
      {isPro && plan === 'free' && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Crown size={10} />
            PRO
          </div>
        </div>
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`p-2 md:p-3 rounded-lg ${bgColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon
              size={20}
              className={`${color === 'blue' ? 'text-blue-600 dark:text-blue-400' : color === 'green' ? 'text-green-600 dark:text-green-400' : color === 'pink' ? 'text-pink-600 dark:text-pink-400' : 'text-purple-600 dark:text-purple-400'}`}
            />
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-1 text-xs md:text-sm font-medium ${getChangeColor(change)}`}
            >
              {getChangeIcon(change)}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1 md:space-y-2">
          <h3 className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 break-words">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <p
              className={`text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white ${isPro && plan === 'free' ? 'blur-sm' : ''}`}
            >
              {formatValue(value)}
              {suffix}
            </p>
            {isPro && plan === 'free' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl">
                <div className="text-center">
                  <Crown className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    Upgrade to PRO
                  </p>
                </div>
              </div>
            )}
          </div>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 break-words">{description}</p>
          )}
        </div>
      </div>

      <div
        className={`h-1 bg-gradient-to-r ${color === 'blue' ? 'from-blue-500 to-blue-600' : color === 'green' ? 'from-green-500 to-green-600' : color === 'pink' ? 'from-pink-500 to-pink-600' : 'from-purple-500 to-purple-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      ></div>
    </div>
  );

  const QuickStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <StatCard
        title="Vistas Totales"
        value={animatedValues.views}
        change={15.2}
        icon={Eye}
        color="blue"
        bgColor="bg-blue-50 dark:bg-blue-900/20"
        description="Visitantes únicos a tu página"
      />
      <StatCard
        title="Clics Totales"
        value={animatedValues.clicks}
        change={8.7}
        icon={MousePointerClick}
        color="green"
        bgColor="bg-green-50 dark:bg-green-900/20"
        description="Interacciones con tus enlaces"
      />
      <StatCard
        title="Tasa de Engagement"
        value={animatedValues.engagement}
        change={-2.1}
        icon={Heart}
        color="pink"
        bgColor="bg-pink-50 dark:bg-pink-900/20"
        description="Nivel de interacción promedio"
        suffix="%"
        formatValue={(v) => v.toFixed(1)}
      />
      <StatCard
        title="Conversiones"
        value={conversionRate}
        change={12.4}
        icon={Target}
        color="purple"
        bgColor="bg-purple-50 dark:bg-purple-900/20"
        description="Acciones completadas"
        suffix="%"
        isPro={true}
      />
    </div>
  );

  const DetailedStats = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="text-blue-500" size={18} />
              Actividad en Tiempo Real
            </h3>
            <button className="flex items-center gap-2 text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors self-start sm:self-center">
              <RefreshCw size={14} />
              Actualizar
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 md:gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${
                    activity.type === 'view'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : activity.type === 'click'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : activity.type === 'share'
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                  }`}
                >
                  {activity.type === 'view' && <Eye size={14} />}
                  {activity.type === 'click' && <MousePointerClick size={14} />}
                  {activity.type === 'share' && <Share2 size={14} />}
                  {activity.type === 'download' && <Download size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {activity.type === 'view' && 'Nueva vista'}
                    {activity.type === 'click' && 'Nuevo clic'}
                    {activity.type === 'share' && 'Compartido'}
                    {activity.type === 'download' && 'Descarga'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {activity.country} • {activity.device} • {activity.time}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {activity.device === 'mobile' && (
                    <Smartphone size={12} className="text-gray-400" />
                  )}
                  {activity.device === 'desktop' && <Monitor size={12} className="text-gray-400" />}
                  {activity.device === 'tablet' && <Tablet size={12} className="text-gray-400" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="text-green-500" size={18} />
            Top Países
          </h3>
          <div className="space-y-3">
            {topCountries.map((country, index) => (
              <div key={country} className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {country}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-12 md:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(3 - index) * 30}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                    {(3 - index) * 30}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Monitor className="text-purple-500" size={18} />
            Dispositivos
          </h3>
          <div className="space-y-3 md:space-y-4">
            {Object.entries(deviceBreakdown).map(([device, percentage]) => (
              <div key={device} className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  {device === 'mobile' && (
                    <Smartphone size={14} className="text-blue-500 flex-shrink-0" />
                  )}
                  {device === 'desktop' && (
                    <Monitor size={14} className="text-green-500 flex-shrink-0" />
                  )}
                  {device === 'tablet' && (
                    <Tablet size={14} className="text-purple-500 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize truncate">
                    {device}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-12 md:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        device === 'mobile'
                          ? 'bg-blue-500'
                          : device === 'desktop'
                            ? 'bg-green-500'
                            : 'bg-purple-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6 max-w-full overflow-hidden">
      {/* Header with Period Selector */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Estadísticas de Rendimiento
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Monitorea el rendimiento de tu BioLink en tiempo real
          </p>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 w-full lg:w-auto overflow-x-auto">
            {periods.map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedPeriod === period.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <period.icon size={14} />
                <span className="hidden sm:inline">{period.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <QuickStats />
          <DetailedStats />
        </>
      )}

      {/* Pro Features Banner */}
      {plan === 'free' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Desbloquea Análisis Avanzados
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm mb-3 md:mb-4">
                Obtén métricas detalladas, análisis de conversiones, mapas de calor y mucho más con
                nuestro plan PRO.
              </p>
              <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                <span className="px-2 md:px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-full text-xs font-medium">
                  📊 Análisis en tiempo real
                </span>
                <span className="px-2 md:px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-full text-xs font-medium">
                  🎯 Tracking de conversiones
                </span>
                <span className="px-2 md:px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-full text-xs font-medium">
                  🔥 Mapas de calor
                </span>
              </div>
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-sm md:text-base">
                <Crown size={16} />
                Upgrade a PRO
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
