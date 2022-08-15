const express = require("express");
var bodyParser = require("body-parser");
require('dotenv').config();

const port =  process.env.PORT || 3000
const app = express();

const authRoutes = require('./src/components/auth/authRoutes');
const orderRoutes = require('./src/components/orders/orderRoutes')
const setupDB = require("./src/config/db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setupDB()

app.use('/auth', authRoutes)
app.use('/orders', orderRoutes)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
