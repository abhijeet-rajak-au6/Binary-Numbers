const express = require("express");
const app = express();
const dotenv = require("dotenv");
const knex = require("./db/knex");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const accountRoutes = require("./Routes/transactionRoutes");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(userRoutes);
app.use(accountRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  if (error.message.includes("user validation failed"))
    error.message = error.message.slice(error.message.indexOf(":"));

  // console.log(error.message);
  return res.status(error.statusCode || 500).send({
    message: error.message,
  });
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log("server is sucessfully connected at port", PORT);
});
