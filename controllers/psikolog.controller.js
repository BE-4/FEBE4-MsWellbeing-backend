const Psikolog = require("../models/psikolog");

module.exports = {
  getAllPsikolog: async (req, res) => {
    try {
      const psikolog = await Psikolog.find({});
      res.status(200).json(psikolog);
    } catch (error) {
      res.status(404).json({
        message: "Cannot get psikolog data",
      });
    }
  },

  getDetailPsikolog: async (req, res) => {
    try {
      const { id } = req.params;
      const psikolog = await Psikolog.findById(id, "-__v -_id");
      res.status(200).json(psikolog);
    } catch (error) {
      res.status(404).json({
        message: "Cannot get psikolog data",
      });
    }
  },

  getRecomendedPsikolog: async (req, res) => {
    try {
      const psikolog = await Psikolog.find({ rekomendasi: true });

      res.status(200).json(psikolog);
    } catch (error) {
      res.status(404).json({
        message: "Cannot found data",
      });
    }
  },

  addPsikolog: (req, res) => {
    try {
      const psikolog = new Psikolog({
        nama: req.body.nama,
        gambarURL: req.body.gambarURL,
        spesialis: req.body.spesialis,
        lokasi: req.body.lokasi,
        lokasiURL: req.body.lokasiURL,
        lulusan: req.body.lulusan,
        pengalaman: req.body.pengalaman,
        rekomendasi: req.body.rekomendasi,
      });
      psikolog.save((err) => {
        if (err) {
          res.status(500).json({
            message: err,
          });
          return;
        } else {
          res.status(200).json({
            message: "Psikolog baru berhasil ditambahkan !",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  updatePsikolog: async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const psikolog = await Psikolog.findByIdAndUpdate(id, data);

    await psikolog.save();

    res.status(200).json({
      message: "Data berhasil di Update !",
    });

    psikolog.save();
  },

  deletePsikolog: async (req, res) => {
    try {
      const { id } = req.params;
      const psikolog = await Psikolog.findById(id);

      await psikolog.remove();
      res.json({
        message: "Data yang dipilih berhasil dihapus !",
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },
};
