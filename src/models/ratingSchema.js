module.exports = mongoose => {
    var RatingSchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
    },
      { timestamps: true, versionKey: false }
    );
  
    const Rating = mongoose.model("rating", RatingSchema);
  
    return Rating;
  };