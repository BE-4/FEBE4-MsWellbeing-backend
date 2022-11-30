const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getDetailUser,
  addUser,
  updateUser,
  deleteUser ,
} = require("../controllers/user.controller");

router.get("/", getAllUser);
router.get("/:id", getDetailUser);
router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;