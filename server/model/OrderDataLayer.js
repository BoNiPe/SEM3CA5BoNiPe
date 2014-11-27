var mongoose = require('mongoose');
var orderModel = mongoose.model('OrderModel');

function getAllOrders(callback) {
    orderModel.find({}, function (err, orderData) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                callback(err,null)
            } else {
                callback(null, orderData);
            }
        }
    )
}

function getParticularOrder(orderID, callback) {
    orderModel.find({_id: orderID},function (err, orderData) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, orderData)
    })
};

function postOrder(orderObject, callback) {
    orderModel.create(orderObject ,function (err, orderData) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, orderData);
    });
}

function removeOrder(orderID, callback) {
    orderModel.remove({ _id: orderID }, function(err, response) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, response);
    });
}

function updateOrder(orderID,orderObject, callback) {
    orderModel.findOneAndUpdate({_id: orderID},orderObject ,function (err, orderData) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, orderData);
    });
}

module.exports = {
    getAllOrders: getAllOrders,
    getParticularOrder : getParticularOrder,
    postOrder : postOrder,
    removeOrder : removeOrder,
    updateOrder  : updateOrder
}