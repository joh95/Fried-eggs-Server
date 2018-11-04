const express = require("express");
const jwt = require("jsonwebtoken");

let app = express();
let config = require("./config/config");
const router = require("./module/Router");

config(app); //agrego middleware a las instancia de express  req --->[MIDDLEWARE(express.js, morgan)] ---> res

let db = require("./config/db");
db();

app.use("/api", router);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Running server: port ${port}`);
});
