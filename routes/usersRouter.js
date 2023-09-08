const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Room = require("../models/room");
const Booking = require("../models/booking");

router.post("/register", async (req, res) => {
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const user = await newuser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
        status: user.status,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.id;
  try {
    await Room.updateMany({ "currentbookings.userId": userid }, { $set: { "currentbookings": []}}, { "multi": true });
    await Booking.deleteMany({ userId: userid });
    await User.deleteOne({ _id: userid });
    res.send("User deleted successfully");
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error });
  }
});

router.post("/disableuser", async (req, res) => {});

// edit/disable user (se o user for removido ou desativado, as suas bookings têm que desaparecer e limpar o currentbookings do model room)
// se editar o user voltar a guarda-lo no localstorage

module.exports = router;
