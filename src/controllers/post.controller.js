const PostService = require('../services/post.service');
// const CategoryService = require('../services/category.service');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { payload } = req;
    const post = await PostService.createPost({ 
      title, 
      content, 
      categoryIds, 
      userId: payload.data.id,
      updated: new Date(),
      published: new Date(),
    });
    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao cadastrar o post no banco de dados!',
      error: error.message,
    });
  }
  };

  const getAllposts = async (req, res) => {
    try {
      const posts = await PostService.getAllposts();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao fazer a requisição no banco de dados!',
        error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllposts,
};