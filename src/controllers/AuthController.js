const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs')
const SECRET_JWT_CODE = "psmR3Hu0ihHKfqZymo1m"
const JsonWebToken = require('jsonwebtoken')

exports.get = (req, res) => {
    encontrarUserPorToken(req).then((user)=>{
        return res.status(200).send(user)
    }).catch((err)=>{
        return res.status(500).send(err)
    })
}

function encontrarUserPorToken(req){
    return new Promise((resolve, reject)=>{
        if(req.headers && req.headers.authorization){
            let token = req.headers.authorization
            let decode
            try{
                decode = JsonWebToken.verify(token, SECRET_JWT_CODE)
            }catch(e){
                 reject("Token inválido")
                 return
            }
            let userId=decode._id
            User.findById(userId).then((user)=>{
                if(user){
                    resolve(user)
                }else{
                    reject("Utilizador não encontrado")
                }
            }).catch((err)=>{
                reject("Erro com o token")
            })
        }else{
            reject("Token não encontrado")
        }
    })
}

exports.post = (req, res) => {
    User.findOne({email:req.body.email}).then(user => {
        if(!user){
               return res.status(404).send("Utilizador não encontrado")
        }else{
         if(!bcrypt.compareSync(req.body.password, user.password)){
             return res.status(401).send("Password incorreta")
         }else{
             const token = JsonWebToken.sign({_id:user._id, email:user.email},SECRET_JWT_CODE)
             return res.status(200).send({token:token, user:user})
         }
        }
     }).catch((err)=>{
         return res.status(500).send(err)
     })
}