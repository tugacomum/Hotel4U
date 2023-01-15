module.exports = mongoose => {
  var UserSchema = mongoose.Schema(
    {
      _id: Number,
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
      email: {
        type: String,
        unique: true
      },
      password: String,
      image: {
        type: String,
        default: null
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      verifyEmailCode: Number,
      emailVerified: {
        type: Boolean,
        default: false
      },
      passwordRecoveryCode: Number,
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
