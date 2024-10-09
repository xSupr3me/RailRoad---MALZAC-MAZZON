import jwt from 'jsonwebtoken';
import { secret } from '../controller/userController.js';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Vérification du token avec la clé secrète
    const decoded = jwt.verify(token, secret);
    req.user = decoded;  // Assigner l'utilisateur décodé à req.user pour l'utiliser dans les routes protégées
    console.log('decoded', decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
