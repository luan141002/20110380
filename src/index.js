const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const route = require('./Routes');
const DBconnection = require('./Utils/DBConnection');

// For some plugin
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// HTTP logger
app.use(morgan('combined'));
// Routers
route(app);

// Thông báo đã bật server lên
app.listen(5000, () => {
    // db connection
    DBconnection(mongoose);
    console.log('connect to the backend hihi');
});
