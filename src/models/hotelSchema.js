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
        image: String,
        rating_avg: {
          type: Number, 
          default: 5
        },
        count_reviews: Number,
        price: Number,
        services_price: {
          type: Number,
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Hotel = mongoose.model("hotel", HotelSchema);
  
    return Hotel;
  };