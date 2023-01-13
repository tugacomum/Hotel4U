const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs')

exports.create = (req, res) => {

  if (!req.body.email || !req.body.password) {
    res.json({ sucess: false, error: 'Parameters missing' })
    return
  }

  const user = new User({
    _id: req.body._id,
    username: req.body.username,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: bcrypt.hashSync(req.body.password, 10),
    birthDate: req.body.birthDate
  });

  user.save(user).then(user => {
    //const token = JsonWebToken.sign({ _id: user._id, email: user.email }, SECRET_JWT_CODE)
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