const { Router } = require("express");
const router = Router();

const { executeValidation } = require("../middleware/executeValidation");
const { authenticate } = require("../middleware/authentication");
const { Send } = require("../middleware/Send");
const { checkValidation } = require("../middleware/validate");
const { register, login } = require("../Controllers/userController");


router.post("/register", [
  checkValidation("USER_REGISTRATION"),
  executeValidation,
  register,
  Send,
]);

router.post("/login", [
  checkValidation("USER_LOGIN"),
  executeValidation,
  login,
  Send,
]);

module.exports = router;
