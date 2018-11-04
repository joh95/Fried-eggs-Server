const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      process.env.MONGOLAB_URI || "mongodb://localhost/dbBankfried",
      { useNewUrlParser: true }
    )
    .then(() => console.log(`Connect to Mongo`));
};
