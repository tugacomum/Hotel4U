const express = require("express");
const router = express.Router();

const Hotel = require("../models/hotel");

router.get("/getallhotels", async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.send(hotels);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/gethotelbyid", async (req, res) => {
  const hotelid = req.body.hotelid;
  try {
    const hotel = await Hotel.findOne({ _id: hotelid });
    res.send(hotel);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/addhotel", async (req, res) => {
  try {
    const newhotel = new Hotel(req.body);
    await newhotel.save();
    res.send("New Hotel added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletehotel", async (req, res) => {
  const hotelid = req.body.id;
  try {
    await Hotel.deleteOne({ _id: hotelid });
    res.send("Hotel deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/edithotel", async (req, res) => {
    const { hotel } = req.body;
    try {
      console.log(hotel)
        await Hotel.updateOne({ _id: hotel.id }, {
            name: hotel.name,
            address: hotel.address,
            description: hotel.description,
            rating: hotel.rating,
            imageurls: [hotel.imageUrl1, hotel.imageUrl2, hotel.imageUrl3],
        });
        res.send("Hotel updated successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;  