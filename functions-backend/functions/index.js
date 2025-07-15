const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Configuration, OpenAIApi } = require('openai');

admin.initializeApp();

const configuration = new Configuration({
  apiKey: functions.config().openai.key, // Clave segura
});
const openai = new OpenAIApi(configuration);

// Función para generar bio con OpenAI
exports.generarBio = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Método no permitido');
  }

  const { nombre, profesion, userId } = req.body;

  if (!userId || !nombre || !profesion) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  try {
    const prompt =
      `Genera una biografía profesional breve (máx 300 caracteres), ` +
      `amigable y creativa para una tarjeta de perfil. ` +
      `Nombre: ${nombre} | Profesión: ${profesion}`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });

    const bio = response.data.choices[0].message.content.trim();
    res.status(200).json({ bio });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al generar la bio' });
  }
});
