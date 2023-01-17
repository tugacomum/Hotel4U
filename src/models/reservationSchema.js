module.exports = mongoose => {
    var ReservationSchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
        _idUser: {
          type: String,
          unique: true
        },
        _idHotel: {
          type: String,
          unique: true
        },
        _idRoom: {
          type: String,
          unique: true
        },
        services: Boolean,
        price: Number,
        dayIn: {
            type: Date,
            default: Date.now
        },
        dayOut: {
            type: Date,
            default: () => new Date(+new Date() + 7*24*60*60*1000)
        },
        state: {
            type: Boolean,
            default: true
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Reservation = mongoose.model("reservation", ReservationSchema);
  
    return Reservation;
  };