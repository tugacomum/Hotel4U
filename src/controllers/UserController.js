const db = require("../models");
const User = db.user;
const Auth = require('./AuthController');
const bcrypt = require('bcryptjs');
const IdIncrement = require('../shared/IdIncrement')

exports.create = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.json({ sucess: false, error: 'Parameters missing' })
    return
  }

  const code = Math.floor(Math.random() * (999_999 - 100_000 + 1)) + 100_000;

  const ultimoId = await User.find({}).sort({ _id: -1 }).limit(1)
  .then((result) => {
      if (result[0] != undefined) {
          return result[0]._id
      } else {
          return "U000"
      }
  })

  const _id = IdIncrement(ultimoId)

  const user = new User({
    _id: _id,
    username: req.body.username,
    email: req.body.email,
    phone_number: req.body.phone_number,
    verifyEmailCode: code,
    password: bcrypt.hashSync(req.body.password, 10),
    birthDate: req.body.birthDate
  });

  const title = 'Verify your account on Hotel4U'
  const message = 'Use the following code on app: ' + code.toString();

  Auth.sendMail(req.body.email, title, message);

  user.save(user).then(user => {
    res.json({ sucess: true })
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Error: Something failed trying to create the user."
    });
  });
};

exports.findOne = (req, res) => {
  const _id = req.body._id;
  User.findById(_id).then(data => {
    if (!data)
      res.status(404).send({ message: "User not found with id " + _id });
    else res.send(data);
  }).catch(err => {
    res.status(500).send({ message: "Error retrieving User with id " + _id })
  })
};

exports.delete = (req, res) => {
  const _id = req.body._id;

  User.findByIdAndRemove(_id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id ${_id}. User not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id " + _id
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const _id = req.body._id;

  User.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id ${_id}. User not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id " + _id
      });
    });
};