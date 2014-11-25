var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderID :  {type: Number, unique: true},
    customerID : { type: Number},
    employeeID : { type: Number},
    orderDate: { type: Date, default: new Date() },
    status : String
});
exports.OrderModel = mongoose.model('order', orderSchema);

var orderDetailsSchema = new mongoose.Schema({
    orderID :  {type: Number, unique: true},
    productID :  {type: Number, unique: true},
    quantity : { type: Number, min: 0, max: 100 }
});
exports.OrderDetailsModel = mongoose.model('orderdetail', orderDetailsSchema);

/** Product SCHEMA **/
var productSchema = new mongoose.Schema({
    productID :  {type: Number, unique: true},
    productName : String,
    unitPrice : { type: Number, min: 0, max: 10000 }
});
exports.ProductModel = mongoose.model('product', productSchema);

/** Payment SCHEMA **/
var paymentSchema = new mongoose.Schema({
    orderID :  {type: Number, unique: true},
    paymentAmount : { type: Number },
    paymentDate : { type: Date, default: new Date() }
});
exports.PaymentModel = mongoose.model('payment', paymentSchema);