import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración correcta de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDVUGVYLHdbTHO0A6UexYEXYw-9LuvlVuA',
  authDomain: 'biolink-ai.firebaseapp.com',
  projectId: 'biolink-ai',
  storageBucket: 'biolink-ai.appspot.com', // ✅ corregido
  messagingSenderId: '770377840002',
  appId: '1:770377840002:web:f98dee4916825f36250b9b',
  measurementId: 'G-WC8QPBGQXW',
};

// Inicializar la app solo una vez
const app = initializeApp(firebaseConfig);

// Servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
