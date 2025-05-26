import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

export default function Perfil({ db }) {
  const { slug } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        let encontrado = null;

        querySnapshot.forEach((doc) => {
          if (doc.data().slug === slug) {
            encontrado = doc.data();
          }
        });

        setPerfil(encontrado);
      } catch (error) {
        console.error("Error al cargar el perfil público:", error);
      } finally {
        setCargando(false);
      }
    };

    buscarUsuario();
  }, [slug, db]);

  if (cargando) return <div className="text-white p-8">Cargando perfil...</div>;

  if (!perfil) {
    return <div className="text-white p-8">❌ Perfil no encontrado</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <img
        src={perfil.avatar}
        alt="Avatar"
        className="w-24 h-24 rounded-full mb-4 border-2 border-white"
      />
      <h1 className="text-2xl font-bold">{perfil.nombre}</h1>
      <p className="text-gray-400 text-sm mt-2">{perfil.bio}</p>

      <div className="mt-6 w-full max-w-md space-y-3">
        {perfil.enlaces.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#1db954] hover:bg-[#17a144] text-center text-white py-2 rounded transition-all"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
