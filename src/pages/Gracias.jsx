// src/pages/Gracias.jsx
import { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Gracias({ user, db }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const actualizarPlan = async () => {
        const ref = doc(db, "usuarios", user.uid);
        await updateDoc(ref, { plan: "pro" });
        navigate("/dashboard");
      };
      actualizarPlan();
    }
  }, [user]);

  return (
    <div className="text-white p-8">
      ¡Gracias por tu compra! Redirigiendo a tu dashboard...
    </div>
  );
}
