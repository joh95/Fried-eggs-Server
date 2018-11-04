let jwt = require("jsonwebtoken");
let validate = require("./util.validations");
let userModel = require("../module/user/user.schema");

let verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, "IngWeb", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log("Datos Del Auth", authData);
        next();
      }
    });
  } else {
    // Forbiden
    res.sendStatus(401);
  }
};

let verifyCode = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, "IngWeb", (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        if (authData.code) {
          if (authData.code == req.body.code) {
            next();
          } else {
            return res.sendStatus(401);
          }
        }
      }
    });
  } else {
    // Forbiden
    return res.sendStatus(401);
  }
};

let verifyAuth = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, "IngWeb_Auth", (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        console.log("Datos Del Auth", authData);
        next();
      }
    });
  } else {
    // Forbiden
    return res.sendStatus(401);
  }
};

let verifyAdmin = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, "IngWeb_Auth", (err, authData) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        console.log("Datos Del Auth", authData);
        if (parseInt(authData.user.role) === 1) {
          next();
        } else {
          return res.status(401).json({
            Error: "You are not Admin"
          });
        }
      }
    });
  } else {
    // Forbiden
    return res.sendStatus(401);
  }
};
module.exports = {
  verifyToken,
  verifyCode,
  verifyAuth,
  verifyAdmin
};