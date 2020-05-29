const { check } = require("express-validator");
const userController = require("../controllers/User_controller");
const middleware = require("../utils/middleware");
const router = require("express").Router();

router.post(
  "/signup",
  [
    check("password", "Please enter password").notEmpty(),
    check(
      "password",
      "Password length should be at lest 3  charachter"
    ).isLength({ min: 3 }),
  ],
  userController.createUser
);

router.get("/getUser", middleware.auth, userController.getLoggedInUser);

router.post(
  "/login",
  [ 
    check("userName", "Please enter your user name").notEmpty(),
    check("password", "Please enter your password").notEmpty(),
  ],
  userController.login
);

router.get("/", userController.getAllUser);

module.exports = router;
