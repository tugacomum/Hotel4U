module.exports = mongoose => {
    var ReservationSchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
        utilizador_id: {
          type: String,
        },
        quarto_id: {
          type: String
        },
        hotel_id: {
          type: String,
        },
        preco: Number,
        data_entrada: {
            type: String,
        },
        data_saida: {
            type: String
        },
        estado: {
          type: String
        },
        numero_pessoas: {
          type: Number
        },
        observacoes: {
          type: String
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Reservation = mongoose.model("reservation", ReservationSchema);
  
    return Reservation;
  };