const router = require("express").Router();
const blogController = require("../controllers/blog_controller");
const middleware = require("../utils/middleware");
router.get("/", blogController.getAllBlogs);
router.post("/", middleware.auth, blogController.createNewBlog);
router.delete("/:id", middleware.auth, blogController.deleteBlog);
router.put("/:id", middleware.auth,blogController.updateBlog);

module.exports = router;
