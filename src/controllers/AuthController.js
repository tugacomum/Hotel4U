const db = require("../models");
const User = db.user;
const bcrypt = require('bcryptjs')
const SECRET_JWT_CODE = "psmR3Hu0ihHKfqZymo1m"
const JsonWebToken = require('jsonwebtoken')
var nodemailer = require('nodemailer')

exports.get = (req, res) => {
    fetchUserByToken(req).then((user) => {
        res.status(200).json({ user })
    }).catch((err) => {
        //token not valid
        res.status(400).json({ sucess: false })
    })
}

function fetchUserByToken(req) {
    return new Promise((resolve, reject) => {
        if (req.headers && req.headers.authorization) {
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

exports.sendMail = (email, title, message, req, res) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: 'software.for.you.official@gmail.com',
            pass: 'ojhwhsvwidjgfrsm'
        }
    });

    var mailOptions = {
        from: 'Hotel4U <noreply@hotel4u.pt>',
        to: email,
        subject: title,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({ sucess: true })
        }
    });
}

exports.verify = (req, res) => {
    const filter = { username: req.body.username };
    const update = { emailVerified: true, verifyEmailCode: null };
    User.findOne(filter).then((user) => {
        if (!user) {
            res.status(400).json({ sucess: false, error: 'User does not exists' })
        } else if (req.body.code !== user.verifyEmailCode) {
            res.status(400).json({ sucess: false, error: 'Code does not match' })
        } else {
            User.findByIdAndUpdate(user._id, update)
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
        }
    })
}

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
                    res.json({ sucess: true, token: token, user: user })
                }
            }
        })
        .catch((err) => {
            res.json({ sucess: false, error: err })
        })
}

exports.recover = (req, res) => {
    const code = Math.floor(Math.random() * (999_999 - 100_000 + 1)) + 100_000;
    if (!req.body.username) {
        res.json({ sucess: false, error: 'Parameters missing' })
        return
    }
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.json({ sucess: false, error: 'User does not exists' })
            } else {
                const update = { passwordRecoveryCode: code };
                User.findByIdAndUpdate(user._id, update, { useFindAndModify: false })
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
                const title = 'Recover your password on Hotel4U'
                const message = 'Use the following code on app: ' + code.toString();
                this.sendMail(req.body.email, title, message)
            }
        })
        .catch((err) => {
            res.json({ sucess: false, error: err })
        })
}