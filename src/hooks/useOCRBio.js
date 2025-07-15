import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export function useOCRBio({ onSuccess }) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const procesarImagen = async (file) => {
    if (!file) return;

    try {
      setCargando(true);
      setError(null);

      const comprimida = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;

        const res = await fetch('/api/ocrBio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imagenBase64: base64 }),
        });

        const json = await res.json();

        if (json.optimizada) {
          onSuccess(json.optimizada);
        } else {
          setError('No se pudo optimizar la bio.');
        }

        setCargando(false);
      };

      reader.readAsDataURL(comprimida);
    } catch (err) {
      console.error('OCR Bio error:', err);
      setError('Error procesando la imagen.');
      setCargando(false);
    }
  };

  return {
    procesarImagen,
    cargando,
    error,
  };
}
