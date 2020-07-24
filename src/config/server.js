const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const registerRoute = require('../routes/register');
const loginRoute = require('../routes/login');
const mercadoriaRoutes = require('../routes/mercadoria');

app.use('/register', registerRoute);
app.use('/login',loginRoute);
app.use('/mercadoria',mercadoriaRoutes);

app.listen(process.env.PORT || 3000);