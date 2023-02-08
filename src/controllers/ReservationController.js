const db = require("../models");
const Reservation = db.reservation;
const IdIncrement = require('../shared/IdIncrement');

exports.create = async (req, res) => {
  const {
    hotel_id,
    quarto_id,
    utilizador_id,
    data_entrada,
    data_saida,
    preco,
    numero_pessoas,
    estado,
    observacoes,
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
    hotel_id,
    quarto_id,
    utilizador_id,
    data_entrada,
    data_saida,
    preco,
    numero_pessoas,
    estado,
    observacoes,
  }).then(() => {
    return res.status(200).send("reserva adicionada");
  })
    .catch((err) => {
      return res.status(500).send("Algo falhou tenta novamente criar" + err);
    });
};

exports.findByHotelId = (req, res) => {
  Reservation.find({ hotel_id: req.params.hotel_id })
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
          "Erro devolvendo as reservas do hotel Id:" + req.params.hotel_id
        );
    });
}

exports.findAllByUser = (req, res) => {
  Reservation.find({ utilizador_id: req.params.utilizador_id })
    .then((result) => {
      if (result != null) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send("Nada encontrado");
      }
    })
    .catch((err) => {
      return res.status(500).send(err || "Erro devolvendo as reservas do utilizador Id:" + req.params.utilizador_id);
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