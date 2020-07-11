// import express, body parser, mangoose, morgan
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require ('./dbConfig');
const apiRoutes = require ('./app/route');
const app = express();

// Handling the request by Body Parse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Configure database
mongoose.Promise = global.Promise;

// Connect to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
})
.then(() => {
    console.log("Successfully connect to database");
}).catch(err => {
    console.log('Cannot connect to database. Exitting now...', err);
    process.exit();
});

// Use API
app.use('/restapi', apiRoutes);

//Handling error
app.use((req,res,next)=>{
    const error = new Error ('not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status ||500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports=app;

