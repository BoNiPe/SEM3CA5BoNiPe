//Thank you, Henrik!

var request = require('request');
var http = require('http');
var userObject = JSON.parse('{"username": "test442", ' +
'"password": "test2",' +
'"type": "customer",' +
'"userAlias": "tester442",' +
'"fname": "Bobko2",' +
'"lname": "Shisha2",' +
'"adress": "swaggade, Copenhagen 9010"}');
console.log(userObject);
//Set up
var post_options = {
    host: 'localhost',
    port: '8080',
    path: '/admin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(userObject).length
    }
};
//Post
var post_req = http.request(post_options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});
post_req.write(JSON.stringify(userObject));
post_req.end();

//Testing code
