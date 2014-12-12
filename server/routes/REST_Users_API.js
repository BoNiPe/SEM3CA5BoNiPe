var express = require('express');

var router = express.Router();
router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message, You are logged on as a User since you could fetch this data"}');
});

var OrderDataLayerModel = require('../model/OrderDataLayer');
var ProductDataLayerModel = require('../model/ProductDataLayer');
var PaymentDataLayerModel = require('../model/PaymentDataLayer');

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

router.get('/order/:userAlias', function (req, res) {
    var userAlias = req.params.userAlias;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    OrderDataLayerModel.getOrdersForLoggedUserAlias(userAlias, function (err, ordersForUserAlias) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(ordersForUserAlias));
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

router.delete("/payment/byID/:orderID", function(req,res) {
    var id = req.params.orderID;
    console.log("id of order: "+ id);
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    PaymentDataLayerModel.removePaymentByOrder(id, function (err, currentPayment) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(currentPayment));
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

router.get('/payment/byAlias/:userAlias', function (req, res) {
    var userAlias = req.params.userAlias;
    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " or with simple words : Your db's SWAG level is below 9000. Sorry");
        return;
    }
    PaymentDataLayerModel.getPaymentsForLoggedUserAlias(userAlias, function (err, paymentsForUserAlias) {
        if (err) {
            res.status(err.status || 400);
            res.send(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(paymentsForUserAlias));
    })
});

router.get('/payment/byID/:id', function (req, res) {
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

//basket is only frontend, if you press confirm it will make a post request to createOrder(s)
//getUser's orders (basket)
//getUser's payments (basket part2)
//getProducts
//getParticularProduct
//orderProduct(createOrder)

//change see user details (also admin should see all users details + change see delete

module.exports = router;
