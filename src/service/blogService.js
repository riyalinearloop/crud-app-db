const { STATUS } = require("../key");
const { Blog } = require("../model/blogSchema");
const { User } = require("../model/userSchema");
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
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

const getCommonBlogs = async (req, res) => {
  const { status, userId } = req.query;
  console.log("status, userId: ", status, userId);

  try {
    let whereQuery = {};
    if (userId) {
      whereQuery = {
        userId: userId,
      };
      const userExist = await User.findById(userId);
      if (!userExist) {
        res.status(400).json({ error: "User not found" });
      }
    }
    if (status) {
      if (!Object.values(STATUS).includes(status)) {
        throw new Error("Invalid status");
      }
      whereQuery = {
        ...whereQuery,
        status: status,
      };
    }

    console.log("whereQuery: ", whereQuery);
    const blogs = await Blog.find(whereQuery);

    if (!blogs.length) {
      return res
        .status(404)
        .json({ error: "No blogs found with the specified status" });
    }
    res.status(200).json({ length: blogs?.length, blogs: blogs });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getAllBlogs,
  getBlogByUserId,
  changeStatus,
  getBlogsByStatus,
  getCommonBlogs,
};
