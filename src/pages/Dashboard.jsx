// Dashboard.jsx (versión responsive con diseño profesional + lógica funcional)
import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  if (!data) return <div className="text-red-500 p-6">No se encontraron datos del perfil.</div>;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className={`md:w-64 w-full md:block ${menuOpen ? 'block' : 'hidden'} md:relative absolute bg-gray-100 border-r border-gray-200 p-6 z-50`}>
        <h1 className="text-2xl font-bold mb-6">
          AI<span className="text-gray-500"> BioLink</span><sup className="text-xs ml-1 text-gray-400">PRO</sup>
        </h1>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 text-sm font-medium text-black bg-gray-200 px-4 py-2 rounded">🧭 Dashboard</button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">🔗 Enlaces</button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">⚙️ Ajustes</button>
        </nav>
      </aside>

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
          <button onClick={() => setData({ ...data, enlaces: [...data.enlaces, ""] })} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Agregar enlace
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Perfil */}
          <div className="col-span-1 bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <img src={data.avatar || "https://i.pravatar.cc/150"} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold">{data.nombre}</h3>
            <p className="text-sm text-gray-500">{data.bio}</p>

            <textarea
              className="w-full mt-4 p-2 rounded bg-gray-100 border border-gray-300 text-sm"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
            />

            <div className="mt-4 space-y-2">
              {data.enlaces.map((enlace, i) => (
                <input
                  key={i}
                  className="w-full p-2 rounded bg-gray-100 border border-gray-300 text-sm"
                  value={enlace}
                  onChange={(e) => {
                    const updated = [...data.enlaces];
                    updated[i] = e.target.value;
                    setData({ ...data, enlaces: updated });
                  }}
                />
              ))}
            </div>
          </div>

          {/* Estadísticas y Plan */}
          <div className="col-span-1 xl:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">Vistas totales</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <p className="text-sm text-gray-500">Clicks totales</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>

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

            {data.plan === "free" ? (
              <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                <h2 className="text-lg font-semibold text-yellow-600">Estás en el plan gratuito</h2>
                <p className="text-sm text-yellow-800">Desbloquea temas premium, más enlaces y estadísticas avanzadas.</p>
                <button
                  onClick={() => window.location.href = "https://tu-checkout-stripe.com"}
                  className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
                >
                  🔓 Actualizar a PRO
                </button>
              </div>
            ) : (
              <div className="p-4 bg-green-100 rounded-lg border border-green-300">
                <h2 className="text-lg font-semibold text-green-600">¡Tienes el plan PRO!</h2>
                <p className="text-sm text-green-800">Accede a todas las funciones premium.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
