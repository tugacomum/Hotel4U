module.exports = mongoose => {
    var HotelSchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
        nome: String,
        endereco: String,
        descricao: String,
        imagens: {
          type: [String]
        },
        disponivel: {
          type: Boolean
        },
        servicos: {
          type: [String],
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Hotel = mongoose.model("hotel", HotelSchema);
  
    return Hotel;
  };