module.exports = mongoose => {
  var UserSchema = mongoose.Schema(
    {
      "_id": {
        "type": String,
        "required": true,
        "unique": true
      },
      "nome": {
        "type": String,
        "required": true
      },
      "apelido": {
        "type": String,
        "required": true
      },
      "email": {
        "type": String,
        "required": true,
        "unique": true
      },
      "password": {
        "type": String,
        "required": true
      },
      "telefone": {
        "type": Number,
        "required": true,
        "unique": true
      },
      "data_nascimento": {
        "type": String,
        "required": true
      },
      "nif": {
        "type": Number,
        "required": true,
        "unique": true
      },
      "genero": {
        "type": String,
        "required": true
      },
      "admin": {
        "type": Boolean,
        "required": true
      }
    },
    { timestamps: true, versionKey: false }
  );

  const User = mongoose.model("user", UserSchema);

  return User;
};