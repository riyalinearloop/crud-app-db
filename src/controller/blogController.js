const blogService = require("../service/blogService");

const getBlogs = async (req, res) => {
  try {
    await blogService.getAllBlogs(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBlogsByUserId = async (req, res) => {
  try {
    await blogService.getBlogByUserId(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    await blogService.changeStatus(req, res);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

const getBlogsByStatus = async (req, res) => {
  try {
    await blogService.getBlogsByStatus(req, res);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

const getBlogsByStatusAndUser = async (req, res) => {
  try {
    await blogService.getBlogsByStatusAndUser(req, res);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await blogService.softDeleteBlog(req, res);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

const addCategoryToBlog = async (req, res) => {
  try {
    await blogService.addCategory(req, res);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};
const getBlogsByCategory = async (req, res) => {
  try {
    await blogService.getBlogsByCategory(req, res);
  } catch (error) {
    res.status(400).json({ error: error?.message });
  }
};

module.exports = {
  getBlogs,
  getAllBlogsByUserId,
  updateStatus,
  getBlogsByStatus,
  getBlogsByStatusAndUser,
  deleteBlog,
  addCategoryToBlog,
  getBlogsByCategory,
};
