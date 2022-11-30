const express = require("express");
const router = express.Router();

const {
  addArticle,
  getArticle,
  searchArticle,
  newArticle,
  popularArticle,
  getArticleById,
  deleteArticleById,
  updateArticleById,
} = require("../controllers/article.controller");

router.post("/", addArticle);
router.get("/", getArticle);
router.get("/search=:keyword", searchArticle);
router.get("/new=:keyword", newArticle);
router.get("/popular=:keyword", popularArticle);
router.get("/:id", getArticleById);
router.delete("/:id", deleteArticleById);
router.patch("/:id", updateArticleById);

module.exports = router;
