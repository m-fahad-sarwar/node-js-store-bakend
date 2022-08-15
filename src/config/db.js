var mongoose = require("mongoose");

const setupDB = () => {
  mongoose.connect(
    process.env.DB,
    function (err) {
      if (err) throw err;
      console.log("successfully connected with database");
    }
  );
};

module.exports = setupDB;