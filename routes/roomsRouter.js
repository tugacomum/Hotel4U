const express = require("express");
const router = express.Router();

const Room = require("../models/room");

router.post("/getallrooms", async (req, res) => {
  const hotelid = req.body.id;
  try {
    const rooms = await Room.find({ hotelId: hotelid });
    res.send(rooms);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

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
    await Room.deleteOne({ _id: roomid });
    await Booking.deleteMany({ roomId: roomid });
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
      await Booking.updateMany({ roomId: roomid }, { status: "booked" });
    } else {
      roomTemp.status = "disabled";
      await Booking.updateMany({ roomId: roomid }, { status: "cancelled" });
    }
    await roomTemp.save();
    res.send("Room status changed successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post('/editroom', async (req, res) => {
  const { room } = req.body;
  try {
    console.log(room)
    await Room.updateOne({_id: room.id},{
      name: room.name,
      maxcount: room.maxCount,
      phonenumber: room.phoneNumber,
      rentperday: room.rentPerDay,
      imageurls: [room.imageUrl1, room.imageUrl2, room.imageUrl3],
      type: room.type,
      description: room.description,
      services: room.services,
    })
    res.send("Room updated successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;