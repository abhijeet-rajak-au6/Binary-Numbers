const { check, validationResult, query } = require("express-validator");
const { stackTraceLimit } = require("../utils/appErrorHandler");

module.exports = {
  checkValidation(method) {
    switch (method) {
      case "USER_REGISTRATION":
        return [
          check("name")
            .trim()
            .not()
            .isEmpty()
            .withMessage("please provide name")
            .isLength({ min: 3, max: 20 })
            .withMessage("Length of name should be between 3 to 20"),
          check("email")
            .trim()
            .not()
            .isEmpty()
            .withMessage("please provide email")
            .isEmail()
            .withMessage("please provide correct email"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("please provide password")
            .isLength({ min: 8, max: 20 })
            .withMessage("Length of password should be between 8 to 20"),

          check("account_no")
            .trim()
            .not()
            .isEmpty()
            .withMessage("please provide account no")
            .isLength({ min: 12, max: 12 })
            .withMessage("Account no should be 12 digit long"),
        ];
      case "USER_LOGIN":
        return [
          check("account_no")
            .trim()
            .not()
            .isEmpty()
            .withMessage("please provide account_no"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("please provide password")
            .isLength({ min: 8, max: 20 })
            .withMessage("Length of password should be between 8 to 20"),
        ];
      case "DEPOSIT-MONEY":
        return [
          check("deposited")
            .not()
            .isEmpty()
            .withMessage("please provide deposited money"),
        ];

      case "WITHDRAW-MONEY":
        return [
          check("withdraw")
            .not()
            .isEmpty()
            .withMessage("please provide withdrawl money"),
        ];

      default:
        return "Invalid Method";
    }
  },
};
