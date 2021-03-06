global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
global.SKIP_AUTHENTICATION = true;
var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var OrderModel = mongoose.model("OrderModel");
var ProductModel = mongoose.model("ProductModel");
//var PaymentModel = mongoose.model("PaymentModel");
var request = require('request');

describe('Backend testing of Admin REST-API (Order)', function () {
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {
        OrderModel.remove({}, function (err, response) {
            if (err) {
                console.log("remove error was:" + err)
            }
        });
        var array = [
            {
                "status": "Denied",
                "productID": "5477151d917c51ae2633cec2",
                "quantity": 20,
                "userAlias": "bobkoo"
            },
            {
                "status": "Pending",
                "productID": "5477151d917c51ae2633cec3",
                "quantity": 25,
                "userAlias": "ToPeter"
            }
        ];
        OrderModel.create(array, function (err, response) {
            if (err) {
                console.log("create error was:" + err)
            }
            done();
        });
    });

    after(function () {
        mongoose.connection.db.dropDatabase();
        testServer.close();
    })

    it("Testing /order (Get Orders) - Should return all orders. ", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/order", function (res) {
            res.setEncoding("utf8");
            res.statusCode.should.equal(200);
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                n[0]._id.should.be.length(24);
                n[0].status.should.equal("Denied");
                n[0].quantity.should.equal(20);
                n[0].productID.should.equal("5477151d917c51ae2633cec2");
                n[0].userAlias.should.equal("bobkoo");
                n[1]._id.should.be.length(24);
                n[1].status.should.equal("Pending");
                n[1].quantity.should.equal(25);
                n[1].productID.should.equal("5477151d917c51ae2633cec3");
                n[1].userAlias.should.equal("ToPeter");
                done();
            });
        })
    });

    it("Testing /order/:id (Get Order) - Should return order by id. ", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/order", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var id = n[0]._id;
                http.get("http://localhost:" + testPort + "/adminApi/order/" + id, function (res) {
                    res.setEncoding("utf8");
                    res.statusCode.should.equal(200);
                    res.on("data", function (chunk) {
                        var n = JSON.parse(chunk);
                        n.length.should.equal(1);
                        n[0]._id.should.be.length(24);
                        n[0]._id.should.be.equal(id);
                        n[0].status.should.equal("Denied");
                        n[0].quantity.should.equal(20);
                        n[0].productID.should.equal("5477151d917c51ae2633cec2");
                        n[0].userAlias.should.equal("bobkoo");
                        done();
                    });
                })
            });
        })
    });

    it("Testing /order (Create Order) - Should return the added object.", function (done) {
        request({
                method: 'POST',
                url: "http://localhost:" + testPort + "/adminApi/order",
                headers: {'Content-Type': 'application/json'},
                json: {
                    "status": "Delivered",
                    "productID": "5477151d917c51ae2633cec4",
                    "quantity": 25,
                    "userAlias": "Nik"
                }
            },
            function (error, response, body) {
                response.statusCode.should.equal(200);
                body.status.should.equal("Delivered");
                body.productID.should.equal("5477151d917c51ae2633cec4");
                body.quantity.should.equal(25);
                body.userAlias.should.equal("Nik");
                done();
            })
    })

    it("Testing /order/:id (Delete Order) - Should return 1, which means deleted.", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/order", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var id = n[0]._id;
                request({
                        method: 'DELETE',
                        url: "http://localhost:" + testPort + "/adminApi/order/" + id,
                        headers: {'Content-Type': 'application/json'}
                    },
                    function (error, response, body) {
                        response.statusCode.should.equal(200);
                        body.should.equal("1");
                        done();
                    })
            });
        })
    })

    it("Testing /order/:id (Edit Order) - Should return the new edited object.", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/order", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var id = n[0]._id;
                request({
                        method: 'PUT',
                        url: "http://localhost:" + testPort + "/adminApi/order/" + id,
                        headers: {'Content-Type': 'application/json'},
                        json: {
                            "status": "Sent",
                            "productID": "123456789012345678901234",
                            "quantity": 73,
                            "userAlias": "bobkoo"
                        }
                    },
                    function (error, response, body) {
                        response.statusCode.should.equal(200);
                        body.status.should.equal("Sent");
                        body.productID.should.equal("123456789012345678901234");
                        body.quantity.should.equal(73);
                        body.userAlias.should.equal("bobkoo");
                        done();
                    })
            });
        })
    })
});

describe('Backend testing of Admin REST-API (Product)', function () {
    before(function (done) {
        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    })

    beforeEach(function (done) {
        ProductModel.remove({}, function (err, response) {
            if (err) {
                console.log("remove error was:" + err)
            }
        });
        var array = [
            {
                "productName": "Banana",
                "productDescription": "I am banana",
                "unitPrice": 5,
                "userAlias": "marto"

            },
            {
                "productName": "Potato",
                "productDescription": "I am potato",
                "unitPrice": 3,
                "userAlias": "kalo"
            }
        ];
        ProductModel.create(array, function (err, response) {
            if (err) {
                console.log("create error was:" + err)
            }
            done();
        });
    });

    after(function () {
        mongoose.connection.db.dropDatabase();
        testServer.close();
    })

    it("Testing /product (Get Products) - Should return all products. ", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/product", function (res) {
            res.setEncoding("utf8");
            res.statusCode.should.equal(200);
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                n[0]._id.should.be.length(24);
                n[0].productName.should.equal("Banana");
                n[0].productDescription.should.equal("I am banana");
                n[0].unitPrice.should.equal(5);
                n[0].userAlias.should.equal("marto");
                n[1]._id.should.be.length(24);
                n[1].productName.should.equal("Potato");
                n[1].productDescription.should.equal("I am potato");
                n[1].unitPrice.should.equal(3);
                n[1].userAlias.should.equal("kalo");
                done();
            });
        })
    });

    it("Testing /product/:id (Get Product) - Should return product by id. ", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/product", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var id = n[0]._id;
                http.get("http://localhost:" + testPort + "/adminApi/product/" + id, function (res) {
                    res.setEncoding("utf8");
                    res.statusCode.should.equal(200);
                    res.on("data", function (chunk) {
                        var n = JSON.parse(chunk);
                        n.length.should.equal(1);
                        n[0]._id.should.be.length(24);
                        n[0]._id.should.be.equal(id);
                        n[0].productName.should.equal("Banana");
                        n[0].productDescription.should.equal("I am banana");
                        n[0].unitPrice.should.equal(5);
                        n[0].userAlias.should.equal("marto");
                        done();
                    });
                })
            });
        })
    });

    it("Testing /product (Create Product) - Should return the added object.", function (done) {
        request({
                method: 'POST',
                url: "http://localhost:" + testPort + "/adminApi/product",
                headers: {'Content-Type': 'application/json'},
                json: {
                    "productName": "Pizza",
                    "productDescription": "I am pizza",
                    "unitPrice": 0.5,
                    "userAlias": "keranov"
                }
            },
            function (error, response, body) {
                response.statusCode.should.equal(200);
                body._id.should.be.length(24);
                body.productName.should.equal("Pizza");
                body.productDescription.should.equal("I am pizza");
                body.unitPrice.should.equal(0.5);
                body.userAlias.should.equal("keranov");
                done();
            })
    })

    it("Testing /product/:id (Delete Product) - Should return 1, which means deleted.", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/product", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var id = n[0]._id;
                request({
                        method: 'DELETE',
                        url: "http://localhost:" + testPort + "/adminApi/product/" + id,
                        headers: {'Content-Type': 'application/json'}
                    },
                    function (error, response, body) {
                        response.statusCode.should.equal(200);
                        body.should.equal("1");
                        done();
                    })
            });
        })
    })

    it("Testing /product/:id (Edit Product) - Should return the new edited object.", function (done) {
        http.get("http://localhost:" + testPort + "/adminApi/product", function (res) {
            res.setEncoding("utf8");
            res.on("data", function (chunk) {
                var n = JSON.parse(chunk);
                var id = n[0]._id;
                request({
                        method: 'PUT',
                        url: "http://localhost:" + testPort + "/adminApi/product/" + id,
                        headers: {'Content-Type': 'application/json'},
                        json: {
                            "productName": "Fresh Banana",
                            "productDescription": "I am banana and I like it",
                            "unitPrice": 10,
                            "userAlias": "marto"
                        }
                    },
                    function (error, response, body) {
                        response.statusCode.should.equal(200);
                        body._id.should.be.length(24);
                        body.productName.should.equal("Fresh Banana");
                        body.productDescription.should.equal("I am banana and I like it");
                        body.unitPrice.should.equal(10);
                        body.userAlias.should.equal("marto");
                        done();
                    })
            });
        })
    })
});

//describe('Backend testing of Admin REST-API (Payment)', function () {
//    before(function (done) {
//        testServer = app.listen(testPort, function () {
//            console.log("Server is listening on: " + testPort);
//            done();
//        })
//            .on('error', function (err) {
//                console.log(err);
//            });
//    })
//
//    beforeEach(function (done) {
//        PaymentModel.remove({}, function (err, response) {
//            if (err) {
//                console.log("remove error was:" + err)
//            }
//        });
//        var array = [
//            {
//                "orderID": "5477151d917c51ae2633cecc",
//                "paymentAmount": 9700,
//                "paymentDate": "2014-12-20 22:30:10"
//            },
//            {
//                "orderID": "5477151d917c51ae2633cecd",
//                "paymentAmount": 6500,
//                "paymentDate": "2014-12-21 16:56:25"
//            }
//        ];
//        PaymentModel.create(array, function (err, response) {
//            if (err) {
//                console.log("create error was:" + err)
//            }
//            done();
//        });
//    });
//
//    after(function () {
//        mongoose.connection.db.dropDatabase();
//        testServer.close();
//    })
//
//    it("Testing /payment (Get Payments) - Should return all payments. ", function (done) {
//        http.get("http://localhost:" + testPort + "/adminApi/payment", function (res) {
//            res.setEncoding("utf8");
//            res.statusCode.should.equal(200);
//            res.on("data", function (chunk) {
//                var n = JSON.parse(chunk);
//                n.length.should.equal(2);
//                n[0]._id.should.be.length(24);
//                n[0].orderID.should.equal("5477151d917c51ae2633cecc");
//                n[0].paymentAmount.should.equal(9700);
//                n[1]._id.should.be.length(24);
//                n[1].orderID.should.equal("5477151d917c51ae2633cecd");
//                n[1].paymentAmount.should.equal(6500);
//                done();
//            });
//        })
//    });
//
//    it("Testing /payment/:id (Get Payment) - Should return payment by id. ", function (done) {
//        http.get("http://localhost:" + testPort + "/adminApi/payment", function (res) {
//            res.setEncoding("utf8");
//            res.on("data", function (chunk) {
//                var n = JSON.parse(chunk);
//                var id = n[0]._id;
//                http.get("http://localhost:" + testPort + "/adminApi/payment/" + id, function (res) {
//                    res.setEncoding("utf8");
//                    res.statusCode.should.equal(200);
//                    res.on("data", function (chunk) {
//                        var n = JSON.parse(chunk);
//                        n.length.should.equal(1);
//                        n[0]._id.should.be.length(24);
//                        n[0]._id.should.be.equal(id);
//                        n[0].orderID.should.equal("5477151d917c51ae2633cecc");
//                        n[0].paymentAmount.should.equal(9700);
//                        done();
//                    });
//                })
//            });
//        })
//    });
//
//    it("Testing /payment (Create Payment) - Should return the added object.", function (done) {
//        request({
//                method: 'POST',
//                url: "http://localhost:" + testPort + "/adminApi/payment",
//                headers: {'Content-Type': 'application/json'},
//                json: {
//                    "orderID": "5477151d917c51ae2633cece",
//                    "paymentAmount": 1200,
//                    "paymentDate": "2014-12-25 17:24:13"
//                }
//            },
//            function (error, response, body) {
//                response.statusCode.should.equal(200);
//                body._id.should.be.length(24);
//                body.orderID.should.equal("5477151d917c51ae2633cece");
//                body.paymentAmount.should.equal(1200);
//                done();
//            })
//    })
//
//    it("Testing /payment/:id (Delete Payment) - Should return 1, which means deleted.", function (done) {
//        http.get("http://localhost:" + testPort + "/adminApi/payment", function (res) {
//            res.setEncoding("utf8");
//            res.on("data", function (chunk) {
//                var n = JSON.parse(chunk);
//                var id = n[0]._id;
//                request({
//                        method: 'DELETE',
//                        url: "http://localhost:" + testPort + "/adminApi/payment/" + id,
//                        headers: {'Content-Type': 'application/json'}
//                    },
//                    function (error, response, body) {
//                        response.statusCode.should.equal(200);
//                        body.should.equal("1");
//                        done();
//                    })
//            });
//        })
//    })
//
//    it("Testing /payment/:id (Edit Payment) - Should return the new edited object.", function (done) {
//        http.get("http://localhost:" + testPort + "/adminApi/payment", function (res) {
//            res.setEncoding("utf8");
//            res.on("data", function (chunk) {
//                var n = JSON.parse(chunk);
//                var id = n[0]._id;
//                request({
//                        method: 'PUT',
//                        url: "http://localhost:" + testPort + "/adminApi/payment/" + id,
//                        headers: {'Content-Type': 'application/json'},
//                        json: {
//                            "orderID": "5477151d917c51ae2633cecf",
//                            "paymentAmount": 1050,
//                            "paymentDate": "2014-12-13 14:20:05"
//                        }
//                    },
//                    function (error, response, body) {
//                        response.statusCode.should.equal(200);
//                        body._id.should.be.length(24);
//                        body.orderID.should.equal("5477151d917c51ae2633cecf");
//                        body.paymentAmount.should.equal(1050);
//                        done();
//                    })
//            });
//        })
//    })
//});