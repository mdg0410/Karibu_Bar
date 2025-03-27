import { Router } from 'express';

const router = Router();

// Rutas básicas para verificar que el servidor funciona
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default router;