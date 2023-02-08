module.exports = mongoose => {
    var ReservationSchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
        _idUser: {
          type: String,
        },
        _idRoom: {
          type: String
        },
        _idHotel: {
          type: String,
        },
        price: Number,
        dayIn: {
            type: String,
        },
        dayOut: {
            type: String
        },
        state: {
          type: String
        },
        count_ppl: {
          type: Number
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Reservation = mongoose.model("reservation", ReservationSchema);
  
    return Reservation;
  };