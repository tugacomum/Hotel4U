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
        services: {
          type: Boolean,
        },
        price: Number,
        dayIn: {
            type: Date,
        },
        dayOut: {
            type: Date
        },
        state: {
            type: Boolean,
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Reservation = mongoose.model("reservation", ReservationSchema);
  
    return Reservation;
  };