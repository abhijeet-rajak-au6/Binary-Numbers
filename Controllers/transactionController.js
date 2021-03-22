const knex = require("../db/knex");
const AppError = require("../utils/appErrorHandler");
const Response = require("../utils/responseHandler");

module.exports = {
  async depositMoney(req, res, next) {
    try {
      const { deposited } = req.body;
      const currentUser = await knex("user").where({
        id: req.user.id,
      });

      let currentBalance = currentUser[0].total_balance;
      let totalBalance;

      totalBalance = currentBalance + deposited;

      return knex.transaction(async function (t) {
        try {
          const account = await knex("account").transacting(t).insert({
            deposited,
            account_id: currentUser[0].account_no,
            user_id: currentUser[0].id,
          });

          const user = await knex("user")
            .transacting(t)
            .where({ id: req.user.id })
            .update({
              total_balance: totalBalance,
            });

          t.commit();

          req.locals = new Response(
            `Your account credited with rs ${deposited}`,
            201
          );

          next();
        } catch (err) {
          console.log("in error");
          console.log("err", err);
          t.rollback();
          throw new AppError("Error while crediting please try again", 400);
        }
      });
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  },

  async withdrawMoney(req, res, next) {
    try {
      const { withdraw } = req.body;
      const currentUser = await knex("user").where({
        id: req.user.id,
      });

      let currentBalance = currentUser[0].total_balance;
      let totalBalance;

      totalBalance = currentBalance - withdraw;
      if (totalBalance < 0) throw new AppError("Insufficient Balance");

      knex.transaction(async function (t) {
        try {
          const account = await knex("account").transacting(t).insert({
            withdraw,
            account_id: currentUser[0].account_no,
            user_id: currentUser[0].id,
          });

          const user = await knex("user")
            .transacting(t)
            .where({ id: req.user.id })
            .update({
              total_balance: totalBalance,
            });

          t.commit();
          req.locals = new Response(
            `You have sucessfully withdrawn rs ${withdraw}`,
            201
          );
          next();
        } catch (err) {
          // console.log(err);
          t.rollback();
          throw new AppError("Error while crediting please try again", 400);
        }
      });
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  },
};
