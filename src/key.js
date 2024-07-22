const STATUS = Object.freeze({
  IN_DRAFT: "in_draft",
  RIGHT: "right",
  PUBLISH: "publish",
});

const COMMON_MESS = {
  INTERNAL_ERROR: "Internal Server Error",
  WENT_WRONG: "Something went wrong!",
  VALID_ID: "Please enter valid Id",
};

const UserMessage = {
  USER_MESS: {
    NOT_FOUND: "User is not found",
    USER_EXIST: "User already exists",
    USER_ADDED: "User added successfully.",
    USER_UPDATED: "User updated successfully.",
    USER_DELETED: "User deleted successfully.",
  },
};

const BlogMessage = {
  BLOG_MESS: {
    NOT_FOUND: "Blog is not found",
    BLOG_CREATE: "Blog created successfully.",
    BLOG_EXIST: "Blog is already exist",
    BLOG_DELETE: "Blog deleted successfully",
    BLOG_UPDATE: "Blog updated successfully",
    INVALID_STATUS: "Invalid Status",
    BLOG_ALREADY_DELETED: "Blog is already deleted",
    INVALID_STATUS_BLOG: "No blogs found with the specified status",
  },
};

module.exports = { STATUS, COMMON_MESS, UserMessage, BlogMessage };
