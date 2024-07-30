const express = require("express");
const blogController = require("../controller/blogController");

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/filter", blogController.getBlogsByStatusAndUser);
router.get("/by-category", blogController.getBlogsByCategory);
router.get("/by-search", blogController.getBlogsBySearch);
router.get("/user/:userId", blogController.getBlogsByStatus);
router.get("/:userId", blogController.getAllBlogsByUserId);
router.put("/:id/status", blogController.updateStatus);
router.delete("/:id", blogController.deleteBlog);
router.post("/:id/category", blogController.addCategoryToBlog);
// router.get("/user/:userId/status/:status", blogController.getBlogsByStatus);

module.exports = router;
