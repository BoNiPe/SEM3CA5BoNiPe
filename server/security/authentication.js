var request = require('request');

function getParticularAdmin(username,password, callback){
    console.log('I did it, Yoda!');
    console.log('USERNAME '+username);
    console.log('PSW '+password);

    request('http://localhost:8080/admin/'+username+'/'+password, function(error, response, body){
        if(error) callback(error);
        else callback(null, body);
    });
}

module.exports.getParticularAdmin = getParticularAdmin;