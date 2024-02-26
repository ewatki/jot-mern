// Express app configuration

const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes)

// Get MongoDB driver connection
const { connectToDb, getDb } = require('./config/db');

// db connection
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log(`App listening on port ${port}`);
        });
        db = getDb();
    }
});

module.exports = app;
