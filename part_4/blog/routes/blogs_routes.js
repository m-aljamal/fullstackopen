const router = require("express").Router();
const blogController = require("../controllers/blog_controller");

router.get("/", blogController.getAllBlogs);
router.post("/", blogController.createNewBlog);
router.delete("/:id", blogController.deleteBlog);
router.put("/:id", blogController.updateBlog);
module.exports = router;
