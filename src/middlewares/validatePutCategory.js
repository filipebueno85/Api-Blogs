const validatePutCategory = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  if (!content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = validatePutCategory;
