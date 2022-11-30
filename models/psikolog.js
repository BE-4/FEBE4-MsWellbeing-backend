const mongoose = require("mongoose");
const { Schema } = mongoose;

const psikologSchema = new Schema({
  nama: {
    type: String,
    required: true,

  },
  pengalaman: {
    type: String,
    required: true,
  },
});

const Psikolog = mongoose.model("Psikolog", psikologSchema);

module.exports = Psikolog;
