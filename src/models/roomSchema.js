module.exports = mongoose => {
  var RoomSchema = mongoose.Schema(
    {
      _id: {
        type: String,
        unique: true
      },
      hotel_id: {
        type: String
      },
      numero_quarto: Number,
      disponivel: {
        type: Boolean
      },
      tipo: {
        type: String,
        default: null
      },
      descricao: {
        type: String,
        default: null
      },
      preco: {
        type: Number
      },
      andar: {
        type: Number
      },
      servicos: {
        type: [String]
      }
    },
    { timestamps: true, versionKey: false }
  );

  const Room = mongoose.model("room", RoomSchema);

  return Room;
};