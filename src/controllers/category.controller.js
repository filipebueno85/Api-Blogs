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

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategorySevice.getAllCategories();
    if (!categories) throw Error;

    return res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar as categorias no banco',
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};