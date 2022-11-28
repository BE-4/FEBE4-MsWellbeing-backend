const express = require("express");
const router = express.Router();

const articleRouter = require("./article.router");

router.use("/article", articleRouter);

module.exports = router;
