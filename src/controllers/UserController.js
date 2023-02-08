const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs');
const IdIncrement = require('../shared/IdIncrement')

exports.create = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ sucess: false, error: 'Parameters missing' })
    return
  }

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
    nome: req.body.nome,
    apelido: req.body.apelido,
    email: req.body.email,
    nif: req.body.nif,
    genero: req.body.genero,
    telefone: req.body.telefone,
    password: bcrypt.hashSync(req.body.password, 10),
    data_nascimento: req.body.data_nascimento
  });

  user.save(user).then(user => {
    res.json({ sucess: true })
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Error: Something failed trying to create the user."
    });
  });
};

exports.find = (req, res) => {
  User.find({}).then(result => {
    if (result != null) {
      return res.status(200).send(result)
    } else {
      return res.status(404).send("Nada encontrado")
    }
  }).catch((err) => {
    return res.status(500).send(err || "Erro devolvendo todos os utilizadores")
  })
}

exports.findOne = (req, res) => {
  User.findById(req.params._id).then(result => {
    if (result != null) {
      return res.status(200).send(result)
    } else {
      return res.status(404).send("Nada encontrado")
    }

  }).catch((err) => {
    return res.status(500).send(err || "Erro retornando o utilizador Id:" + req.params._id)
  })
};

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params._id, { useFindAndModify: false }).then(() => {
    return res.status(200).send("Utilizador excluído com sucesso")
  }).catch((err) => {
    console.log(err)
    return res.status(500).send(err || "Erro ao eliminar o utilizador Id:" + _id)

  })
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Nada para fazer update");
  }
  User.findByIdAndUpdate(req.params._id, req.body, { useFindAndModify: false }).then((result) => {
    return res.status(200).send(result);
  }).catch((err) => {
    return res.status(500).send(err || "Erro guardando alterações ao utilizador Id:" + req.params._id)
  })
};