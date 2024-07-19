const express = require("express");
const blogController = require("../controller/blogController");

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/filter", blogController.getBlogsByStatusAndUser);
router.get("/:userId", blogController.getAllBlogsByUserId);
router.get("/user/:userId", blogController.getBlogsByStatus);
router.put("/:id/status", blogController.updateStatus);
router.delete("/:id", blogController.deleteBlog);
// router.get("/user/:userId/status/:status", blogController.getBlogsByStatus);

module.exports = router;
