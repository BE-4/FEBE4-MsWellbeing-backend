const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const articleRouter = require("./article.router");
const psikologRouter = require("./psikolog.router");

router.use("/user", userRouter);
router.use("/article", articleRouter);
router.use("/psikolog", psikologRouter);

module.exports = router;