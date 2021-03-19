const knex = require("../db/knex");
const { validationResult } = require("express-validator");
// const { getOne } = require("../Controller/handleFactory");
const AppError = require("../utils/appErrorHandler");

module.exports = {
  authorized: (...roles) => async (req, res, next) => {
    try {
      // const condition = { _id: req.user.id, roles: { $in: roles } };
      const getAuthorizedUser = await knex
        .from("user")
        .whereIn("role", roles)
        .where({ id: req.user.id });

      if (!getAuthorizedUser)
        throw new AppError("You are not authorized for this action !", 403);
      return next();
    } catch (err) {
      next(new AppError(err.message, err.statusCode));
    }
  },
};
