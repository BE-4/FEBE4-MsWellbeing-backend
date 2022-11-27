const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
var cookieParser = require("cookie-parser");
const db = require("./config/database");
const allRoutes = require("./routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(allRoutes);
app.use(cors());
app.use(cookieParser());

db.then(() => {
  console.log("Database Connected");
}).catch((err) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
