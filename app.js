const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./config/database");
const allRoutes = require("./routes");

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(allRoutes);

db.then(() => {
  console.log("Database Connected");
}).catch((err) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
