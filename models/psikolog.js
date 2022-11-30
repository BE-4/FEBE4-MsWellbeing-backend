const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const psikologSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pengalaman: {
    type: String,
    required: true,
  },
});

const Psikolog = mongoose.model("Psikolog", psikologSchema);
psikologSchema.plugin(uniqueValidator);

module.exports = Psikolog;
