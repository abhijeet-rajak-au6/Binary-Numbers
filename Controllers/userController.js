const knex = require("../db/knex");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const AppError = require("../utils/appErrorHandler");
const Response = require("../utils/responseHandler");

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
  return sign({ id }, process.env.PRIVATE_KEY, { expiresIn: 60 * 10 });
};

module.exports = {
  async register(req, res, next) {
    try {
      //payload
      const { password, email, name, account_no, role } = req.body;

      // hash password using bcrypt
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
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
        message = "email is already registered!";
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
        token: token,
      });
      next();
    } catch (err) {
      next(new AppError(err.message, err.statusCode));
    }
  },

  async listTransaction(req, res, next) {
    try {
      console.log("transaction");
      const listOfAllTransaction = await knex("account")
        .where({
          user_id: req.user.id,
        })
        .select("deposited", "withdraw", "account_id", "created_at");

      if (!listOfAllTransaction.length)
        throw new AppError("no transaction detail is found");

      req.locals = new Response("success", 200, {
        AllTransactions: listOfAllTransaction,
      });
      next();
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  },

  async listAllTransaction(req, res, next) {
    try {
      console.log("in");
      const response = await knex("account")
        .join("user", "user.id", "account.user_id")
        .select("total_balance", "name", "email", "account_no");

      if (!response.length) throw new AppError("no user found !");

      req.locals = new Response("success", 200, { userdetails: response });
      next();
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  },

  async getUserTransaction(req, res, next) {
    try {
      console.log("getUserTransaction");
      const { id } = req.params;
      console.log(id);
      const userTransaction = await knex("account")
        .where({
          user_id: id,
        })
        .select("deposited", "withdraw", "account_id", "created_at");

      if (!userTransaction.length)
        throw new AppError("no Transacion found", 404);

      req.locals = new Response("success", 200, { userTransaction });
      next();
    } catch (err) {
      next(new AppError(err.message, err.statusCode || 400));
    }
  },
};
