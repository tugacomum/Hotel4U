module.exports = mongoose => {
    var CittySchema = mongoose.Schema(
      {
        _id: {
          type: String,
          unique: true
        },
    },
      { timestamps: true, versionKey: false }
    );
  
    const Citty = mongoose.model("citty", CittySchema);
  
    return Citty;
  };