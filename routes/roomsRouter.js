const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send("New Room added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteroom", async (req, res) => {
  const roomid = req.body._id;
  try {
    const room = await Room.deleteOne({ _id: roomid });
    // quando apagar o quarto, tem que desaparecer os bookings associados a esse quarto
    res.send("Room deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/disableroom", async (req, res) => {
  const roomid = req.body._id;
  try {
    const roomTemp = await Room.findOne({
      _id: roomid,
    });
    if (roomTemp.status === "disabled") {
      roomTemp.status = "active";
    } else {
      roomTemp.status = "disabled";
    }
    await roomTemp.save();
    res.send("Room status changed successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// edit room

module.exports = router;
