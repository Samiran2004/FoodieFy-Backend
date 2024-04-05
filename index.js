const express = require('express');
const app = express();

const cors = require('cors');


require('dotenv').config();

const mongoose = require('mongoose');
const router = require('./router/menuRouter');

mongoose.connect(process.env.DB_URI).then(() => console.log("Database connected...")).catch((err) => console.log(`Database connection error ${err}`));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Server connection error.")
    } else {
        console.log(`Server connected on port: ${process.env.PORT}`);
    }
});