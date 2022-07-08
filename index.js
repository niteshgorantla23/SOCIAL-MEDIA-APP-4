require("dotenv").config();
const body_parser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./server/routes/user')
const postRoutes = require('./server/routes/post')
const app = express();

// mongoose.connect("mongodb://localhost/social-media-app", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.dbURL)
.then(
    console.log("Connected to social-media-app database!")
).catch(err =>
    console.log("Connection to database failed!")
);

app.use(express.json());

app.use(express.static(__dirname + "/client/build"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/client/build/index.html')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    next();
  });

app.use('/user', userRoutes);
app.use('/post', postRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server is started at port: ",port);
})