const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  sub_title: {
    type: String,
  },
  popular: {
    required: true,
    type: Boolean,
    default: false,
  },
  new: {
    required: true,
    type: Boolean,
    default: true,
  },
  genre: {
    required: true,
    type: String,
  },
  imgURL: {
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
