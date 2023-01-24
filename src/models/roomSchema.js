module.exports = mongoose => {
  var RoomSchema = mongoose.Schema(
    {
      _id: {
        type: String,
        unique: true
      },
      _idHotel: {
        type: String
      },
      roomQuantity: Number,
      state: Boolean,
      floor: Number,
      type_room: {
        type: String,
        default: null
      },
      description: {
        type: String,
        default: null
      }
    },
    { timestamps: true, versionKey: false }
  );

  const Room = mongoose.model("room", RoomSchema);

  return Room;
};