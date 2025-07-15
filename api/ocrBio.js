export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { imagenBase64 } = req.body;
  if (!imagenBase64) {
    return res.status(400).json({ error: 'No se recibió la imagen' });
  }

  try {
    // 1. Enviar a OCR.space
    const ocrResponse = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: { apikey: process.env.OCR_API_KEY },
      body: new URLSearchParams({
        base64Image: imagenBase64,
        language: 'spa', // o 'eng'
        isOverlayRequired: 'false',
      }),
    });

    const ocrData = await ocrResponse.json();
    const textoExtraido = ocrData?.ParsedResults?.[0]?.ParsedText?.trim();

    if (!textoExtraido) {
      return res.status(500).json({ error: 'No se pudo extraer texto de la imagen' });
    }

    // 2. Enviar a OpenAI para optimizar
    const prompt = `
    Optimiza la siguiente biografía detectada por OCR desde una imagen:
    - Hazla más atractiva para redes sociales
    - Hazla profesional, clara y viral
    - Mantén máximo 300 caracteres

    Biografía original: ${textoExtraido}
    Responde solo con la versión optimizada.`;

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
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

    const aiData = await aiRes.json();
    const optimizada = aiData.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({ optimizada });
  } catch (error) {
    console.error('❌ Error en /api/ocrBio:', error);
    return res.status(500).json({ error: 'Error interno al procesar la imagen' });
  }
}
