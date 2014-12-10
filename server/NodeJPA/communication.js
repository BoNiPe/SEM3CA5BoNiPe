var request = require('request');
var http = require('http');
//var JPA_host = 'http://137.135.180.134:8080/admin/';

function getParticularAdmin(username, password, callback) {
    console.log('I did it, Yoda! I am checking your info : ' + username + ' and ' + password);
    request('http://137.135.180.134:8080/admin/' +username +'/'+password, function (error, response, body) {
        if (error) callback(error);
        else callback(null, body);
    });
}

function getAllUsers(callback) {
    console.log('I did it, Yoda! I am getting all of them!');
    request('http://137.135.180.134:8080/admin/', function (error, response, body) {
        if (error) callback(error);
        else callback(null, body);
    });
}

function deleteParticularLogger(username, callback) {
    console.log('I did it, Yoda! I am deleting ' + username);
    request({
        uri: 'http://137.135.180.134:8080/admin/'+username,
        method: "DELETE"
    }, function (error, response, body) {
        if (error) callback(error);
        console.log(body);
        callback(null, body);
    });
}

function editLogger(userObject, callback) {
    console.log('I did it, Yoda! I am editing ' + JSON.stringify(userObject) + ' with length of ' + JSON.stringify(userObject).length);
    var options = {
        host: '137.135.180.134',
        port: '8080',
        path: '/admin',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(userObject).length
        }
    };
// Set up the request
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            callback(null, chunk);
        });
    });
// post the data
    postRequest.write(JSON.stringify(userObject));
    postRequest.end();
}

function createLogger(userObject, callback) {
    console.log('I did it, Yoda! I am posting ' + userObject.username + ' with length of ' + JSON.stringify(userObject).length);
    if(userObject.type == null){
        console.log("I don't have type");
        userObject.type = "customer";
    }
    var options = {
        host: '137.135.180.134',
        port: '8080',
        path: '/admin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(userObject).length
        }
    };
// Set up the request
    var postRequest = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            callback(null, chunk);
        });
    });
// post the data
    postRequest.write(JSON.stringify(userObject));
    postRequest.end();
}

//The other way of exporting modules ^^
module.exports.deleteParticularLogger = deleteParticularLogger;
module.exports.getParticularAdmin = getParticularAdmin;
module.exports.getAllUsers = getAllUsers;
module.exports.editLogger = editLogger;
module.exports.createLogger = createLogger;