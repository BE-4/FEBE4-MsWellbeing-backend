const mongoose = require("mongoose");

const DB_URL =
  "mongodb+srv://menthy:menthyadmin@mycluster.xntmcj2.mongodb.net/menthy";

const db = mongoose.connect(DB_URL);

module.exports = db;
