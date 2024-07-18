const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUserById);
router.put("/email/:email", userController.updateUserByEmail);
router.delete("/:id", userController.deleteUserById);
router.post("/:id/blog", userController.blogHasUser);

module.exports = router;
