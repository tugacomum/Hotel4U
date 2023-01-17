module.exports = mongoose => {
    var CountrySchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
    },
      { timestamps: true, versionKey: false }
    );
  
    const Country = mongoose.model("country", CountrySchema);
  
    return Country;
  };