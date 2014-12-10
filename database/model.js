var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    status : String,
    productID :  Number,
    quantity : { type: Number, min: 0, max: 100 },
    orderDate: { type: Date, default: new Date() },
    userAlias: String
});
exports.OrderModel = mongoose.model('order', orderSchema);

/** Product SCHEMA **/
var productSchema = new mongoose.Schema({
    productName : String,
    productDescription : String,
    unitPrice : { type: Number, min: 0, max: 10000 },
    creationDate: { type: Date, default: new Date() },
    userAlias : String
});
exports.ProductModel = mongoose.model('product', productSchema);

/** Payment SCHEMA **/
var paymentSchema = new mongoose.Schema({
    userAlias :  {type: String, unique: true},
    orderID : {type: String, unique: true},
    paymentAmount : { type: Number },
    isPayed : String,
    paymentDate : { type: Date, default: new Date() }
});
exports.PaymentModel = mongoose.model('payment', paymentSchema);
