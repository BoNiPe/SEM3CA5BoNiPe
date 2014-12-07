var request = require('request');

function getParticularAdmin(username, password, callback) {
    console.log('I did it, Yoda! I am checking your info : ' + username + ' and ' + password);
    request('http://localhost:8080/admin/' + username + '/' + password, function (error, response, body) {
        if (error) callback(error);
        else callback(null, body);
    });
}

function getAllUsers(callback) {
    console.log('I did it, Yoda! I am getting all of them!');
    request('http://localhost:8080/admin/', function (error, response, body) {
        if (error) callback(error);
        else callback(null, body);
    });
}

function deleteParticularLogger(username, callback) {
    console.log('I did it, Yoda! I am deleting ' + username);
    request({
        uri: 'http://localhost:8080/admin/' + username,
        method: "DELETE"
    }, function (error, response, body) {
        if (error) callback(error);
        console.log(body);
        callback(null, body);
    });
}

function editLogger(userObject, callback) {
    console.log('I did it, Yoda! I am editing ' + userObject.username + ' with length of ' + JSON.stringify(userObject).length);
    console.log('In construction');
    callback(null, "Awesome");
}

function createLogger(userObject, callback) {
    console.log('I did it, Yoda! I am posting ' + userObject.username + ' with length of ' + JSON.stringify(userObject).length);
    console.log('In construction');
    callback(null, "Awesome");
    //request({
    //    uri: "http://localhost:8080/admin",
    //    headers: {
    //        'Content-Type': 'application/json',
    //        'Content-Length': JSON.stringify(userObject).length
    //    },
    //    method: "POST",
    //    form: userObject
    //}, function (error, response, body) {
    //    if (error) callback(error);
    //    //console.log(body);
    //    callback(null, body);
    //});
}

//The other way of exporting modules ^^
module.exports.deleteParticularLogger = deleteParticularLogger;
module.exports.getParticularAdmin = getParticularAdmin;
module.exports.getAllUsers = getAllUsers;
module.exports.editLogger = editLogger;
module.exports.createLogger = createLogger;