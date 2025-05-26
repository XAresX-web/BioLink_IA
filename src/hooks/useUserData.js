import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase"; // ajusta si no lo tienes separado

export default function useUserData() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const userRef = doc(db, "usuarios", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          const username = firebaseUser.displayName
            .toLowerCase()
            .replace(/\s+/g, "");
          const newUser = {
            nombre: firebaseUser.displayName,
            email: firebaseUser.email,
            enlaces: [],
            bio: "Generando biografía con IA...",
            slug: username,
            avatar: firebaseUser.photoURL,
            plan: "free",
          };
          await setDoc(userRef, newUser);
          setUserData(newUser);
        } else {
          setUserData(userSnap.data());
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, userData };
}
