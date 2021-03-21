const { Router } = require("express");
const router = Router();

const { executeValidation } = require("../middleware/executeValidation");
const { authenticate } = require("../middleware/authentication");
const { authorized } = require("../middleware/authorization");
const { Send } = require("../middleware/Send");
const { checkValidation } = require("../middleware/validate");
const {
  register,
  login,
  listTransaction,
  listAllTransaction,
  getUserTransaction,
  logout,
  getUser
} = require("../Controllers/userController");

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

router.get("/see-my-transaction", [authenticate, listTransaction, Send]);

router.get("/sell-alluser-transaction", [
  authenticate,
  authorized("banker"),
  listAllTransaction,
  Send,
]);

router.get("/get-user-transaction/:id", [
  authenticate,
  getUserTransaction,
  Send,
]);
router.get("/me", [
  authenticate,
  getUser,
  Send,
]);

router.delete("/logout", [authenticate, logout, Send]);

module.exports = router;
