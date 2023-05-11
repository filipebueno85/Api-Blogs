const { Category } = require('../models');

const createCategory = async ({ name }) => {
  const category = await Category.create({ name });

  return category;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getCategoryId = async (id) => {
  const category = await Category.findOne({
    where: { id },
  });
  // console.log(category);
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryId,
};