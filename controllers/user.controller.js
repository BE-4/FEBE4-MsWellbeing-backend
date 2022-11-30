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
    
  getAllUser: async (req, res) => {
  try {
    const user = await User.find({}, "-password -__v -email")
    res.status(200).json({
      message: "success get data user",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
},

getDetailUser: async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "-__v -_id");

    res.status(200).json({
      message: "success get data user",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
},

addUser: (req, res) => {
  const data = req.body;
  const user = new User(data);

  user.save();

  res.status(200).json({
    message: "User baru berhasil ditambahkan !",
  });
},

updateUser: async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const user = await User.findByIdAndUpdate(id, data);

  await user.save();

  res.status(200).json({
    message: "Data berhasil di Update !",
  });

  user.save();
},

deleteUser: async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  await user.remove();
  res.json({
    message: "Data berhasil dihapus !",
    data: "terhapus",
  });
}
};
