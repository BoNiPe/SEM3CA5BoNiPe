var request = require('request');

function getParticularAdmin(username,password, callback){
    console.log('I did it, Yoda! I am checking your info : ' + username + ' and ' + password);
    request('http://localhost:8080/admin/'+username+'/'+password, function(error, response, body){
        if(error) callback(error);
        else callback(null, body);
    });
}

function getAllUsers(callback){
    console.log('I did it, Yoda! I am getting all of them!');
    request('http://localhost:8080/admin/', function(error, response, body){
        if(error) callback(error);
        else callback(null, body);
    });
}

function deleteParticularLogger(username, callback){
    console.log('I did it, Yoda! I am deleting ' + username);
    request('http://localhost:8080/admin/'+username, function(error, response, body){
        if(error) callback(error);
        else callback(null, body);
    });
}

module.exports.deleteParticularLogger = deleteParticularLogger;
module.exports.getParticularAdmin = getParticularAdmin;
module.exports.getAllUsers = getAllUsers;