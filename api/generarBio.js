// 🔄 2. Versión avanzada de /api/generarBio.js con control de IA por usuario
import db from '../../lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, profesion, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Falta userId' });
  }

  const prompt = `
Genera una biografía profesional breve (máx 300 caracteres), amigable y creativa para una tarjeta de perfil.
Nombre: ${nombre}
Profesión: ${profesion}
Estilo: humano, moderno, inspirador, con un toque personal.
No pongas comillas ni emojis. Devuelve solo el texto directo.
`;

  try {
    const userRef = db.collection('usuarios').doc(userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado en Firestore' });
    }

    const userData = userSnap.data();
    const usos = userData.usosIA || 0;
    const limite = userData.limiteIA || 5;

    if (usos >= limite) {
      return res.status(429).json({ error: 'Límite de IA alcanzado para este usuario' });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const json = await openaiRes.json();
    const bio = json.choices?.[0]?.message?.content?.trim();
    const usage = json.usage;
    const costoEstimado = usage
      ? (((usage.prompt_tokens + usage.completion_tokens) / 1000) * 0.0015).toFixed(6)
      : null;

    await userRef.update({ usosIA: usos + 1 });

    console.log(
      `📤 Tokens usados: ${usage?.prompt_tokens + usage?.completion_tokens} (~$${costoEstimado} USD)`
    );

    res.status(200).json({
      resultado: bio,
      tokens: usage?.prompt_tokens + usage?.completion_tokens || 0,
      costo: costoEstimado || 'N/A',
    });
  } catch (error) {
    console.error('❌ Error en la generación de bio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
