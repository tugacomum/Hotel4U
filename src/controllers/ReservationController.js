const db = require("../models");
const Reservation = db.reservation;
const IdIncrement = require('../shared/IdIncrement');

exports.create = async (req, res) => {
    const {
        _idUser,
        _idRoom,
        _idHotel,
        price,
        dayIn,
        dayOut,
        state,
        count_ppl
    } = req.body

    const ultimoId = await Reservas.find({})
        .sort({ _id: -1 })
        .limit(1)
        .then((result) => {
            if (result[0] != undefined) {
                return result[0]._id;
            } else {
                return "R000";
            }
        });

    const _id = IdIncrement(ultimoId);

    Reservation.create({
        _id,
        _idUser,
        _idRoom,
        _idHotel,
        price,
        dayIn,
        dayOut,
        state,
        count_ppl
    }).then(() => {
        return res.status(200).send("reserva adicionada");
    })
        .catch((err) => {
            return res.status(500).send("Algo falhou tenta novamente criar" + err);
        });
};

exports.findByHotelId = (req, res) => {
    Reservation.find({ _idHotel: req.params._idHotel })
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .send(
          err ||
          "Erro devolvendo as reservas do hotel Id:" + req.params._idHotel
        );
    });
}

exports.findAllByUser = (req, res) => {
    Reservation.find({ _idUser: req.params._idUser })
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).send(err || "Erro devolvendo as reservas do utilizador Id:" + req.params._idUser);
    });
};

exports.find = (req, res) => { 
    Reservation.find({})
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).send(err || "Erro devolvendo todas as Reservas");
    });
}

exports.findById = (req, res) => {
    Reservation.findById(req.params.id)
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .send(err || "Erro devolvendo a reserva com Id:" + req.params.id);
    });
}



exports.delete = (req, res) => {
    Reservation.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result != null) {
                return res.status(200).send("Reserva eliminada");
            } else {
                return res.status(404).send("Nada encontrado");
            }
        })
        .catch((err) => {
            return res.status(500).
                send(err || "Erro eliminando a reserva com Id:" + req.params.id);
        });
};

exports.update = (req, res) => {
    Reservation.findByIdAndUpdate(req.params._id, req.body, { useFindAndModify: false })
        .then((result) => {
            if (result != null) {
                return res.status(200).send("Reserva atualizada");
            } else {
                return res.status(404).send("Nada encontrado");
            }
        })
        .catch((err) => {
            return res.status(500).
                send(err || "Erro atualizando a reserva com Id:" + req.params.id);
        });
};