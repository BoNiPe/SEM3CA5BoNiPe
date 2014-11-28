var express = require('express');
var router = express.Router();

var OrderDataLayerModel = require('../model/OrderDataLayer');
var ProductDataLayerModel = require('../model/ProductDataLayer');
var PaymentDataLayerModel = require('../model/PaymentDataLayer');

//see all users, see all user details, create new admin user etc. customer <<
//***additional : change see user details (also admin should see all users details + change see delete
//lasted added Products

router.get('/order', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    OrderDataLayerModel.getAllOrders(function (err, orderData) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(orderData));
    })
});

router.get('/order/:id', function (req, res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    OrderDataLayerModel.getParticularOrder(id, function (err, currentOrder) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentOrder));
    })
});

router.post('/order', function(req,res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    var createdUser = req.body;
    OrderDataLayerModel.postOrder(createdUser, function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })
});

router.delete("/order/:id", function(req,res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    OrderDataLayerModel.removeOrder(id, function (err, currentOrder) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentOrder));
    })
});

router.put("/order/:id", function(req,res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    OrderDataLayerModel.updateOrder(id, req.body, function (err, currentProduct) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentProduct));
    })
});

router.get('/product', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    ProductDataLayerModel.getAllProducts(function (err, orderData) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(orderData));
    })
});

router.get('/product/:id', function (req, res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    ProductDataLayerModel.getParticularProduct(id, function (err, currentProduct) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentProduct));
    })
});

router.post('/product', function(req,res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    var createdProduct = req.body;
    ProductDataLayerModel.postProduct(createdProduct, function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })
});

router.delete("/product/:id", function(req,res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    ProductDataLayerModel.removeProduct(id, function (err, currentProduct) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentProduct));
    })
});

router.put("/product/:id", function(req,res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    ProductDataLayerModel.updateProduct(id, req.body, function (err, currentProduct) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentProduct));
    })
});

router.get('/payment', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    PaymentDataLayerModel.getAllPayments(function (err, orderData) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(orderData));
    })
});

router.get('/payment/:id', function (req, res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    PaymentDataLayerModel.getParticularPayment(id, function (err, currentPayment) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentPayment));
    })
});

router.post('/payment', function(req,res) {
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    var createdPayment = req.body;
    PaymentDataLayerModel.postPayment(createdPayment, function (err, result) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(result));
    })
});

router.delete("/payment/:id", function(req,res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    PaymentDataLayerModel.removePayment(id, function (err, currentPayment) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentPayment));
    })
});

router.put("/payment/:id", function(req,res) {
    var id = req.params.id;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    PaymentDataLayerModel.updatePayment(id, req.body, function (err, currentPayment) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentPayment));
    })
});

module.exports = router;
