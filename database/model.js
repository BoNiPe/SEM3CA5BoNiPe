var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    status : String,
    productID :  {type: Number, unique: true},
    quantity : { type: Number, min: 0, max: 100 },
    orderDate: { type: Date, default: new Date() }

});
exports.OrderModel = mongoose.model('order', orderSchema);

/** Product SCHEMA **/
var productSchema = new mongoose.Schema({
    productName : String,
    productDescription : String,
    unitPrice : { type: Number, min: 0, max: 10000 }
});
exports.ProductModel = mongoose.model('product', productSchema);

/** Payment SCHEMA **/
var paymentSchema = new mongoose.Schema({
    orderID :  {type: String, unique: true},
    paymentAmount : { type: Number },
    paymentDate : { type: Date, default: new Date() }
});
exports.PaymentModel = mongoose.model('payment', paymentSchema);