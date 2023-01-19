module.exports = mongoose => {
    var ImageSchema = mongoose.Schema(
      {
        name: {
            type: String, 
            required: true
        },
        image: {
            data: Buffer,
            contentType: String
        }
    },
      { timestamps: true, versionKey: false }
    );
  
    const Image = mongoose.model("image", ImageSchema);
  
    return Image;
  };