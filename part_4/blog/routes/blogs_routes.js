const router = require("express").Router();
const blogController = require("../controllers/blog_controller");

router.get("/", blogController.getAllBlogs);
router.post("/", blogController.createNewBlog);
module.exports = router;
