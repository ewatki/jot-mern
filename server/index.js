// Express app configuration
const express = require("express");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);


// Get MongoDB driver connection
const { connectToDb, getDb } = require('./config/db');

// db connection
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
        db = getDb();
    }
});

module.exports = app;
