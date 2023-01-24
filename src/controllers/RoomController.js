const db = require("../models");
const Room = db.room;
const Hotel = db.hotel;
const IdIncrement = require('../shared/IdIncrement');

exports.create = async (req, res) => {
    const ultimoId = await Room.find({}).sort({ _id: -1 }).limit(1)
  .then((result) => {
      if (result[0] != undefined) {
          return result[0]._id
      } else {
          return "U000"
      }
  })

  const _id = IdIncrement(ultimoId)

    const room = new Room({
        _id: _id,
        _idHotel: req.body._idHotel,
        roomQuantity: req.body.roomQuantity,
        state: req.body.state,
        floor: req.body.floor,
        type_room: req.body.type_room,
        description: req.body.description
    });

    room.save(room).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error: Something failed trying to create the room."
        });
    });
};

exports.findOne = (req, res) => {
    const _id = req.body._id;
    Room.findById(_id).then(data => {
        if (!data)
            res.status(404).send({ message: "Room not found with id " + _id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Room with id " + _id + " cuzinho" })
    })
};

exports.delete = (req, res) => {
    const _id = req.body._id;

    Room.findByIdAndRemove(_id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Room with id ${_id}. Room not found!`
                });
            } else {
                res.send({
                    message: "Room was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Room with id " + _id
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

    Room.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Room with id ${_id}. Room not found!`
                });
            } else res.send({ message: "Room was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id " + _id
            });
        });
};

exports.findByHotelId = (req, res) => {
    Room.find({ _idHotel: req.body._idHotel }).then(data => {
        if (!data) {
            res.status(404).send({ 
                message: `No rooms found for that hotel`
            });
        } else res.status(200).json(data)
    })
}