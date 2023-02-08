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
        preco: req.body.preco,
        servicos: req.body.servicos,
        nome: req.body.nome,
        endereco: req.body.endereco,
        descricao: req.body.descricao,
        imagens: req.body.imagens,
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
    Hotel.findById(req.params.id).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Hotel not found")
        }
    }).catch((err) => { 
        return res.status(500).send(err || "Error retrieving hotel with id: " + req.params.id)
    })
};

exports.findAll = (req, res) => {
    Hotel.find({}).then((result) => {
        if (result != null) {
            return res.status(200).send(result)
        } else {
            return res.status(404).send("Nothing found")
        }
    }).catch((err) => {
        return res.status(500).send(err || "Error")
    })
};

exports.delete = (req, res) => {
    Hotel.findByIdAndDelete(req.params._id, { useFindAndModify: false })
    .then((result) => {
        Quartos.deleteMany({hotel_id: req.params._id}).then((result)=>{
            return res.status(200).send("Hotel excluído com sucesso")
        }).catch((err)=>{
            console.log(err)
            return res.status(500).send(err + " Erro ao eliminar os quartos do hotel Id:" + req.params._id)
    })
        
    }).catch((err) => {
        return res.status(500).send(err + " Erro ao eliminar o hotel Id:" + req.params._id)

    })
};

exports.update = (req, res) => {
    Hotel.findByIdAndUpdate(req.params._id, req.body,{ useFindAndModify: false }).then(() => {
        return res.status(200).send("Hotel alterado")
    }).catch((err) => {
        return res.status(500).send(err || "Erro guardando alterações ao hotel Id:" + req.params._id)
    })
};