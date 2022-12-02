const express = require("express");
const router = express.Router();

const {
  getAllPsikolog,
  getRecomendedPsikolog,
  addPsikolog,
  updatePsikolog,
  deletePsikolog,
  getDetailPsikolog,
} = require("../controllers/psikolog.controller");

router.get("/", getAllPsikolog);
router.get("/rekomendasi", getRecomendedPsikolog);
router.get("/:id", getDetailPsikolog);
router.post("/", addPsikolog);
router.patch("/:id", updatePsikolog);
router.delete("/:id", deletePsikolog);

module.exports = router;
