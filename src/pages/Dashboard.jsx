// Dashboard.jsx (versión con componentes divididos)
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import UserProfileEditor from "../components/UserProfileEditor";
import StatsPanel from "../components/StatsPanel";
import PlanCard from "../components/PlanCard";

export default function Dashboard({ user, db }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setData(snap.data());
        }
      } catch (error) {
        console.error("❌ Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [user]);

  if (loading) return <div className="text-white p-6">Cargando...</div>;
  if (!data)
    return (
      <div className="text-red-500 p-6">
        No se encontraron datos del perfil.
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row">
      <Sidebar menuOpen={menuOpen} toggleMenu={() => setMenuOpen(!menuOpen)} />

      {/* Mobile menu button */}
      <button
        className="md:hidden absolute top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-semibold">Dashboard</h2>
          <button
            onClick={() => setData({ ...data, enlaces: [...data.enlaces, ""] })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar enlace
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <UserProfileEditor data={data} setData={setData} />
          <div className="col-span-1 xl:col-span-2 space-y-6">
            <StatsPanel />

            <button
              onClick={async () => {
                try {
                  const ref = doc(db, "usuarios", user.uid);
                  await setDoc(ref, data);
                  alert("✅ Cambios guardados");
                } catch (error) {
                  console.error("❌ Error al guardar:", error);
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
