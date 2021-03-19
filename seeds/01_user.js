exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          name: "Abhijeet",
          email: "a@gmail.com",
          password: "abhi",
          account_no: "123456789012",
        },
      ]);
    });
};
