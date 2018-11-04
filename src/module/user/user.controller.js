let model = require("./user.schema");
let jwt = require("jsonwebtoken");
let util = require("../../utils");
let bcrypt = require("bcrypt-nodejs");

let generateRandom = _ => Math.floor(100000 + Math.random() * 900000);

let post = (req, res) => {
  let newUser = new model(req.body);
  newUser.password = util.generateHash(req.body.password);
  newUser
    .save()
    .then(user =>
      res.status(201).json({
        msg: "User Created"
      })
    )
    .catch(err =>
      res.status(401).json({
        msg: err
      })
    );
};

let get = (req, res) => {
  console.log(`${req.body}`);
  model.find({}).then(function(model) {
    res.send(model);
  });
};

let getOne = (req, res) => {
  console.log(`${req.params.cc}`);
  model
    .findOne({
      cc: req.params.cc
    })
    .then(function(model) {
      return res.send(model);
    });
};

let getById = (req, res) => {
  console.log(`${req.body}`);
  model
    .findById({
      _id: req.params.id
    })
    .then(function(model) {
      res.send(model);
    });
};

let login = (req, res, next) => {
  let _code = generateRandom();
  return model
    .findOne({
      username: req.body.username
    })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          jwt.sign(
            { user: user.username, code: _code },
            "IngWeb",
            (err, token) => {
              return res.status(200).json({ token, _code });
            }
          );
        } else {
          return res.status(401).json({ message: "Bad Credentials" });
        }
      } else {
        return res.status(401).json({ message: "Bad Credentials" });
      }
    })
    .catch(err => next(err));
};

let auth = (req, res, next) => {
  return model
    .findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          user.password="";
          jwt.sign(
            { user: user},
            "IngWeb_Auth",
            { expiresIn: "5m" },
            (err, token) => {
              return res.status(200).json({ token });
            }
          );
        } else {
          return res.status(401).json({ message: "Bad Credentials" });
        }
      } else {
        return res.status(401).json({ message: "Bad Credentials" });
      }
    })
    .catch(err => next(err));
};

module.exports = {
  post,
  get,
  getOne,
  getById,
  login,
  auth
};
