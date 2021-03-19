const knex = require("../db/knex");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const AppError = require("../utils/appErrorHandler");
const Response = require("../utils/responseHandler");

const hashPassword = async (pwd) => {
  const hashPwd = await hash(pwd, 10);
  return hashPwd;
};
const findByEmailAndPassword = async (account_no, password) => {
  let userObj = null;
  try {
    return new Promise(async function (resolve, reject) {
      const user = await knex("user").where({
        account_no,
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
      const { password, email, name, account_no } = req.body;

      // hash password using bcrypt
      const hashedPassword = await hashPassword(password);
      console.log(hashedPassword);
      // create user
      const newUser = await knex("user").insert({
        password: hashedPassword,
        email,
        name,
        account_no,
      });

      console.log(newUser);
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
      const { password, account_no } = req.body;
      // find email and password
      const user = await findByEmailAndPassword(account_no, password);
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
};
