const { STATUS } = require("../key");
const { Blog } = require("../model/blogSchema");
const { User } = require("../model/userSchema");
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({ isDeleted: false });
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBlogByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blogs = await Blog.find({ userId: userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Something2 went wrong!" });
  }
};

const changeStatus = async (req, res) => {
  if (!Object.values(STATUS).includes(req.body.status)) {
    throw new Error("Invalid status");
  }
  try {
    const status = req.body.status;
    const blogExist = await Blog.findById(req.params.id);
    if (!blogExist) {
      res.status(400).json({ error: "Blog not found" });
    } else {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req?.params?.id,
        { status },
        { new: true }
      );
      res
        .status(200)
        .json({ updatedBlog, message: "Blog updated successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Something1 went wrong" });
  }
};

const getBlogsByStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.query;

  if (!Object.values(STATUS).includes(status)) {
    throw new Error("Invalid status");
  }
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
      res.status(400).json({ error: "User not found" });
    } else {
      const blogs = await Blog.find({ userId: userId, status });

      if (!blogs.length) {
        return res
          .status(404)
          .json({ error: "No blogs found with the specified status" });
      }
      res.status(200).json(blogs);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getBlogsByStatusAndUser = async (req, res) => {
  const { status, userId } = req.query;

  try {
    const queryConditions = {
      isDeleted: false,
    };

    if (userId) {
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }
      queryConditions.userId = userId;
    }

    if (status) {
      if (!Object.values(STATUS).includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      queryConditions.status = status;
    }
    const blogs = await Blog.find(queryConditions);

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ error: "No blogs found matching the specified criteria" });
    }

    res.status(200).json({ count: blogs.length, blogs: blogs });
  } catch (error) {
    console.error("Error in getBlogsByStatusAndUser:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogExist = await Blog.findById(req.params.id);
    if (!blogExist) {
      res.status(400).json({ error: "Blog is not found" });
    } else {
      await Blog.findByIdAndUpdate(req.params.id, { isDeleted: true });
      res.status(200).json({ message: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const commonController = async (req, res) => {
  try {
    await Blog.updateMany({}, { $set: { isDeleted: false } });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllBlogs,
  getBlogByUserId,
  changeStatus,
  getBlogsByStatus,
  getBlogsByStatusAndUser,
  deleteBlog,
  commonController,
};
