// const { createToken } = require('../auth/auth');
const CategorySevice = require('../services/category.service');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    const category = await CategorySevice.createCategory({ name });

    if (!category) throw Error;
  
    return res
      .status(201)
      .json(category);
  } catch (err) {
    return res.status(500).json({
      message: 'Erro ao cadastrar a categoria no banco de dados!',
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
};