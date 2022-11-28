const Article = require("../models/article");

module.exports = {
  addArticle: (req, res) => {
    const data = req.body;
    const article = new Article(data);

    article.save();

    res.status(200).json({
      message: "New article has been created !",
    });
  },

  getArticle: async (req, res) => {
    try {
      const article = await Article.find({});

      if (article !== null) {
        res.status(200).json(article);
      } else {
        return error;
      }
    } catch (error) {
      res.status(500).json({
        message: "Cannot get article data",
      });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);

      if (article !== null) {
        res.status(200).json(article);
      } else {
        return error;
      }
    } catch (error) {
      res.status(404).json({
        message: "Article not found",
      });
    }
  },

  deleteArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);

      if (article !== null) {
        await article.remove();

        res.status(200).json({
          message: "Success delete article data",
        });
      } else {
        return error;
      }
    } catch (error) {
      res.status(404).json({
        message: "Article not found",
      });
    }
  },

  updateArticleById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const article = await Article.findByIdAndUpdate(id, data);

      if (article !== null) {
        await article.save();

        res.status(200).json({
          message: "Article has been updated",
        });
      } else {
        return error;
      }

      article.save();
    } catch (error) {
      res.status(404).json({
        message: "Article not found",
      });
    }
  },
};
