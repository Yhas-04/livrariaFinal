const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const app = express();
const path = require('path');
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan("common")); 
app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'uploads'))); 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true 
})); 
app.use(session({
    secret: process.env.SESSION_SECRET || "livraria_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 1000 * 60 * 60 * 2, 
        sameSite: 'strict'
    }
}));
module.exports = app;