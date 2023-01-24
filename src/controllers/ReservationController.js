const db = require("../models");
const Reservation = db.reservation;
const Hotel = db.hotel;
const IdIncrement = require('../shared/IdIncrement');

exports.create = async (req, res) => {
    const ultimoId = await Reservation.find({}).sort({ _id: -1 }).limit(1)
        .then((result) => {
            if (result[0] != undefined) {
                return result[0]._id
            } else {
                return "U000"
            }
        })

    const _id = IdIncrement(ultimoId)

    var date1 = new Date(req.body.dayIn);
    var date2 = new Date(req.body.dayOut);

    const _idHotel = req.body._idHotel;
    const _idUser = req.body._idUser;

    const hotel = await Hotel.findById({ _id: _idHotel });

    Reservation.find({ _idUser: req.body._idUser }).then(data => {
        if (data.length > 0) {
            if (isBetweenDates(data[0].dayIn, data[0].dayOut, date1)) {
                res.status(500).json({ error: "User made one reservation on that date already" })
                return
            } else if (compareDates(date1, date2)) {
                res.status(500).json({ error: "Day out not valid. You need to stay at least one night at the hotel" })
            } else {
                var Difference_In_Time = date2 - date1;
                const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                var reservationprice; var state;

                if (req.body.services == true) {
                    var services_final_price = hotel.services_price * Difference_In_Days;
                    var hotel_final_price = hotel.price * Difference_In_Days;
                    reservationprice = hotel_final_price + services_final_price;
                } else {
                    reservationprice = hotel.price * Difference_In_Days;
                }

                if (req.body.state) {
                    state = true
                } else state = false

                const reservation = new Reservation({
                    _id: _id,
                    _idUser: _idUser,
                    _idHotel: _idHotel,
                    _idRoom: "U001",
                    services: req.body.services,
                    price: reservationprice,
                    dayIn: date1,
                    dayOut: date2,
                    state: state
                });
                
                reservation.save(reservation).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error: Something failed trying to create the reservation."
                    });
                });
            }
        } else {
            if (compareDates(date1, date2)) {
                res.status(500).json({ error: "Day out not valid. You need to stay at least one night at the hotel" })
                return
            } else {
                var Difference_In_Time = date2 - date1;
                const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                var reservationprice; var state;

                if (req.body.services == true) {
                    var services_final_price = hotel.services_price * Difference_In_Days;
                    var hotel_final_price = hotel.price * Difference_In_Days;
                    reservationprice = hotel_final_price + services_final_price;
                } else {
                    reservationprice = hotel.price * Difference_In_Days;
                }

                if (req.body.state) {
                    state = true
                } else state = false

                const reservation = new Reservation({
                    _id: _id,
                    _idUser: _idUser,
                    _idHotel: _idHotel,
                    _idRoom: req.body._idRoom,
                    services: req.body.services,
                    price: reservationprice,
                    dayIn: date1,
                    dayOut: date2,
                    state: state
                });

                reservation.save(reservation).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Error: Something failed trying to create the reservation."
                    });
                });
            }
        }
    })


};

exports.findAllByUser = (req, res) => {
    if (!req.body._idUser) {
        res.status(400).json({ error: "error" })
        return
    }
    Reservation.find({ _idUser: req.body._idUser }).then(data => {
        if (!data)
            res.status(404).send({ message: "Reservations not found" });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Error retrieving Reservations" });
    })
};

exports.delete = (req, res) => {
    const _id = req.body._id;

    Reservation.findByIdAndRemove(_id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Reservation with id ${_id}. Reservation not found!`
                });
            } else {
                res.send({
                    message: "Reservation was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Reservation with id " + _id
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

    Reservation.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Reservation with id ${_id}. Reservation not found!`
                });
            } else res.send({ message: "Reservation was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reservation with id " + _id
            });
        });
};

function isBetweenDates(date1, date2, checkDate) {
    return checkDate >= date1 && checkDate <= date2;
}

function compareDates(date1, date2) {
    if (date1 >= date2) {
        return true;
    } else {
        return false;
    }
}