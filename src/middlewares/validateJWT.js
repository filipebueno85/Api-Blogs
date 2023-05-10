const { verifyToken } = require('../auth/auth');

const validateJwt = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Insira um token válido!' });
    } 

    const data = verifyToken(authorization);
    req.payload = data;
    next();
  } catch (error) {
    return res.status(500)
    .json({ 
      message: 'Erro ao acessar o endpoint', 
      error: 'É necessário um token válido para esse endpoint' });
  }
};

module.exports = validateJwt;