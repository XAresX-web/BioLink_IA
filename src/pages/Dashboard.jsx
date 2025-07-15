import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import UserProfileEditor from '../components/UserProfileEditor';
import StatsPanel from '../components/StatsPanel';
import PlanCard from '../components/PlanCard';
import ProfilePreview from '../components/ProfilePreview';
import { Share2 } from 'lucide-react';

export default function Dashboard({ user, db, darkMode, toggleDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);

  {
    data && (
      <Sidebar
        menuOpen={menuOpen}
        toggleMenu={() => setMenuOpen(!menuOpen)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        plan={data.plan}
      />
    );
  }

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;
      try {
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setData(snap.data());
        }
      } catch (error) {
        console.error('❌ Error al cargar perfil:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [user]);

  if (loading) return <div className="p-6 text-gray-800 dark:text-white">Cargando...</div>;
  if (!data) return <div className="p-6 text-red-500">No se encontraron datos del perfil.</div>;

  if (mostrarVistaPrevia) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-gray-200 dark:from-neutral-900 dark:to-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Botón para regresar */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => setMostrarVistaPrevia(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Volver al panel
          </button>
        </div>

        {/* Marco del móvil */}
        <div className="relative bg-black rounded-[2.5rem] border-[14px] border-neutral-800 dark:border-neutral-700 shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-[390px] h-[844px] flex flex-col items-center justify-start">
          {/* Notch superior */}
          <div className="absolute top-2 w-24 h-1.5 rounded-full bg-neutral-500 dark:bg-neutral-400 opacity-30" />

          {/* Barra superior estilo app */}
          <div className="w-full px-4 py-2 flex items-center justify-between bg-neutral-900 text-white text-xs font-semibold rounded-t-[2rem]">
            <span>BioLink IA</span>
            <button
              className="flex items-center gap-1 hover:text-primary transition"
              title="Compartir"
              onClick={() => alert('🔗 Enlace copiado (simulado)')}
            >
              <Share2 size={16} />
              <span>Compartir</span>
            </button>
          </div>

          {/* Contenido desplazable */}
          <div className="w-full flex-1 overflow-y-auto p-4 bg-white dark:bg-neutral-900 rounded-b-[2rem]">
            <ProfilePreview data={data} />
          </div>
        </div>

        {/* Brillo de fondo sutil */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-2xl opacity-30 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-800 dark:text-white flex">
      {/* Sidebar */}
      {data && (
        <>
          <Sidebar
            menuOpen={menuOpen}
            toggleMenu={() => setMenuOpen(!menuOpen)}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            plan={data.plan}
          />

          <button
            className="md:hidden fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 transition-all duration-300">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setMostrarVistaPrevia(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            👁️ Vista previa
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-semibold">Panel</h2>
          <button
            onClick={() =>
              setData({ ...data, enlaces: [...data.enlaces, { tipo: 'personalizado', url: '' }] })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar enlace
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Editor del perfil */}
          <UserProfileEditor data={data} setData={setData} />

          {/* Panel derecho */}
          <div className="col-span-1 xl:col-span-2 space-y-6">
            <StatsPanel views={1578} clicks={326} />

            <button
              onClick={async () => {
                try {
                  const ref = doc(db, 'usuarios', user.uid);
                  await setDoc(ref, data);
                  alert('✅ Cambios guardados');
                } catch (error) {
                  console.error('❌ Error al guardar:', error);
                }
              }}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Guardar cambios
            </button>

            <PlanCard plan={data.plan} />
          </div>
        </div>
      </main>
    </div>
  );
}
