import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  // dividir o token
  const [, token] = authHeader.split(' ');

  try {
    // promisify retorna outra function
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // incluindo id dentro da req
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }
};
