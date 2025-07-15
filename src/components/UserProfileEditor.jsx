import React, { useState } from 'react';
import { Globe, BookOpen, ShoppingBag, ShieldOff, Link as LinkIcon } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Sparkles, Loader2, UploadCloud } from 'lucide-react';
import { useOCRBio } from '../hooks/useOCRBio';

const profesiones = [
  'Infoproductor',
  'Modelo',
  'Coach',
  'Filmmaker',
  'Actor',
  'Psicólogo',
  'Diseñador',
  'Streamer',
  'Empresario',
  'Creador de contenido',
];

const tiposEnlace = [
  { tipo: 'red-social', label: 'Red social', icono: <Globe className="w-5 h-5" /> },
  { tipo: 'curso', label: 'Curso / Infoproducto', icono: <BookOpen className="w-5 h-5" /> },
  { tipo: 'tienda', label: 'Tienda / Shopify', icono: <ShoppingBag className="w-5 h-5" /> },
  { tipo: 'contenido-18', label: 'Contenido +18', icono: <ShieldOff className="w-5 h-5" /> },
  { tipo: 'personalizado', label: 'Otro', icono: <LinkIcon className="w-5 h-5" /> },
];

export default function UserProfileEditor({ data, setData }) {
  const [generando, setGenerando] = useState(false);
  const [iaRespuesta, setIaRespuesta] = useState('');

  const generarBioIA = async () => {
    try {
      setGenerando(true);

      const nombre = data.nombre?.trim() || 'Usuario';
      const profesion = data.profesion?.trim() || 'Creador digital';

      const prompt = `
Genera una biografía profesional breve (máx 300 caracteres), amigable y creativa para una tarjeta de perfil.
Nombre: ${nombre}
Profesión: ${profesion}
Estilo: humano, moderno, inspirador, con un toque personal.
No pongas comillas ni emojis. Devuelve solo el texto directo.
`;

      const response = await fetch('/api/generarBio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, profesion }),
      });

      const result = await response.json();
      const bioGenerada = result.choices?.[0]?.message?.content?.trim();

      if (bioGenerada) {
        setIaRespuesta(bioGenerada);
        setData({ ...data, bio: bioGenerada });
      } else {
        alert('❌ No se pudo generar una biografía. Intenta nuevamente.');
        console.warn('⚠️ Respuesta OpenAI sin contenido:', result);
      }
    } catch (error) {
      console.error('❌ Error generando biografía con IA:', error);
      alert('❌ Ocurrió un error con la IA. Revisa tu conexión o clave API.');
    } finally {
      setGenerando(false);
    }
  };

  const { procesarImagen, cargando, error } = useOCRBio({
    onSuccess: (bio) => {
      setIaRespuesta(bio);
      setData({ ...data, bio });
    },
  });

  const agregarEnlace = (tipo) => {
    const nuevo = [...data.enlaces, { tipo, url: '' }];
    setData({ ...data, enlaces: nuevo });
  };

  return (
    <div className="col-span-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 text-left shadow-sm transition-all">
      <div className="flex flex-col items-center mb-8">
        <img
          src={data.avatar || 'https://i.pravatar.cc/150'}
          alt="Avatar"
          className="w-24 h-24 rounded-full ring-4 ring-primary shadow mb-3"
        />
        <input
          type="text"
          className="text-xl font-bold text-center w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-black dark:text-white mb-2"
          placeholder="Tu nombre"
          value={data.nombre}
          onChange={(e) => setData({ ...data, nombre: e.target.value })}
        />
        <div className="w-full mt-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">¿A qué te dedicas?</label>
          <select
            className="w-full mt-1 p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 text-sm text-black dark:text-white border border-gray-300 dark:border-neutral-700"
            value={data.profesion || ''}
            onChange={(e) => setData({ ...data, profesion: e.target.value })}
          >
            <option value="">Selecciona una profesión</option>
            {profesiones.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
          <Sparkles size={16} /> Biografía inteligente
        </label>

        <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow p-4 space-y-3">
          <textarea
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-sm text-black dark:text-white resize-none"
            rows={4}
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            placeholder="Describe quién eres, o deja que la IA lo haga por ti…"
          />
          <div className="flex items-center justify-between mt-2 gap-2">
            <button
              onClick={generarBioIA}
              disabled={generando}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:brightness-110 transition disabled:opacity-50"
            >
              {generando ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Generando…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Generar con IA
                </>
              )}
            </button>

            {data.plan === 'pro' && (
              <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:text-primary transition">
                <UploadCloud size={18} />
                <span>Subir screenshot</span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => procesarImagen(e.target.files[0])}
                />
              </label>
            )}
          </div>
        </div>

        {cargando && <p className="text-sm text-primary mt-2">⏳ Analizando imagen con IA...</p>}
        {error && <p className="text-sm text-red-500 mt-2">❌ {error}</p>}
        {iaRespuesta && (
          <div className="bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 p-4 rounded-xl text-sm text-gray-800 dark:text-white shadow-inner">
            <strong className="block mb-2 text-primary">💡 Consejo de IA:</strong>
            <p className="whitespace-pre-wrap">{iaRespuesta}</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Enlaces</label>
        <div className="mt-3 space-y-3">
          {data.enlaces.map((enlace, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                placeholder={`(${enlace.tipo}) https://`}
                className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-sm text-black dark:text-white"
                value={enlace.url}
                onChange={(e) => {
                  const actualizados = [...data.enlaces];
                  actualizados[i].url = e.target.value;
                  setData({ ...data, enlaces: actualizados });
                }}
              />
              <button
                onClick={() => {
                  const filtrados = data.enlaces.filter((_, index) => index !== i);
                  setData({ ...data, enlaces: filtrados });
                }}
                className="text-red-500 hover:text-red-700 p-1 rounded"
                title="Eliminar enlace"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-400 mb-2">Agregar nuevo enlace:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tiposEnlace.map((op) => (
            <button
              key={op.tipo}
              onClick={() => agregarEnlace(op.tipo)}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-primary hover:shadow transition group"
            >
              <div className="p-2 rounded-full bg-primary/10 text-primary">{op.icono}</div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary">
                {op.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
