const User = require("../models/User.js");
const express = require("express");
const router = express.Router();

//! add user
router.post("/add-user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! get users
router.get("/get-all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! update user
router.put("/update-user", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body.userId }, req.body);
    res.status(200).json("Item updated successfully.");
  } catch (error) {
    res.status(400).json(error);
  }
});

//! delete user
router.delete("/delete-user", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body.userId });
    res.status(200).json("Item deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
