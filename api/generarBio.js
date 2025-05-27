export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, profesion } = req.body;

  const prompt = `
Genera una biografía profesional breve (máx 300 caracteres), amigable y creativa para una tarjeta de perfil.
Nombre: ${nombre}
Profesión: ${profesion}
Estilo: humano, moderno, inspirador, con un toque personal.
No pongas comillas ni emojis. Devuelve solo el texto directo.
`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const json = await openaiRes.json();
    const bio = json.choices?.[0]?.message?.content?.trim();

    res.status(200).json({ resultado: bio });
  } catch (error) {
    console.error('❌ Error en la API:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
