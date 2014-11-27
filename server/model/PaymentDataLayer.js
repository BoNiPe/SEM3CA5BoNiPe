var mongoose = require('mongoose');
var paymentModel = mongoose.model('PaymentModel');

function getAllPayments(callback) {
    paymentModel.find({}, function (err, paymentData) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                callback(err,null)
            } else {
                callback(null, paymentData);
            }
        }
    )
}

function getParticularPayment(paymentID, callback) {
    paymentModel.find({_id: paymentID},function (err, paymentData) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, paymentData)
    })
};

function postPayment(paymentObject, callback) {
    paymentModel.create(paymentObject ,function (err, paymentData) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, paymentData);
    });
}

function removePayment(paymentID, callback) {
    paymentModel.remove({ _id: paymentID }, function(err, response) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, response);
    });
}

function updatePayment(paymentID,paymentObject, callback) {
    paymentModel.findOneAndUpdate({_id: paymentID},paymentObject ,function (err, paymentData) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, paymentData);
    });
}

module.exports = {
    getAllPayments : getAllPayments,
    getParticularPayment : getParticularPayment,
    postPayment : postPayment,
    removePayment : removePayment,
    updatePayment : updatePayment
}