var mongoose = require('mongoose');
var orderModel = mongoose.model('OrderModel');

function getAllOrders(callback) {
    orderModel.find({}, function (err, orderData) {
            if (err) {
                return callback(err, null)
            }
            callback(null, orderData);

        }
    )
}

function getParticularOrder(orderID, callback) {
    orderModel.find({_id: orderID}, function (err, orderData) {
        if (err) {
            return callback(err, null)
        }
        callback(null, orderData)
    })
};

function postOrder(orderObject, callback) {
    orderModel.create(orderObject, function (err, orderData) {
        if (err) {
            return callback(err, null)
        }
        callback(null, orderData);
    });
}

function removeOrder(orderID, callback) {
    orderModel.remove({_id: orderID}, function (err, response) {
        if (err) {
            return callback(err, null)
        }
        callback(null, response);
    });
}

function updateOrder(orderID, orderObject, callback) {
    orderModel.findOneAndUpdate({_id: orderID}, orderObject, function (err, orderData) {
        if (err) {
            return callback(err, null)
        }
        callback(null, orderData);
    });
}


function getOrdersForLoggedUserAlias(userAlias, callback) {
    orderModel.find({userAlias: userAlias}, function (err, productData) {
        if (err) {
            return callback(err, null)
        }
        callback(null, productData)
    })
};

module.exports = {
    getAllOrders: getAllOrders,
    getParticularOrder: getParticularOrder,
    postOrder: postOrder,
    removeOrder: removeOrder,
    updateOrder: updateOrder,
    getOrdersForLoggedUserAlias: getOrdersForLoggedUserAlias
}