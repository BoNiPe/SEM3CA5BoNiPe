var mongoose = require('mongoose');
var productModel = mongoose.model('ProductModel');

function getAllProducts(callback) {
    productModel.find({}, function (err, productData) {
            if (err) {
                callback(err,null)
            } else {
                callback(null, productData);
            }
        }
    )
}

function getParticularProduct(productID, callback) {
    productModel.find({_id: productID},function (err, productData) {
        if (err) {
            callback(err,null)
        }
        callback(null, productData)
    })
};

function postProduct(productObject, callback) {
    productModel.create(productObject ,function (err, productData) {
        if (err) {
            callback(err,null)
        }
        callback(null, productData);
    });
}

function removeProduct(productID, callback) {
    productModel.remove({ _id: productID }, function(err, response) {
        if (err) {
            callback(err,null)
        }
        callback(null, response);
    });
}

function updateProduct(productID,productObject, callback) {
    productModel.findOneAndUpdate({_id: productID},productObject ,function (err, productData) {
        if (err) {
            res.status(err.status || 500);
            res.end(JSON.stringify({error: err.toString()}));
            callback(err,null)
        }
        callback(null, productData);
    });
}

module.exports = {
    getAllProducts: getAllProducts,
    getParticularProduct : getParticularProduct,
    postProduct : postProduct,
    removeProduct: removeProduct,
    updateProduct : updateProduct
}