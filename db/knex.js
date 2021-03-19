const enviroment = process.env.NODE_ENV || 'development';
console.log("hello")
const config = require("../knexfile")[enviroment];
module.exports = require("knex")(config);