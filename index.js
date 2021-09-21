const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Delivery Routes
const deliveryOrderRoute = require('./routes/deliveryOrderRoute')

// User Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

//CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
	next();
})
// middleware
app.use(express.json());
app.use(cookieParser());


// database connection
const dbURI = 'mongodb+srv://Maratah:test1234@cluster0.q5jue.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log('Database Connection Established . . . '))
  .catch((err) => console.log('Database Connection Failed . . .'));


// routes

// Routes for API
app.use('/api/v1/parcels', deliveryOrderRoute);  
app.use( '/api/v1/users', authRoutes);
 



const PORT = process.env.PORT || 3000;
// Server
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT} ....`);
})
