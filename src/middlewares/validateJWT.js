const { verifyToken } = require('../auth/auth');

const validateJwt = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    } 

    const data = verifyToken(authorization);
    req.payload = data;
    next();
  } catch (error) {
    return res.status(500)
    .json({ 
      message: 'Expired or invalid token', 
      error: 'Expired or invalid token' });
  }
};

module.exports = validateJwt;