var express = require('express');

var router = express.Router();
router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message, You are logged on as a User since you could fetch this data"}');
});


//basket is only frontend, if you press confirm it will make a post request to createOrder(s)
//getUser's orders (basket)
//getUser's payments (basket part2)
//getProducts
//getParticularProduct
//orderProduct(createOrder)

//change see user details (also admin should see all users details + change see delete

module.exports = router;
