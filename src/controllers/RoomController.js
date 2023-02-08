const db = require("../models");
const Room = db.room;
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
        hotel_id: req.body.hotel_id,
        andar: req.body.andar,
        numero_quarto: req.body.numero_quarto,
        tipo: req.body.tipo,
        descricao: req.body.descricao,
        disponivel: req.body.disponivel,
        servicos: req.body.servicos
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
    Room.findById(req.params.id).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo o quarto com Id:" + req.params.id)
    })
};

exports.find = (req, res) => {
    Room.find({}).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo todos os Quartos")
    })
}

exports.delete = (req, res) => {
    Room.findByIdAndDelete(req.params._id, { useFindAndModify: false }).then((result) => {
        return res.status(200).send("Quarto excluído com sucesso")
    }).catch((err) => {
        console.log(err)
        return res.status(500).send(err + " Erro ao eliminar o quarto Id:" + req.params._id)

    })
};

exports.update = (req, res) => {
    Room.findByIdAndUpdate(req.params._id, req.body,{ useFindAndModify: false }).then(() => {
        return res.status(200).send("quarto alterado")
    }).catch((err) => {
        return res.status(500).send(err || "Erro guardando alterações ao quarto Id:" + req.params._id)
    })
};

exports.findByHotelId = (req, res) => {
    Room.find({_idHotel: req.params._idHotel}).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nada encontrado")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Erro devolvendo os quartos do hotel Id:" + req.params.hotel_id)
    })
}