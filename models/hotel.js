const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  imageurls: [],
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
}, {
    timestamps: true,
});


const hotelModel = mongoose.model("hotels", hotelSchema);

module.exports = hotelModel;