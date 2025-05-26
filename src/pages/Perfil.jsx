// Perfil.jsx (versión rediseñada con animaciones, tema pro y botones mejorados)
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

  if (cargando)
    return (
      <div className="text-center text-white p-10 animate-pulse">
        Cargando perfil...
      </div>
    );

  if (!perfil) {
    return (
      <div className="text-white p-8 text-center">❌ Perfil no encontrado</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-10 animate-fade-in">
      <img
        src={perfil.avatar || "https://i.pravatar.cc/150"}
        alt="Avatar"
        className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
      />
      <h1 className="text-3xl font-bold mb-1 text-center">{perfil.nombre}</h1>
      <p className="text-gray-300 text-sm text-center max-w-md mb-6">
        {perfil.bio}
      </p>

      <div className="mt-4 w-full max-w-md space-y-4">
        {perfil.enlaces.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-medium text-center py-3 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            🔗 {link.replace(/^https?:\/\//, "")}
          </a>
        ))}
      </div>

      <div className="mt-10 text-xs text-gray-500 text-center">
        Hecho con 💚 en{" "}
        <span className="font-semibold text-[#1db954]">AI BioLink</span>
      </div>

      <div className="mt-6">
        <a
          href="/precios"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition-all shadow-lg"
        >
          Ver planes PRO
        </a>
      </div>
    </div>
  );
}
