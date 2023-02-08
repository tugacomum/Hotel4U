module.exports = app => {
  const reservation = require("../controllers/ReservationController.js");
  
  const user = require("../controllers/UserController.js");
  const hotel = require("../controllers/HotelController.js");
  const auth = require("../controllers/AuthController.js");
  const room = require("../controllers/RoomController.js");
  const router = require("express").Router();

  //falta acrescentar o middleware ensureAuth às respetivas rotas

  //users

  router.post("/user", user.create);
  router.get("/user", user.findOne);
  router.get("/users", user.find);
  router.patch("/user", user.update);
  router.delete("/user", user.delete);
  router.post("/login", auth.post);
  router.get("/getprofile", auth.get);


  //reservations

  router.post("/reservation", reservation.create);
  router.get("/reservation/:id", reservation.findById);
  router.get("/reservation", reservation.find);
  router.get("/reservation/hotel/:_idHotel", reservation.findByHotelId);
  router.get("/reservation/user/:_idUser", reservation.findAllByUser);
  router.patch("/reservation", reservation.update);
  router.delete("/reservation", reservation.delete);

  //hotels

  router.post("/hotel", hotel.create);
  router.get("/hotel", hotel.findOne);
  router.patch("/hotel", hotel.update);
  router.delete("/hotel", hotel.delete);
  router.get("/hotels", hotel.findAll);
  
  //rooms
  
  router.post("/room", room.create);
  router.get("/room", room.findOne);
  router.get("/allrooms", room.findByHotelId);
  router.get("/rooms", room.find)
  router.delete("/room", room.delete);
  router.patch("/room", room.update);

  app.use("", router);
};
