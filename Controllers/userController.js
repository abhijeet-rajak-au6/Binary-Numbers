const knex = require("../db/knex");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const AppError = require("../utils/appErrorHandler");
const Response = require("../utils/responseHandler");
const moment = require("moment");

const hashPassword = async (pwd) => {
  const hashPwd = await hash(pwd, 10);
  return hashPwd;
};
const findByEmailAndPassword = async (email, password) => {
  let userObj = null;
  try {
    return new Promise(async function (resolve, reject) {
      const user = await knex("user").where({
        email,
      });

      if (!user[0]) return reject(new AppError("Incorrect credentials", 404));
      userObj = user;
      const isMatched = await compare(password, user[0].password);

      if (!isMatched) return reject(new AppError("Incorrect credentials", 404));
      resolve(userObj);
    });
  } catch (err) {
    reject(err);
  }
};

const generateToken = (id) => {
  return sign({ id }, process.env.PRIVATE_KEY, { expiresIn: 1000 * 60 * 10 });
};

module.exports = {
  async register(req, res, next) {
    try {
      //payload
      const { password, email, name, account_no, role } = req.body;

      // hash password using bcrypt
      const hashedPassword = await hashPassword(password);
      // create user
      let newUser;
      if (role === "customer") {
        if (!account_no) throw new AppError("please provide account_no", 404);
        newUser = await knex("user").insert({
          password: hashedPassword,
          email,
          name,
          account_no,
          role,
        });
      } else {
        newUser = await knex("user").insert({
          password: hashedPassword,
          email,
          name,
          role,
        });
      }

      if (!newUser[0])
        throw new AppError("problem in registering please try ahain later");
      // console.log("new user token",newUser.token);

      req.locals = new Response("user registered sucessfully", 201);

      //   generate response
      next();
    } catch (err) {
      let message = "";
      if (err.code === "ER_DUP_ENTRY" && err.errno === 1062) {
        if (!err.sqlMessage.includes("account_no"))
          message = "email is already registered!";
        else message = "account no is already registered";
      }
      next(new AppError(message || err.message, err.statusCode || 500));
    }
  },

  async login(req, res, next) {
    try {
      //payload
      const { password, email } = req.body;
      // find email and password
      const user = await findByEmailAndPassword(email, password);
      // generate token
      let token = generateToken(user[0].id);

      req.locals = new Response(`Welcome ${user[0].name}`, 200, {
        role: user[0].role,
        token: token,
        balance: user[0].total_balance,
      });
      next();
    } catch (err) {
      next(new AppError(err.message, err.statusCode));
    }
  },

  async listTransaction(req, res, next) {
    try {
      // let page = req.query.page;
      // let limit = req.query.limit;
      const listOfAllTransaction = await knex("account")
        .where({
          user_id: req.user.id,
        })
        .select("deposited", "withdraw", "account_id", "created_at", "id")

      if (!listOfAllTransaction.length)
        throw new AppError("no transaction detail is found");

      const AllTransactions = listOfAllTransaction.map((transaction) => {
        return {
          id: transaction.id,
          deposited: transaction.deposited,
          withdraw: transaction.withdraw,
          account_id: transaction.account_id,
          created_at: moment(transaction.created_at)
            .utcOffset(330)
            .format("DD-MM-YYYY, hh:mm:ss"),
        };
      });

      req.locals = new Response("success", 200, {
        AllTransactions,
      });
      next();
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  },

  async listAllTransaction(req, res, next) {
    try {
      const response = await knex("user")
        .where({
          role: "customer",
        })
        .select("total_balance", "name", "email", "account_no", "id");

      if (!response.length) throw new AppError("no user found !");

      req.locals = new Response("success", 200, { userdetails: response });
      next();
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  },

  async getUserTransaction(req, res, next) {
    try {
      const { id } = req.params;
      let page = req.query.page;
      let limit = req.query.limit;
      const userTransaction = await knex("account")
        .where({
          user_id: id,
        })
        .select("deposited", "withdraw", "account_id", "created_at", "id")

      if (!userTransaction.length)
        throw new AppError("no Transacion found", 404);

      let transactions = userTransaction.map((transaction) => {
        return {
          deposited: transaction.deposited,
          withdraw: transaction.withdraw,
          account_id: transaction.account_id,
          created_at: moment(transaction.created_at)
            .utcOffset(330)
            .format("DD-MM-YYYY, hh:mm:ss"),
          id: transaction.id,
        };
      });

      req.locals = new Response("success", 200, {
        userTransaction: transactions,
      });
      next();
    } catch (err) {
      next(new AppError(err.message, err.statusCode || 400));
    }
  },
  async logout(req, res, next) {
    try {
      const currentUser = req.user.id;
      condition = { id: currentUser };
      const user = await knex("user").where(condition);
      if (user) {
        // user.token = null;

        // await user.save({ validateBeforeSave: false });
        req.locals = new Response("Thank you visit again", 200);
        next();
      }
      throw new AppError("Session expired", 400);
    } catch (err) {
      next(new AppError(err.message, err.statusCode));
    }
  },
  async getUser(req, res, next) {
    try {
      const userBalance = await knex("user")
        .where({
          id: req.user.id,
        })
        .select("total_balance");
      req.locals = new Response("success", 200, {
        balance: userBalance[0].total_balance,
      });
      next();
    } catch (err) {
      next(new AppError(err.message, err.statusCode));
    }
  },
};
