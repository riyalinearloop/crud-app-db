const { User } = require("../model/userSchema");
const { Blog } = require("../model/blogSchema");
const { COMMON_MESS, UserMessage, BlogMessage } = require("../key");
const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("blogs");
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("blogs");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({ error: UserMessage.USER_MESS.NOT_FOUND });
    } else {
      const user = await userData.save();
      res.status(200).json({ user, message: UserMessage.USER_MESS.USER_ADDED });
    }
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ user, message: UserMessage.USER_MESS.USER_UPDATED });
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
    });
    res.status(200).json({ user, message: UserMessage.USER_MESS.USER_UPDATED });
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExist = await User.findById(id);
    if (!userExist) {
      res.status(400).json({ error: UserMessage.USER_MESS.NOT_FOUND });
    } else {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: UserMessage.USER_MESS.USER_DELETED });
    }
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

const createBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({ error: UserMessage.USER_MESS.USER_UPDATED });
    } else {
      const postData = new Blog({ ...req.body, userId: id });
      const blog = await postData.save();
      user.blogs.push(blog);
      await user.save();
      res
        .status(200)
        .json({ blog, message: BlogMessage.BLOG_MESS.BLOG_CREATE });
    }
  } catch (error) {
    res.status(500).json({ error: COMMON_MESS.INTERNAL_ERROR });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  updateUserByEmail,
  deleteUser,
  createBlog,
};
