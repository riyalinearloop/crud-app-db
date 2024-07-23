const mongoose = require("mongoose");
const { STATUS, COMMON_MESS, BlogMessage, UserMessage } = require("../key");
const { Blog } = require("../model/blogSchema");
const { User } = require("../model/userSchema");
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({ isDeleted: false });
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const getBlogByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const blogs = await Blog.find({ userId: userId });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.WENT_WRONG });
  }
};

const changeStatus = async (req, res) => {
  if (!Object.values(STATUS).includes(req.body.status)) {
    throw new Error(BlogMessage.BLOG_MESS.INVALID_STATUS);
  }
  try {
    const status = req.body.status;
    const blogExist = await Blog.findById(req.params.id);
    if (!blogExist) {
      res.status(400).json({ error: BlogMessage.BLOG_MESS.NOT_FOUND });
    } else {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req?.params?.id,
        { status },
        { new: true }
      );
      res
        .status(200)
        .json({ updatedBlog, message: BlogMessage.BLOG_MESS.BLOG_UPDATE });
    }
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.WENT_WRONG });
  }
};

const getBlogsByStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.query;

  if (!Object.values(STATUS).includes(status)) {
    throw new Error(BlogMessage.BLOG_MESS.INVALID_STATUS);
  }
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
      res.status(400).json({ error: BlogMessage.BLOG_MESS.NOT_FOUND });
    } else {
      const blogs = await Blog.find({ userId: userId, status });

      if (!blogs.length) {
        return res
          .status(404)
          .json({ error: BlogMessage.BLOG_MESS.INVALID_STATUS_BLOG });
      }
      res.status(200).json(blogs);
    }
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const getBlogsByStatusAndUser = async (req, res) => {
  const { status, userId, statusExcluded } = req.query;
  let statusArray;
  if (status) {
    statusArray = status.split(",");
  }

  try {
    const queryConditions = {
      isDeleted: false,
    };

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: COMMON_MESS.VALID_ID });
      }
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: UserMessage.USER_MESS.NOT_FOUND });
      }
      queryConditions.userId = userId;
    }

    if (statusArray?.length > 0) {
      const validStatusSet = new Set(Object.values(STATUS));
      if (!statusArray.every((status) => validStatusSet.has(status))) {
        return res
          .status(400)
          .json({ error: BlogMessage.BLOG_MESS.INVALID_STATUS });
      }

      queryConditions.status = statusExcluded === "true"
        ? { $in: statusArray }
        : { $nin: statusArray };
    }
    const blogs = await Blog.find(queryConditions);

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ error: BlogMessage.BLOG_MESS.INVALID_STATUS_BLOG });
    }

    res.status(200).json({ count: blogs.length, blogs: blogs });
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const softDeleteBlog = async (req, res) => {
  try {
    const blogStatus = req.body.status;
    const blogExist = await Blog.findById(req.params.id);
    if (!blogExist || blogExist?.isDeleted === blogStatus) {
      res
        .status(400)
        .json({ error: BlogMessage.BLOG_MESS.BLOG_ALREADY_DELETED });
    } else {
      await Blog.findByIdAndUpdate(req.params.id, { isDeleted: blogStatus });
      res.status(200).json({ message: true });
    }
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const commonController = async (req, res) => {
  try {
    await Blog.updateMany({}, { $set: { isDeleted: false } });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

module.exports = {
  getAllBlogs,
  getBlogByUserId,
  changeStatus,
  getBlogsByStatus,
  getBlogsByStatusAndUser,
  softDeleteBlog,
  commonController,
};
