const { BlogPost, PostCategory, sequelize } = require('../models');
// const CategoryService = require('./category.service');

const getPostId = async (id) => {
  const category = await BlogPost.findAll({
    where: { id },
    include: [{ through: { attributes: [] }, attributes: { include: ['published', 'updated'] } }],
  });
  // console.log(category);
  return category;
};

const createPost = async ({ title, content, categoryIds, userId, updated, published }) => {
//   const categories = await Promise.all(
//     categoryIds.map(async (categoryId) => CategoryService.getCategoryId(categoryId)),
// );
//   if (categories) return { message: 'one or more "categoryIds" not found' };
  const result = await sequelize.transaction(async (t) => {
    const posts = await BlogPost.create({
      title, content, userId, updated, published,
    }, { transaction: t });
    await Promise.all(categoryIds.map(async (categoryId) => {
      await PostCategory.create({ categoryId, postId: posts.id }, { transaction: t });
    }));
    return posts;
  });

  return result;
  // const post = await BlogPost.create({ title, content, categoryIds });
};

module.exports = {
  createPost,
  getPostId,
};