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

  const getPostId = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await PostService.getPostId(id);

      if (!post) return res.status(404).json({ message: 'Post does not exist' });

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao fazer a requisição no banco de dados!',
        error: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { payload } = req;

    await PostService.updatePost({ id, title, content });
    const newPost = await PostService.getPostId(id);

    if (payload.data.id !== newPost.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    } 
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao fazer ao atualizar os dados no banco de dados!',
      error: error.message,
  });
  }
};

const excludePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { payload } = req;
    const post = await PostService.getPostId(id);
    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    if (payload.data.id !== post.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    await PostService.excludePost(id);
    return res.status(204).json({ message: 'Post deleted!' });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao excluir o post do banco de dados!',
      error: error.message,
  });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    const search = await PostService.searchPosts(q);
    console.log(search);
    const all = await PostService.getAllposts();
    if (!q) {
      return res.status(200).json(all);
    }
  
      return res.status(200).json(search);
  } catch (error) {
    return res.status(500).json({
      message: 'Busca não realizada!',
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllposts,
  getPostId,
  updatePost,
  excludePost,
  searchPosts,
};