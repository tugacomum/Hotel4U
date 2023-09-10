const express = require("express");
const router = express.Router();
const moment = require("moment");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51Nn1VCGSqQYWzQWWZT7xDzSs6op3RVurczfFtVEPfNRcVTgZo8uWLSxArqdAVmynnfgXmcKVz6oYr7scv4eBpIkB00pLjQRQvh"
);

const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
  const { room, userId, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: "EUR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newBooking = new Booking({
        room: room.name,
        roomId: room._id,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        transactionId: "1234",
      });

      const booking = await newBooking.save();

      const roomTemp = await Room.findOne({
        _id: room._id,
      });

      roomTemp.currentbookings.push({
        bookingid: booking._id,
        fromDate,
        toDate,
        userId: userId,
        status: booking.status,
      });

      await roomTemp.save();
    }

    res.send("Payment successful, your room is booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userId = req.body.userId;
  try {
    const bookings = await Booking.find({ userId: userId });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/deletebooking", async (req, res) => {
  const { bookingId, roomId } = req.body;
  try {
    const booking = await Booking.deleteOne({ _id: bookingId });
    const room = await Room.findOne({
      _id: roomId,
    });
    const bookings = room.currentbookings;
    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingId.toString()
    );
    room.currentbookings = temp;
    await room.save();
    res.send("Booking deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingId, roomId } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingId });

    booking.status = "cancelled";
    await booking.save();

    const room = await Room.findOne({
      _id: roomId,
    });

    const bookings = room.currentbookings;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingId.toString()
    );
    room.currentbookings = temp;

    await room.save();
    res.send("Your booking has been cancelled successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/editbooking", async (req, res) => {
  const { booking } = req.body;
  try {

    const bookinggg = await Booking.findOne({ _id: booking.id });
    const room = await Room.findOne({ _id: bookinggg.roomId });
    const totalAmount = booking.totalDays * room.rentperday;

    await Booking.updateOne(
      { _id: booking.id },
      {
        fromDate: booking.fromDate,
        toDate: booking.toDate,
        totalAmount: totalAmount,
        totalDays: booking.totalDays,
      }
    );

      // atualizar o currentbookings

    res.send("Booking updated successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingbyid", async (req, res) => {
  const bookingid = req.body.id;
  try {
    const booking = await Booking.findOne({ _id: bookingid });
    res.send(booking);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;