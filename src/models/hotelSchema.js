module.exports = mongoose => {
    var HotelSchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
        name: String,
        location: String,
        description: String,
        image: {
          type: [String]
        },
        available: {
          type: Boolean
        },
        services: {
          type: [String],
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Hotel = mongoose.model("hotel", HotelSchema);
  
    return Hotel;
  };