const express = require("express");
const router = express.Router();

const {
  addArticle,
  getArticle,
  getArticleById,
  deleteArticleById,
  updateArticleById,
} = require("../controllers/article.controller");

router.post("/", addArticle);
router.get("/", getArticle);
router.get("/:id", getArticleById);
router.delete("/:id", deleteArticleById);
router.patch("/:id", updateArticleById);

module.exports = router;
