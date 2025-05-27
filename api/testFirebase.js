// /api/testFirebase.js
import db from '../../lib/firebase-admin';

export default async function handler(req, res) {
  const { userId = '' } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Falta userId en la query: ?userId=ABC123' });
  }

  try {
    const userRef = db.collection('usuarios').doc(userId);
    const snap = await userRef.get();

    if (!snap.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado en Firestore' });
    }

    const data = snap.data();

    // Simulamos uso de IA
    const usos = data.usosIA || 0;
    const limite = data.limiteIA || 5;
    const plan = data.plan || 'free';

    if (usos >= limite) {
      return res.status(429).json({ status: 'bloqueado', usos, limite, plan });
    }

    await userRef.update({ usosIA: usos + 1 });

    return res.status(200).json({
      status: 'ok',
      mensaje: `Usuario ${userId} actualizado exitosamente`,
      usosIA: usos + 1,
      limiteIA: limite,
      plan,
    });
  } catch (error) {
    console.error('❌ Error en prueba Firebase:', error);
    return res.status(500).json({ error: 'Error de servidor', details: error.message });
  }
}
