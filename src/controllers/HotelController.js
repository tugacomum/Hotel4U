const db = require("../models");
const Hotel = db.hotel;
const IdIncrement = require('../shared/IdIncrement')

exports.create = async (req, res) => {
    const ultimoId = await Hotel.find({}).sort({ _id: -1 }).limit(1)
  .then((result) => {
      if (result[0] != undefined) {
          return result[0]._id
      } else {
          return "U000"
      }
  })

  const _id = IdIncrement(ultimoId)
    const hotel = new Hotel({
        _id: _id,
        name: req.body.name,
        cittyId: req.body.cittyId,
        description: req.body.description,
        image: req.body.image
    });

    hotel.save(hotel).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error: Something failed trying to create the hotel."
        });
    });
};

exports.findOne = (req, res) => {
    const _id = req.body._id;
    Hotel.findById(_id).then(data => {
        if (!data)
            res.status(404).send({ message: "Hotel not found with id " + _id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Hotel with id " + _id })
    })
};

exports.findAll = (req, res) => {
    Hotel.find({}).then(data => {
        if (!data)
            res.status(404).send({ message: "Hotels not found" });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Hotels" });
    })
};

exports.delete = (req, res) => {
    const _id = req.body._id;

    Hotel.findByIdAndRemove(_id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Hotel with id ${_id}. Hotel not found!`
                });
            } else {
                res.send({
                    message: "Hotel was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Hotel with id " + _id
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

    Hotel.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Hotel with id ${_id}. Hotel not found!`
                });
            } else res.send({ message: "Hotel was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Hotel with id " + _id
            });
        });
};

// Encontrar todos os hotéis