const { validationResult } = require("express-validator");
const AppError = require("../utils/appErrorHandler");

module.exports = {
  async executeValidation(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new AppError(errors.array()[0].msg, 400));
      }
      next();
    } catch (err) {
      // console.log(err);
    }
  },
};
