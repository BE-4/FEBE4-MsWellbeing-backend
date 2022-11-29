
const User = require("../models/user");

module.exports = {

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
