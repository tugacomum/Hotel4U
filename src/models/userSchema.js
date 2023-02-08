module.exports = mongoose => {
  var UserSchema = mongoose.Schema(
    {
      _id: {
        type: String,
        unique: true
      },
      username: {
          type: String,
          unique: true
      },
      adress: {
        type: String,
        default: 'Portugal'
      },
      phone_number: {
        type: Number,
        default: null
      },
      nif: {
        type: Number,
        unique: true
      },
      email: {
          type: String,
          unique: true
      },
      password: String,
      isAdmin: {
          type: Boolean,
          default: false
      },
      birthDate: {
          type: Date,
          default: null
      }
  },
    { timestamps: true, versionKey: false }
  );

  const User = mongoose.model("user", UserSchema);

  return User;
};
