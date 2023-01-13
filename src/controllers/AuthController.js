const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs')
const SECRET_JWT_CODE = "psmR3Hu0ihHKfqZymo1m"
const JsonWebToken = require('jsonwebtoken')

exports.post = (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.json({ sucess: false, error: 'User does not exists' })
            } else {
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    res.json({ sucess: false, error: 'Wrong password' })
                } else {
                    const token = JsonWebToken.sign({ _id: user._id, username: user.username }, SECRET_JWT_CODE)
                    res.json({ sucess: true, token: token, user: user})
                }
            }
        })
        .catch((err) => {
            res.json({ sucess: false, error: err })
        })
}

exports.get = (req, res) => {
    fetchUserByToken(req).then((user) => {
        res.status(200).json({user})
    }).catch((err) => {
        //token not valid
        res.status(400).json({ sucess: false })
    })
}

function fetchUserByToken(req) {
    return new Promise((resolve, reject) => {
        if(req.headers && req.headers.authorization) {
            let authorization = req.headers.authorization
            let decoded
            try {
                decoded = JsonWebToken.verify(authorization, SECRET_JWT_CODE)
            } catch (e) {
                reject("Token not valid")
                return
            }
            let userId = decoded._id
            User.findOne({ _id: userId }).then((user) => { resolve(user) }).catch((err) => { reject("Token error") })
        } else {
            reject("No token found")
        }
    })
}