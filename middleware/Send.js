module.exports = {
  Send(req, res) {
    try {
      const { data, message, statusCode } = req.locals;
      console.log("in Send");
      res.status(statusCode).send({
        message: message,
        ...data,
      });
    } catch (err) {
      console.log("err", err);
    }
  },
};
