const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  register: (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
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
          accessToken: null,
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
          role: user.role,
        },
        message: "Login success!",
        accessToken: token,
      });
    });
  },
};
