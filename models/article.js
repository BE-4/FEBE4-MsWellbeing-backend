const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  sub_title: {
    required: true,
    type: String,
  },
  popular: {
    required: true,
    type: Boolean,
  },
  new: {
    required: true,
    type: Boolean,
  },
  GENRE: {
    required: true,
    type: String,
  },
  imgURL: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
