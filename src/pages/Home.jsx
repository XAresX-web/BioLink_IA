import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { LogOut, ArrowRight, User } from "lucide-react";

const Home = ({ user, login, logout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] text-white flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400 drop-shadow">
          AI BioLink 🚀
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
          Centraliza tu presencia online en un solo enlace inteligente.
          Impulsado por IA. Personalizable. Profesional. Tu nueva identidad
          digital empieza aquí.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <>
              <p className="text-green-300 font-medium flex items-center gap-2">
                <User size={18} /> Bienvenido, {user.displayName}
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 text-base font-semibold"
              >
                Ir al Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Button
              onClick={login}
              className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-green-400 to-lime-400 hover:brightness-110 transition shadow-xl rounded-xl"
            >
              Iniciar sesión con Google
            </Button>
          )}
        </div>
        <footer className="pt-10 text-sm text-gray-500">
          Hecho con 💚 por Luis · AI BioLink © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};

export default Home;
