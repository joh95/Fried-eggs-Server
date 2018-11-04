let bcrypt = require("bcrypt-nodejs");
let generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

let validPassword = (pass, password) => bcrypt.compareSync(pass, password);

module.exports = {
  generateHash,
  validPassword
};