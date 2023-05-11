const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');

const getPostId = async (id) => {
  const category = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
    attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] }, 
    }],
  });
  return category;
};

const getAllposts = async () => {
  const posts = await BlogPost.findAll({
    // where: { id },
    include: [{
      model: User,
      as: 'user',
      // through: { attributes: [] },
    attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] }, 
      // attributes,
    }],
  });
  return posts;
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
};
const updatePost = async ({ id, title, content }) => {
  const [post] = await BlogPost.update(
      { title, content },
      { where: { id } },
    );
    return post;
  };

  const excludePost = async (id) => {
    const post = await BlogPost.destroy(
      { where: { id } },
    );
    return post;
  };

module.exports = {
  createPost,
  getPostId,
  getAllposts,
  updatePost,
  excludePost,
};