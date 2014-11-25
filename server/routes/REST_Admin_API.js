var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');

/* GET A User From The DataBase */
router.get('/user', function (req, res) {


    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " aka DB not started.");
        return;
    }
    //**
    user.find({}, function (err, users) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        res.header("Content-type","application/json");
        res.end(JSON.stringify(users));
    });

    //**
    //$http({
    //    method: 'GET',
    //    url: 'http://localhost:1234/userInfo'
    //}).
    //    success(function (data, status, headers, config) {
    //        res.header("Content-type", "application/json");
    //        res.end(JSON.stringify(data));
    //    }).
    //    error(function (data, status, headers, config) {
    //        if (data) {
    //            res.status(data.status || 400);
    //            res.end(JSON.stringify({error: data.toString()}));
    //            return;
    //        }
    //    });
});

module.exports = router;
