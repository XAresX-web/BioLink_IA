// Proyecto base de AI BioLink SaaS con rutas dinámicas, Firebase y edición automática
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Páginas principales
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Dashboard from "./pages/Dashboard";
import Gracias from "./pages/Gracias";
import Planes from "./pages/PricingPlans";

// Configuración Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const slug = user.displayName
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^\w\-]/g, "");

      const userRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const nuevoUsuario = {
          uid: user.uid,
          nombre: user.displayName,
          email: user.email,
          enlaces: [],
          bio: "Generando biografía con IA...",
          slug: slug,
          avatar: user.photoURL,
          plan: "free",
          creadoEn: new Date().toISOString(),
        };

        await setDoc(userRef, nuevoUsuario);
        console.log("✅ Usuario creado en Firestore:", nuevoUsuario);
      } else {
        console.log("ℹ️ Usuario ya existe en Firestore.");
      }
    } catch (error) {
      console.error("❌ Error durante el login:", error);
    }
  };

  const logout = () => signOut(auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home user={user} login={login} logout={logout} />}
        />
        <Route path="/dashboard" element={<Dashboard user={user} db={db} />} />
        <Route path="/:slug" element={<Perfil db={db} />} />
        <Route path="/gracias" element={<Gracias user={user} db={db} />} />
        <Route path="/precios" element={<Planes />} />
      </Routes>
    </Router>
  );
}

export default App;
