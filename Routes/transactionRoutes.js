const { Router } = require("express");
const router = Router();

const { executeValidation } = require("../middleware/executeValidation");
const { authenticate } = require("../middleware/authentication");
const { Send } = require("../middleware/Send");
const { checkValidation } = require("../middleware/validate");
const {
  depositMoney,
  withdrawMoney,
} = require("../Controllers/transactionController");

router.post("/deposit-money", [
  authenticate,
  checkValidation("DEPOSIT-MONEY"),
  executeValidation,
  depositMoney,
  Send,
]);

router.post("/withdraw-money", [
  authenticate,
  checkValidation("WITHDRAW-MONEY"),
  executeValidation,
  withdrawMoney,
  Send,
]);

module.exports = router;
