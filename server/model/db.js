var mongoose = require( 'mongoose' );
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  dbURI = 'mongodb://localhost/wiki';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
/** Order SCHEMA **/
var orderSchema = new mongoose.Schema({
  status : String,
  productID :  {type: String, unique: true},
  quantity : { type: Number, min: 0, max: 100 },
  orderDate: { type: Date, default: new Date() }
});
mongoose.model( 'OrderModel', orderSchema,"orders" );

/** Product SCHEMA **/
var productSchema = new mongoose.Schema({
  productID :  {type: Number, unique: true},
  productName : String,
  unitPrice : { type: Number, min: 0, max: 10000 }
});
mongoose.model( 'ProductModel', productSchema,"products" );

/** Payment SCHEMA **/
var paymentSchema = new mongoose.Schema({
  orderID :  {type: String, unique: true},
  paymentAmount : { type: Number },
  paymentDate : { type: Date, default: new Date() }
});
mongoose.model( 'PaymentModel', paymentSchema,"payments" );
/** Starting version User schema**/
var usersSchema = new mongoose.Schema({
  userName : String,
  email: {type: String, unique: true},
  pw: String,
  created: { type: Date, default: new Date() }
});
mongoose.model( 'User', usersSchema,"testusers" );