const userService = require("../service/userService ");

const getAllUsers = async (req, res) => {
  try {
    await userService.getUsers(req, res);
  } catch (e) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    await userService.getUserById(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    await userService.addUser(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    await userService.updateUser(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    await userService.updateUserByEmail(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    await userService.deleteUser(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const blogHasUser = async (req, res) => {
  try {
    await userService.createBlog(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  updateUserByEmail,
  deleteUserById,
  blogHasUser,
};
