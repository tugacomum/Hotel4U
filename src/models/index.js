const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./userSchema")(mongoose);
db.room = require("./roomSchema")(mongoose);
db.reservation = require("./reservationSchema")(mongoose);
db.hotel = require("./hotelSchema")(mongoose);
db.citty = require("./cittySchema")(mongoose);
db.country = require("./countrySchema")(mongoose);
db.image = require("./imageSchema")(mongoose);
db.rating = require("./ratingSchema")(mongoose);

module.exports = db;