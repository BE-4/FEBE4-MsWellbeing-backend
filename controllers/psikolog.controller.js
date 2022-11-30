const Psikolog = require("../models/psikolog");

module.exports = {
  getAllPsikolog: async (req, res) => {
    try {
      const psikolog = await Psikolog.find({});

      if (psikolog !== null) {
        res.status(200).json(psikolog);
      } else {
        return error;
      }
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

      if (psikolog !== null) {
        res.status(200).json(psikolog);
      } else {
        return error;
      }
    } catch (error) {
      res.status(404).json({
        message: "Cannot get psikolog data",
      });
    }
  },

  addPsikolog: (req, res) => {
    try {
      const data = req.body;
      const psikolog = new Psikolog(data);
      if (data !== null) {
        psikolog.save();

        res.status(200).json({
          message: "Psikolog baru berhasil ditambahkan !",
        });
      }
    } catch (error) {}
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
    const { id } = req.params;
    const psikolog = await Psikolog.findById(id);

    await psikolog.remove();
    res.json({
      message: "Data yang dipilih berhasil dihapus !",
    });
  },
};
