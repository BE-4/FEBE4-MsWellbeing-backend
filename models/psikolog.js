const mongoose = require("mongoose");
const { Schema } = mongoose;

const psikologSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  gambarURL: {
    type: String,
    required: true,
  },
  spesialis: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  lokasiURL: {
    type: String,
  },
  lulusan: {
    type: String,
  },
  pengalaman: {
    type: String,
    required: true,
  },
  rekomendasi: {
    type: Boolean,
    default: false,
  },
});

const Psikolog = mongoose.model("Psikolog", psikologSchema);

module.exports = Psikolog;
