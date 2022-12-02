const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  register: (req, res) => {
    const user = new User({
      nama: req.body.nama,
      email: req.body.email,
      no_handphone: req.body.no_handphone,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    user.save((err) => {
      if (err) {
        res.status(500).json({
          message: err,
        });
        return;
      } else {
        res.status(200).json({
          message: "Success register !",
        });
      }
    });
  },

  login: async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          message: err,
        });
        return;
      }
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.json({
          message: "Wrong password",
        });
      }
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1200s",
        }
      );
      res.status(200).json({
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          no_handphone: user.no_handphone,
          role: user.role,
        },
        message: "Login success!",
        accessToken: token,
      });
    });
  },

  getAllUser: async (req, res) => {
    try {
      const user = await User.find({}, "-password -__v -email");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  getDetailUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id, "-__v -_id");

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  addUser: (req, res) => {
    try {
      const data = req.body;
      const user = new User(data);

      user.save();
      if (data !== null) {
        res.status(200).json({
          message: "User baru berhasil ditambahkan !",
        });
      } else {
        return error;
      }
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const user = await User.findByIdAndUpdate(id, data);

      if (data !== null) {
        await user.save();

        res.status(200).json({
          message: "Data berhasil di Update !",
        });

        user.save();
      } else {
        return error;
      }
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      await user.remove();
      res.json({
        message: "Data berhasil dihapus !",
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  },
};
