const express = require("express");
var bodyParser = require("body-parser");
require('dotenv').config();

const port =  process.env.PORT || 5000
const app = express();
var cors = require('cors')


const authRoutes = require('./src/components/auth/authRoutes');
const productRoutes = require('./src/components/products/productsRoutes');

const setupDB = require("./src/config/db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setupDB()

app.use(cors())
app.use('/auth', authRoutes)
app.use('/products', productRoutes)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
