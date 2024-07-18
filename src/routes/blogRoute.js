const express = require("express");
const blogController = require("../controller/blogController");

const router = express.Router();

router.get("/", blogController.getBlogs);
router.get("/userHasBlogs", blogController.getBlogsByCommon);
router.get("/:userId", blogController.getAllBlogsByUserId);
router.put("/:id/status", blogController.updateStatus);
// router.get("/user/:userId/status/:status", blogController.getBlogsByStatus);
router.get("/user/:userId", blogController.getBlogsByStatus);

module.exports = router;
