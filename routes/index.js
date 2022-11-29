const express = require("express");
const router = express.Router();

const psikologRouter = require("./psikolog.router");

router.use("/psikolog", psikologRouter);

module.exports = router;
