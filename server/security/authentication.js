var http = require('http');
function getParticularAdmin(id, callback){
    console.log('I did it, Yoda!');
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var options = {
        host: 'localhost:8080',
        path: '/admin/'+id
    };
    var callbackx = function(response) {
        var str = '';
        //the whole response has been recieved, so we just print it out here
        response.on('end', function (data) {
            str += data;
            console.log(str);
            callback(null, str);
        });
    }
    http.request(options, callbackx).end();


}

module.exports.getParticularAdmin = getParticularAdmin;