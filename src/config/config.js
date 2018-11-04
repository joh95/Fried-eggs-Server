const express = require("express"); //Facilitar el uso de las cabeceras
const morgan = require("morgan"); //HTTP request logger middleware for node.js
const cors = require("cors");

module.exports = app => {
  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
};
