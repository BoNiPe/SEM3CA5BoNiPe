var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var user = mongoose.model('User');

/* GET A User From The DataBase */
router.get('/user', function (req, res) {


    if (typeof global.mongo_error !== "undefined") {
        res.status(500);
        res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    $http({
        method: 'GET',
        url: 'http://localhost:1234/userInfo'
    }).
        success(function (data, status, headers, config) {
            res.header("Content-type", "application/json");
            res.end(JSON.stringify(data));
        }).
        error(function (data, status, headers, config) {
            if (data) {
                res.status(data.status || 400);
                res.end(JSON.stringify({error: data.toString()}));
                return;
            }
        });
});

module.exports = router;
