var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var authentication = require('../security/authentication');

/* GET home page. */
router.get('/', function (req, res) {
    res.redirect("app/index.html")
});

router.get('/admin/:username/:password', function (req, res) {
    authentication.getParticularAdmin(req.params.username, req.params.password, function (err, data) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(data);
            res.end(data);
        }
    });
})

router.get('/admin', function (req, res) {
    authentication.getAllUsers(function (err, data) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(data);
            res.end(data);
        }
    });
})

router.delete('/admin/:username', function (req, res) {
    authentication.deleteParticularLogger(req.params.username, function (err, data) {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(data);
            res.end(data);
        }
    });
})


router.post('/authenticate/', function (req, res) {
    authentication.getParticularAdmin(req.body.username, req.body.password, function (err, data) {
        if (err) {
            res.status(401).send('Wrong user or password');
            return;
        } else {
            console.log('Data retrieved from JPA: ' + data);
            var parsedData = JSON.parse(data);
            if (parsedData !== null) {
                var mappedkeys = Object.keys(parsedData);
                var result = mappedkeys.map(function () {
                    return {
                        userAlias: parsedData.userAlias,
                        type: parsedData.type,
                        error : parsedData.error
                    }
                })
                if (!result[0].error) {
                    console.log('userAlias: ' + result[0].userAlias);
                    console.log('type ' + result[0].type);
                    var profile = {
                        username: result[0].userAlias,
                        role: result[0].type,
                        id: 1000
                    };
                    if (result[0].type == "admin") {
                        var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, {expiresInMinutes: 60 * 5});
                        res.json({token: token});
                    } else {
                        var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
                        res.json({token: token});
                    }
                    return;
                } else{
                    res.status(401).send('Wrong user or password');
                    return;
                }
            }
        }
    });


    //TODO: Go and get UserName Password from "somewhere"
    //if is invalid, return 401
    //if (req.body.username === 'student' && req.body.password === 'test') {
    //    var profile = {
    //        username: 'Bo the Student',
    //        role: "user",
    //        id: 1000
    //    };
    //    // We are sending the profile inside the token
    //    var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
    //    res.json({token: token});
    //    return;
    //}
    //
    //if (req.body.username === 'teacher' && req.body.password === 'test') {
    //    var profile = {
    //        username: 'Peter the Teacher',
    //        role: "admin",
    //        id: 123423
    //    };
    //    // We are sending the profile inside the token
    //    var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, {expiresInMinutes: 60 * 5});
    //    res.json({token: token});
    //    return;
    //}
    //
    //else {
    //    res.status(401).send('Wrong user or password');
    //    return;
    //}
});

//Get Partials made as Views
router.get('/partials/:partialName', function (req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});

module.exports = router;
